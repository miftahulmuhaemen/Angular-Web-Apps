import { Component, OnInit, ViewChild,Inject, ChangeDetectorRef } from '@angular/core';
import { MaterialModule } from '../../../../material.module';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher} from '@angular/material/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar,MatCardModule,MatSidenavModule,MatCheckboxModule,MatExpansionModule,MatPaginator, MatSort, MatTableDataSource } from '@angular/material';


import { Router } from '@angular/router';
import { CdkTableModule  } from '@angular/cdk/table';

//Services
import { RegisterService } from '../../../../services/register.service';
import { ExcelServiceService } from '../../../../services/excel-service.service'
import { DataServiceService } from '../../../../services/data-service.service'

//Component Modal
import { EditDataDinasComponent } from '../../modals/edit-data-dinas/edit-data-dinas.component'
import { KonfirmasiComponent } from '../../../konfirmasi/konfirmasi.component'

//Export to PDF Library
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-data-dinas',
  templateUrl: './data-dinas.component.html',
  styleUrls: ['./data-dinas.component.css']
})
export class DataDinasComponent implements OnInit {

    //displayedColumns = ['ID','nama_dinas','username','nama_admin','password','status_akun','aksi','null'];
  displayedColumns = ['id_dinas','nama_dinas','alamat_kantor','email','telp_fax','gambar','edit','delete','detil'];
  dataSource: MatTableDataSource<userTable>;
  data_table : userTable[]=[];
  check : boolean = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(public data : DataServiceService, public ExcelExport : ExcelServiceService, public snakcBar : MatSnackBar, private httpClient:HttpClient,private changeDetector:ChangeDetectorRef,public dialog: MatDialog, public registerService : RegisterService, private _router : Router) {
      this.get();
    }

    ngOnInit() {
    }

    //RESTapi Create new user
    createNew(){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;

      dialogConfig.data = {
        description : "Tambah Dinas"
      }

      dialogConfig.width = '300px'

    const dialogRef = this.dialog.open(EditDataDinasComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
        data =>
          {
                if(data == undefined){
                      this.snakcBar.open("You cancel the Dinas Form.", 'close', { duration : 1000 })
                  } else {

                    this.registerService.addDinas(data)
                    .subscribe(
                    (data) =>  { this.snakcBar.open("Data Changed!", 'close', { duration : 1000 }), this.get(), this.ngAfterViewInit()},
                    error => this.snakcBar.open("Oops! Data not Send!", 'close', { duration : 1000 })
                )
              }
          }
      );
    }
    //
    edit(id_dinas:number, nama_dinas: string, alamat_kantor:string, email:string, telp_fax:string, gambar:string){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;

      var split = alamat_kantor.split(",");
      split[1] = split[1].trim();

      dialogConfig.data = {
        nama_dinas : nama_dinas,
        alamat_kantor : split[0],
        kabupaten : split[1],
        email : email,
        telp_fax : telp_fax,
        field : true
      };

    const dialogRef = this.dialog.open(EditDataDinasComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
        data =>
          {
                if(data == undefined){
                    this.snakcBar.open("You cancel the Edit Form.", 'close', { duration : 1000 })
                } else {
                  if(data.filename == undefined)
                      data.filename = gambar
                    data.id_dinas = id_dinas;
                  this.registerService.editDinas(data)
                  .subscribe({
                      error : err =>  { this.snakcBar.open("Data Created!", 'close', { duration : 1000 }), this.get(), this.ngAfterViewInit()} })
                }
          }
      );
    }



    delete(index:number){
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
                      this.registerService.deleteDinas({ id_dinas : index }).subscribe({
                        error : err =>  {
                          if(err instanceof HttpErrorResponse){
                            if(err.status === 401)
                              this._router.navigate(['/super-admin/beranda'])
                            else if(err.status == 500)
                              this.snakcBar.open("There's one or more lembaga left for this Dinas.", 'close', { duration : 1000 })
                            else if(err.status == 200)
                              this.snakcBar.open("Data Changed!", 'close', { duration : 1000 }), this.get(), this.ngAfterViewInit()}
                            else
                              this.snakcBar.open("Something wrong happends!.", 'close', { duration : 1000 })
                          }
                      });
                  } else {
                      this.snakcBar.open("You cancel the Delete.", 'close', { duration : 1000 })
                  }
              }
          }
      );
    }

    // RESTful API GetData
    get(){
      this.registerService.getAllDinas()
      .subscribe(
          (data:any[]) => {
           this.dataSource.data = data;
      }, error => {
        if(error instanceof HttpErrorResponse){
          if(error.status === 401)
            this._router.navigate(['/super-admin/beranda'])
        } else {
          console.log(error)
        }
      });

     this.dataSource = new MatTableDataSource(this.data_table);
    }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  exporttoExcel(){
      this.ExcelExport.exportAsExcelFile(this.dataSource.data,"DataDinas")
  }

  exportAction(){

    var columns = [
      {title: "ID", dataKey : "id_dinas"},
      {title: "Nama Dinas", dataKey : "nama_dinas"},
      {title: "Alamat Kantor", dataKey : "alamat_kantor"},
      {title: "Telp. Fax", dataKey : "telp_fax"},
      {title: "Tautan Gambar", dataKey : "gambar"}
    ];

    var doc = new jsPDF('l', 'mm');

    //Tittle
    doc.setFontSize(16)
    doc.setFont('helvetica')
    doc.text(20, 30, 'Daftar Pengguna - BP-PAUD & DIKMAS KALSEL')
    doc.autoTable(columns, this.dataSource.data, {
      margin : { top : 40 }
    });
    doc.save('table.pdf')

  }

  // Detil Dinas
      detil(index : number){
        this.data.changeMessage(index)
        this._router.navigate(['/super-admin/detil'])
      }

}


export interface userTable {
  id_dinas: number;
  nama_dinas : string;
  alamat_kantor : string;
  telp_fax : string;
  gambar : string;
}
