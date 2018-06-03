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
  constructor(private _formBuilder: FormBuilder,
  public register : RegisterService,
  public snakcBar : MatSnackBar,
  public dialog: MatDialog,
  public _router : Router) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);
          if(tokenPayload.role == 'Super Admin')
            this.validity = true
    this.getPesertadidik()
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
