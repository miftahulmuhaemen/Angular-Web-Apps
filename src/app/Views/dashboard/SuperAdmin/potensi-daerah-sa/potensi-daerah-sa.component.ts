import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MaterialModule } from '../../../../material.module';
import { FormBuilder, FormGroup, Validators, FormGroupDirective,FormControl} from '@angular/forms';
import { RegisterService } from '../../../../services/register.service';
import { ExcelServiceService } from '../../../../services/excel-service.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar,MatCardModule,MatSidenavModule,MatCheckboxModule,MatExpansionModule,MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { KonfirmasiComponent } from '../../../konfirmasi/konfirmasi.component'
import { EditPotensiComponent } from '../../modals/edit-potensi/edit-potensi.component'
import { Router } from '@angular/router';
import { CdkTableModule  } from '@angular/cdk/table';
import decode from 'jwt-decode';
import { ImportXlsxService } from '../../../../services/import-xlsx.service';

//Export to PDF Library
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-potensi-daerah-sa',
  templateUrl: './potensi-daerah-sa.component.html',
  styleUrls: ['./potensi-daerah-sa.component.css']
})
export class PotensiDaerahSaComponent implements OnInit {

    displayedColumnsPotensi = ['id_potensi','nama_potensi','jenis_potensi','edit','delete']
    dataSourcePotensi : MatTableDataSource<potensi_daerah>
    data_tablePotensi : potensi_daerah[]=[]

    validity : boolean
    header_id_dinas : number
    header_role : string
    header_id_akun : number

    @ViewChild('paginatorPotensiDinas') lolilator: MatPaginator
    @ViewChild('table2') sort1: MatSort

  constructor(public ExcelExport : ExcelServiceService,
    private _formBuilder: FormBuilder,
    public register : RegisterService,
    public snakcBar : MatSnackBar,
    public dialog: MatDialog,
    public _router : Router,
    public _import : ImportXlsxService) { }

    tambah_Potensi(evt: any){
      this._import.DataStream(evt,this.header_id_dinas,'PotensiDinas')
    }

    exporttoExcel(){
        this.ExcelExport.exportAsExcelFile(this.dataSourcePotensi.data,"Data Potensi")
    }

    exportAction(){

                var columns_potensi = [
                  {title: "ID", dataKey : "id_potensi"},
                  {title: "Nama Potensi", dataKey : "nama_potensi"},
                  {title: "Jenis Potensi", dataKey : "jenis_potensi"},
                ];

                var doc = new jsPDF('l', 'mm');

                var header = function(data) {
                    doc.setFontSize(18);
                    doc.setTextColor(40);
                    doc.setFontStyle('normal');
                    doc.text("BP-PAUD & DIKMAS KALSEL", data.settings.margin.left, 20);
                  };


                var general_setting = {
                  addPageContent: header,
                  margin: {
                    top: 25
                  },
                };

                doc.autoTable(columns_potensi, this.dataSourcePotensi.data, general_setting);
                doc.save('table.pdf')
    }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);

    this.header_id_dinas = tokenPayload.id_dinas
    this.header_role = tokenPayload.role
    this.header_id_akun = tokenPayload.id_akun

    if(this.header_role == 'Super Admin')
      this.validity = true

    this._import.status.subscribe(res => {
      this.getPotensiDetil(), this.ngAfterViewInit()
    })
  }

  editPotensiDetil(id_potensi : number, nama_potensi : string, jenis_potensi : string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        nama_potensi : nama_potensi,
        jenis_potensi : jenis_potensi,
        description : "Edit Potensi Daerah"
    };

    const dialogRef = this.dialog.open(EditPotensiComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
      data =>
        {
              if(data == undefined){
                  this.snakcBar.open("You cancel the Edit Form.", 'close', { duration : 1000 })
              } else {
                data.id_potensi = id_potensi;
                this.register.EDIT_POTENSI_DETIL(data)
                .subscribe({
                    error : err =>  {
                      if(err instanceof HttpErrorResponse){
                        if(err.status === 401)
                          this._router.navigate(['/super-admin/beranda'])
                      }
                      this.snakcBar.open("Data Created!", 'close', { duration : 1000 }), this.getPotensiDetil(), this.ngAfterViewInit()} })
              }
        }
    );
  }

  deletePotensiDetil (id_potensi : number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

        const dialogRef = this.dialog.open(KonfirmasiComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(
            data =>
              {
                    if(data == undefined){
                        this.snakcBar.open("You cancel the Delete.", 'close', { duration : 1000 })
                    } else {
                      if(data == true) {
                          this.register.DELETE_POTENSI_DETIL({ id_potensi : id_potensi }).subscribe({
                            error : err =>  {
                              if(err instanceof HttpErrorResponse){
                                if(err.status === 401)
                                  this._router.navigate(['/super-admin/beranda'])
                              }
                              this.snakcBar.open("Data Changed!", 'close', { duration : 1000 }), this.getPotensiDetil(), this.ngAfterViewInit()
                            }
                          });
                      } else {
                          this.snakcBar.open("You cancel the Delete.", 'close', { duration : 1000 })
                      }
                  }
              }
          );
  }

  tambahPotensi(){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        description : "Tambah Potensi Daerah"
    };

    const dialogRef = this.dialog.open(EditPotensiComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
      data =>
        {
              if(data == undefined){
                  this.snakcBar.open("You cancel the Edit Form.", 'close', { duration : 1000 })
              } else {
                data.id_dinas = this.header_id_dinas
                this.register.ADD_POTENSI(data)
                .subscribe({
                    error : err =>  {
                      if(err instanceof HttpErrorResponse){
                        if(err.status === 401)
                          this._router.navigate(['/super-admin/beranda'])
                      }
                      this.snakcBar.open("Data Created!", 'close', { duration : 1000 }), this.getPotensiDetil(), this.ngAfterViewInit()} })
              }
        }
    );
  }

  getPotensiDetil(){

    if(this.header_role == 'Super Admin'){
    this.register.GET_POTENSI()
    .subscribe(
        (data:any[]) => {
         this.dataSourcePotensi.data = data;
    }, error => {
      if(error instanceof HttpErrorResponse){
        if(error.status === 401)
          this._router.navigate(['/super-admin/beranda'])
      } else {
        console.log(error)
      }
    });} else {
      this.register.GET_POTENSI_SPESIFIK({ id_akun : this.header_id_akun })
      .subscribe(
          (data:any[]) => {
           this.dataSourcePotensi.data = data;
      }, error => {
        if(error instanceof HttpErrorResponse){
          if(error.status === 401)
            this._router.navigate(['/super-admin/beranda'])
        } else {
          console.log(error)
        }
      });
    }
    this.dataSourcePotensi = new MatTableDataSource(this.data_tablePotensi);
  }

  ngAfterViewInit() {
      this.dataSourcePotensi.paginator = this.lolilator;
      this.dataSourcePotensi.sort = this.sort1;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSourcePotensi.filter = filterValue;
  }

}


export interface potensi_daerah {
  id_potensi : number;
  nama_potensi : string;
  jenis_potensi : string;
}
