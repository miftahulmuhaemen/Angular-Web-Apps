import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MaterialModule } from '../../../../material.module';
import { FormBuilder, FormGroup, Validators, FormGroupDirective,FormControl} from '@angular/forms';
import { RegisterService } from '../../../../services/register.service';
import { ExcelServiceService } from '../../../../services/excel-service.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar,MatCardModule,MatSidenavModule,MatCheckboxModule,MatExpansionModule,MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { KonfirmasiComponent } from '../../../konfirmasi/konfirmasi.component'
import { EditPesertaDidikComponent } from '../../modals/edit-peserta-didik/edit-peserta-didik.component';
import { Router } from '@angular/router';
import { CdkTableModule  } from '@angular/cdk/table';
import decode from 'jwt-decode';
import { ImportXlsxService } from '../../../../services/import-xlsx.service';

//Export to PDF Library
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-peserta-didik-sa',
  templateUrl: './peserta-didik-sa.component.html',
  styleUrls: ['./peserta-didik-sa.component.css']
})
export class PesertaDidikSaComponent implements OnInit {
  displayedColumnPesertadidik = ['id_peserta_didik','nama_lembaga','nama','tempat_lahir','tanggal_lahir','jenis_kelamin','alamat','kesetaraan','status_keaksaraan','edit','delete'];
  dataSource_Pesertadidik : MatTableDataSource<pesertadidik>;
  data_table_Pesertadidik : pesertadidik[]=[];
  @ViewChild('paginator_pesertadidik') pag_pesertadidik: MatPaginator;
  @ViewChild('table_pesertadidik') sort_pesertadidik: MatSort;
  validity : boolean
  header_id_dinas : number
  header_role : string
  header_id_akun : number


  constructor(public ExcelExport : ExcelServiceService,
  private _formBuilder: FormBuilder,
  public register : RegisterService,
  public snakcBar : MatSnackBar,
  public dialog: MatDialog,
  public _router : Router,
  public _import : ImportXlsxService) { }

  importExcel(evt: any){
    this._import.DataStream(evt,this.header_id_dinas,'pesertadidik')
  }

  exporttoExcel(){
    this.ExcelExport.exportAsExcelFile(this.dataSource_Pesertadidik.data,"Data Peserta Didik")
  }

  exportAction(){

    var columns_paud = [
      {title: "ID", dataKey : "id_peserta_didik"},
      {title: "Lembaga", dataKey : "nama_lembaga"},
      {title: "Nama", dataKey : "nama"},
      {title: "Tempat", dataKey : "tempat_lahir"},
      {title: "Tanggal Lahir", dataKey : "tanggal_lahir"},
      {title: "Jenis Kelamin", dataKey : "jenis_kelamin"},
      {title: "Alamat", dataKey : "alamat"},
      {title: "Kesetaraan", dataKey : "kesetaraan"},
      {title: "Status Kesetaraan", dataKey : "status_keaksaraan"},
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
      styles : {
        overflow : 'linebreak',
      },
      columnStyles : {
        alamat : {
           columnWidth: 20
        }
      }
    };

    doc.autoTable(columns_paud, this.dataSource_Pesertadidik.data, general_setting);
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

    this._import.onPesertadidikStream()
    this._import.status.subscribe(res => {
      this.getPesertadidik(), this.ngAfterViewInit()
    })
  }
  editPesertaDidik (
    id_lembaga : number,
    nama_lembaga : string,
    id_peserta_didik : number,
    nama : string,
    tempat_lahir : string,
    tanggal_lahir : Date,
    jenis_kelamin : string,
    alamat : string,
    kesetaraan : string,
    status_keaksaraan : string) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
          id_lembaga : id_lembaga,
          nama_lembaga : nama_lembaga,
          id_peserta_didik : id_peserta_didik,
          nama : nama,
          tempat_lahir : tempat_lahir,
          tanggal_lahir : tanggal_lahir,
          jenis_kelamin : jenis_kelamin,
          alamat : alamat,
          kesetaraan : kesetaraan,
          status_keaksaraan : status_keaksaraan,
          description : "Edit Pendidik"
    };

    const dialogRef = this.dialog.open(EditPesertaDidikComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
      data =>
        {
              if(data == undefined){
                  this.snakcBar.open("You cancel the Edit Form.", 'close', { duration : 1000 })
              } else {
                data.id_peserta_didik_lama = id_peserta_didik;
                this.register.EDIT_PESERTADIDIK(data)
                .subscribe({
                    error : err =>  {
                      if(err instanceof HttpErrorResponse){
                        if(err.status === 401)
                          this._router.navigate(['/super-admin/beranda'])
                      }
                      this.snakcBar.open("Data Created!", 'close', { duration : 1000 }), this.getPesertadidik(), this.ngAfterViewInit()} })
              }
        }
    );
  }

  deletePesertaDidik(id_peserta_didik: number){
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
                          this.register.DELETE_PESERTADIDIK({ id_peserta_didik : id_peserta_didik }).subscribe({
                            error : err =>  {
                              if(err instanceof HttpErrorResponse){
                                if(err.status === 401)
                                  this._router.navigate(['/super-admin/beranda'])
                              }
                              this.snakcBar.open("Data Changed!", 'close', { duration : 1000 }), this.getPesertadidik(), this.ngAfterViewInit()
                            }
                          });
                      } else {
                          this.snakcBar.open("You cancel the Delete.", 'close', { duration : 1000 })
                      }
                  }
              }
          );
  }

  getPesertadidik(){
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);

    if(tokenPayload.role == 'Super Admin'){
    this.register.GET_PESERTADIDIK()
    .subscribe(
        (data:any[]) => {
         this.dataSource_Pesertadidik.data = data;
    }, error => {
      if(error instanceof HttpErrorResponse){
        if(error.status === 401)
          this._router.navigate(['/super-admin/beranda'])
      } else {
        console.log(error)
      }
    });} else {
      this.register.GET_PESERTADIDIK_SPESIFIK({ id_akun : tokenPayload.id_akun })
      .subscribe(
          (data:any[]) => {
           this.dataSource_Pesertadidik.data = data;
      }, error => {
        if(error instanceof HttpErrorResponse){
          if(error.status === 401)
            this._router.navigate(['/super-admin/beranda'])
        } else {
          console.log(error)
        }
      });
    }

    this.dataSource_Pesertadidik = new MatTableDataSource(this.data_table_Pesertadidik);
  }

    tambahPesertadidik () {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        description : "Tambah Peserta Didik"
    };

    const dialogRef = this.dialog.open(EditPesertaDidikComponent, dialogConfig);
     dialogRef.afterClosed().subscribe(
     data =>
       {
             if(data == undefined){
                 this.snakcBar.open("You cancel the Tambah Form.", 'close', { duration : 1000 })
             } else {
               this.register.ADD_PESERTADIDIK(data)
               .subscribe({
                   error : err =>  {
                     if(err instanceof HttpErrorResponse){
                       if(err.status === 401)
                         this._router.navigate(['/super-admin/beranda'])
                     }
                     this.snakcBar.open("Data Created!", 'close', { duration : 1000 }), this.getPesertadidik(), this.ngAfterViewInit()} })
             }
       }
    );
    }

  ngAfterViewInit() {
      this.dataSource_Pesertadidik.paginator = this.pag_pesertadidik;
      this.dataSource_Pesertadidik.sort = this.sort_pesertadidik;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource_Pesertadidik.filter = filterValue;
  }

}

   export interface pesertadidik {
      id_lembaga : number,
      nama_lembaga : string,
      id_peserta_didik : number,
      nama : string,
      tempat_lahir : string,
      tanggal_lahir : Date,
      jenis_kelamin : string,
      alamat : string,
      kesetaraan : string,
      status_keaksaraan : string
   }
