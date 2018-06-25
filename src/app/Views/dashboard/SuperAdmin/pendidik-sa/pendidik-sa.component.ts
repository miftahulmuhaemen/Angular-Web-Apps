import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MaterialModule } from '../../../../material.module';
import { FormBuilder, FormGroup, Validators, FormGroupDirective,FormControl} from '@angular/forms';
import { RegisterService } from '../../../../services/register.service';
import { ExcelServiceService } from '../../../../services/excel-service.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar,MatCardModule,MatSidenavModule,MatCheckboxModule,MatExpansionModule,MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { KonfirmasiComponent } from '../../../konfirmasi/konfirmasi.component'
import { EditPendidikComponent } from '../../modals/edit-pendidik/edit-pendidik.component'
import { Router } from '@angular/router';
import { CdkTableModule  } from '@angular/cdk/table';
import decode from 'jwt-decode';
import { ImportXlsxService } from '../../../../services/import-xlsx.service';

//Export to PDF Library
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-pendidik-sa',
  templateUrl: './pendidik-sa.component.html',
  styleUrls: ['./pendidik-sa.component.css']
})
export class PendidikSaComponent implements OnInit {

  displayedColumnPendidik = ['id_pendidik','nama_lembaga','nama','tempat_lahir','tanggal_lahir','jenis_kelamin','alamat','pendidikan_terakhir','tahun_lulus','status_pendidik','sertifikat_pelatihan','status_diklat','edit','delete'];
  dataSource_Pendidik :MatTableDataSource<pendidik>;
  data_table_Pendidik : pendidik[]=[];
  @ViewChild('paginator_pendidik') pag_pendidik: MatPaginator;
  @ViewChild('table_pendidik') sort_pendidik: MatSort;

  validity : boolean
  header_id_dinas : number
  header_role : string
  header_id_akun : number

  constructor(public ExcelExport : ExcelServiceService, private _formBuilder: FormBuilder,
    public register : RegisterService,
    public snakcBar : MatSnackBar,
    public dialog: MatDialog,
    public _router : Router,
    public _import : ImportXlsxService) { }

    importExcel(evt: any){
      this._import.DataStream(evt,this.header_id_dinas,'pendidik')
    }

              exporttoExcel(){
                this.ExcelExport.exportAsExcelFile(this.dataSource_Pendidik.data,"Data Pendidik")
              }

              exportAction(){

                var columns_paud = [
                  {title: "ID", dataKey : "id_pendidik"},
                  {title: "Lembaga", dataKey : "nama_lembaga"},
                  {title: "Nama", dataKey : "nama"},
                  {title: "Tempat", dataKey : "tempat_lahir"},
                  {title: "Tanggal Lahir", dataKey : "tanggal_lahir"},
                  {title: "Jenis Kelamin", dataKey : "jenis_kelamin"},
                  {title: "Alamat", dataKey : "alamat"},
                  {title: "Pendidikan", dataKey : "pendidikan_terakhir"},
                  {title: "Tahun", dataKey : "tahun_lulus"},
                  {title: "Status Pendidik", dataKey : "status_pendidik"},
                  {title: "Sertifikat", dataKey : "sertifikat_pelatihan"},
                  {title: "Status Diklat", dataKey : "status_diklat"},
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

                doc.autoTable(columns_paud, this.dataSource_Pendidik.data, general_setting);
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

    this._import.onPendidikStream()
    this._import.status.subscribe(res => {
      this.getPendidik(), this.ngAfterViewInit()
    })
  }

  editPendidik (
     id_lembaga : number,
     id_pendidik : number,
     nama : string,
     tempat_lahir : string,
     tanggal_lahir : Date,
     jenis_kelamin : string,
     alamat : string,
     pendidikan_terakhir : string,
     tahun_lulus : number,
     status_pendidik : string,
     sertifikat_pelatihan : string,
     status_diklat : string) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
         id_lembaga : id_lembaga,
         id_pendidik : id_pendidik,
         nama : nama,
         tempat_lahir : tempat_lahir,
         tanggal_lahir : tanggal_lahir,
         jenis_kelamin : jenis_kelamin,
         alamat : alamat,
         pendidikan_terakhir : pendidikan_terakhir,
         tahun_lulus : tahun_lulus,
         status_pendidik : status_pendidik,
         sertifikat_pelatihan : sertifikat_pelatihan,
         status_diklat : status_diklat,
         description : "Edit Pendidik"
    };

    const dialogRef = this.dialog.open(EditPendidikComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
      data =>
        {
              if(data == undefined){
                  this.snakcBar.open("You cancel the Edit Form.", 'close', { duration : 1000 })
              } else {
                data.id_pendidik_lama = id_pendidik;
                this.register.EDIT_PENDIDIK(data)
                .subscribe({
                    error : err =>  {
                      if(err instanceof HttpErrorResponse){
                        if(err.status === 401)
                          this._router.navigate(['/super-admin/beranda'])
                      }
                      this.snakcBar.open("Data Created!", 'close', { duration : 1000 }), this.getPendidik(), this.ngAfterViewInit()} })
              }
        }
    );
  }


  deletePendidik(id_pendidik: number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

        // RESTful API DeleteUser
        const dialogRef = this.dialog.open(KonfirmasiComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(
            data =>
              {
                    if(data == undefined){
                        this.snakcBar.open("You cancel the Delete.", 'close', { duration : 1000 })
                    } else {
                      if(data == true) {
                          this.register.DELETE_PENDIDIK({ id_pendidik : id_pendidik }).subscribe({
                            error : err =>  {
                              if(err instanceof HttpErrorResponse){
                                if(err.status === 401)
                                  this._router.navigate(['/super-admin/beranda'])
                              }
                              this.snakcBar.open("Data Changed!", 'close', { duration : 1000 }), this.getPendidik(), this.ngAfterViewInit()
                            }
                          });
                      } else {
                          this.snakcBar.open("You cancel the Delete.", 'close', { duration : 1000 })
                      }
                  }
              }
          );
  }

  getPendidik(){
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);

    if(tokenPayload.role == 'Super Admin'){
    this.register.GET_PENDIDIK()
    .subscribe(
        (data:any[]) => {
         this.dataSource_Pendidik.data = data;
    }, error => {
      if(error instanceof HttpErrorResponse){
        if(error.status === 401)
          this._router.navigate(['/super-admin/beranda'])
      } else {
        console.log(error)
      }
    });} else {
      this.register.GET_PENDIDIK_SPESIFIK({ id_akun : tokenPayload.id_akun })
      .subscribe(
          (data:any[]) => {
           this.dataSource_Pendidik.data = data;
      }, error => {
        if(error instanceof HttpErrorResponse){
          if(error.status === 401)
            this._router.navigate(['/super-admin/beranda'])
        } else {
          console.log(error)
        }
      });
    }

    this.dataSource_Pendidik = new MatTableDataSource(this.data_table_Pendidik);
  }


  tambahPendidik () {

  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.data = {
      jenis_lembaga : "LKP",
      description : "Tambah Pendidik"
  };

  const dialogRef = this.dialog.open(EditPendidikComponent, dialogConfig);
   dialogRef.afterClosed().subscribe(
   data =>
     {
           if(data == undefined){
               this.snakcBar.open("You cancel the Tambah Form.", 'close', { duration : 1000 })
           } else {
             this.register.ADD_PENDIDIK(data)
             .subscribe({
                 error : err =>  {
                   if(err instanceof HttpErrorResponse){
                     if(err.status === 401)
                       this._router.navigate(['/super-admin/beranda'])
                   }
                   this.snakcBar.open("Data Created!", 'close', { duration : 1000 }), this.getPendidik(), this.ngAfterViewInit()} })
           }
     }
  );
  }

  ngAfterViewInit() {

      this.dataSource_Pendidik.paginator = this.pag_pendidik;
      this.dataSource_Pendidik.sort = this.sort_pendidik;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource
    this.dataSource_Pendidik.filter = filterValue;
  }
}


    export interface pendidik {
       id_lembaga : number,
       nama_lembaga : string,
       id_pendidik : number,
       nama : string,
       tempat_lahir : string,
       tanggal_lahir : Date,
       jenis_kelamin : string,
       alamat : string,
       pendidikan_terakhir : string,
       tahun_lulus : number,
       status_pendidik : string,
       sertifikat_pelatihan : string,
       status_diklat : string,
    }
