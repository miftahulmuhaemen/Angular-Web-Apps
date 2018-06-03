import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MaterialModule } from '../../../../material.module';
import { FormBuilder, FormGroup, Validators, FormGroupDirective,FormControl} from '@angular/forms';
import { RegisterService } from '../../../../services/register.service';
import { ExcelServiceService } from '../../../../services/excel-service.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar,MatCardModule,MatSidenavModule,MatCheckboxModule,MatExpansionModule,MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { KonfirmasiComponent } from '../../../konfirmasi/konfirmasi.component'
import { Router } from '@angular/router';
import { CdkTableModule  } from '@angular/cdk/table';
import { EditLkpComponent} from '../../modals/edit-lkp/edit-lkp.component'
import { DataServiceService } from '../../../../services/data-service.service'
import decode from 'jwt-decode';

//Export to PDF Library
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-lembaga-lkp-sa',
  templateUrl: './lembaga-lkp-sa.component.html',
  styleUrls: ['./lembaga-lkp-sa.component.css']
})
export class LembagaLkpSaComponent implements OnInit {

  displayedColumnsPotensi = ['nama_lembaga','jenis_lembaga','nama_program','akreditasi','alamat_lembaga','kode_pos','no_telp','tahun_berdiri','kondisi_bangunan','kepemilikan','edit','delete','detil'];
  dataSourcePotensi : MatTableDataSource<lkp>;
  data_tablePotensi : lkp[]=[];
  validity : boolean
  @ViewChild('paginatorPotensiDinas') lolilator: MatPaginator;
  @ViewChild('table2') sort1: MatSort;

        constructor(public data : DataServiceService,
                private _formBuilder: FormBuilder,
                public register : RegisterService,
                public snakcBar : MatSnackBar,
                public dialog: MatDialog,
                public _router : Router) { }

        ngOnInit() {
          const token = localStorage.getItem('token');
          const tokenPayload = decode(token);
                if(tokenPayload.role == 'Super Admin')
                  this.validity = true
          this.getLKP();
        }

        getLKP(){
          const token = localStorage.getItem('token');
          const tokenPayload = decode(token);

          if(tokenPayload.role == 'Super Admin'){
          this.register.GET_LKP()
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
            this.register.GET_LKP_SPESIFIK({ id_akun : tokenPayload.id_akun })
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

        editLKP(
            id_dinas : number,
            id_lembaga : number,
            nama_dinas : string,
            nama_lembaga : string,
            jenis_lembaga : string,
            nama_program : string,
            kurikulum : string,
            akreditasi : string,
            alamat_lembaga : string,
            kode_pos : string,
            no_telp : string,
            tahun_berdiri : string,
            kondisi_bangunan : string,
            kepemilikan : string){

          var polo = nama_program.split(",");
          polo.pop()

          const dialogConfig = new MatDialogConfig();
          dialogConfig.autoFocus = true;
          dialogConfig.data = {
                id_dinas : id_dinas,
                id_lembaga : id_lembaga,
                nama_dinas : nama_dinas,
                nama_lembaga : nama_lembaga,
                nama_program : polo,
                kurikulum : kurikulum,
                akreditasi : akreditasi,
                alamat_lembaga : alamat_lembaga,
                kode_pos : kode_pos,
                no_telp : no_telp,
                tahun_berdiri : tahun_berdiri,
                kondisi_bangunan : kondisi_bangunan,
                kepemilikan : kepemilikan,
              description : "Edit LKP"
          };

          console.log(dialogConfig.data)


          const dialogRef = this.dialog.open(EditLkpComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(
            data =>
              {
                    if(data == undefined){
                        this.snakcBar.open("You cancel the Edit Form.", 'close', { duration : 1000 })
                    } else {
                      data.id_lembaga_lama = id_lembaga
                      this.register.EDIT_LEMBAGA(data)
                      .subscribe({
                          error : err =>  {
                            if(err instanceof HttpErrorResponse){
                              if(err.status === 401)
                                this._router.navigate(['/super-admin/beranda'])
                            }
                            this.snakcBar.open("Data Created!", 'close', { duration : 1000 }), this.getLKP(), this.ngAfterViewInit()} })
                    }
              }
          );
        }

        deleteLKP (id_lembaga : number) {
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
                                this.register.DELETE_LEMBAGA({ id_lembaga : id_lembaga }).subscribe({
                                  error : err =>  {
                                    if(err instanceof HttpErrorResponse){
                                      if(err.status === 401)
                                        this._router.navigate(['/super-admin/beranda'])
                                    }
                                    this.snakcBar.open("Data Changed!", 'close', { duration : 1000 }), this.getLKP(), this.ngAfterViewInit()
                                  }
                                });
                            } else {
                                this.snakcBar.open("You cancel the Delete.", 'close', { duration : 1000 })
                            }
                        }
                    }
                );
        }

        tambahLembaga(){
          const token = localStorage.getItem('token');
          const tokenPayload = decode(token);
          const dialogConfig = new MatDialogConfig();

          dialogConfig.autoFocus = true;
          dialogConfig.data = {
              description : "Tambah LKP"
          };

          const dialogRef = this.dialog.open(EditLkpComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(
            data =>
              {
                    if(data == undefined){
                        this.snakcBar.open("You cancel the Edit Form.", 'close', { duration : 1000 })
                    } else {
                      data.id_dinas = tokenPayload.id_dinas;
                      data.jenis_lembaga = "LKP";
                      this.register.ADD_LEMBAGA(data)
                      .subscribe({
                          error : err =>  {
                            if(err instanceof HttpErrorResponse){
                              if(err.status === 401)
                                this._router.navigate(['/super-admin/beranda'])
                            }
                            this.snakcBar.open("Data Created!", 'close', { duration : 1000 }), this.getLKP(), this.ngAfterViewInit()} })
                    }
              }
          );
        }

        detil(id_lembaga : number){
          this.data.changeMessage(id_lembaga)
          this.data.changeName("LKP") /*it's  possible problem if multi-user access at the same time for the service */
          this._router.navigate(['/super-admin/paud-detil'])
        }

        ngAfterViewInit() {
            this.dataSourcePotensi.paginator = this.lolilator;
            this.dataSourcePotensi.sort = this.sort1;
        }

        applyFilter(filterValue: string) {
          filterValue = filterValue.trim(); // Remove whitespace
          filterValue = filterValue.toLowerCase(); //
          this.dataSourcePotensi.filter = filterValue;
        }
      }


        export interface lkp {
            id_dinas : number,
            id_lembaga : number,
            nama_dinas : string,
            nama_lembaga : string,
            jenis_lembaga : string,
            nama_program : string,
            kurikulum : string,
            akreditasi : string,
            alamat_lembaga : string,
            kode_pos : string,
            no_telp : string,
            tahun_berdiri : string,
            kondisi_bangunan : string,
            kepemilikan : string
      }
