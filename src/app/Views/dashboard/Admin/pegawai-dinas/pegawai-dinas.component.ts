import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MaterialModule } from '../../../../material.module';
import { FormBuilder, FormGroup, Validators, FormGroupDirective,FormControl} from '@angular/forms';
import { RegisterService } from '../../../../services/register.service';
import { ExcelServiceService } from '../../../../services/excel-service.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar,MatCardModule,MatSidenavModule,MatCheckboxModule,MatExpansionModule,MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { KonfirmasiComponent } from '../../../konfirmasi/konfirmasi.component'
import { EditPegawaiPenilikComponent } from '../../modals/edit-pegawai-penilik/edit-pegawai-penilik.component'
import { Router } from '@angular/router';
import { CdkTableModule  } from '@angular/cdk/table';

//Export to PDF Library
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-pegawai-dinas',
  templateUrl: './pegawai-dinas.component.html',
  styleUrls: ['./pegawai-dinas.component.css']
})
export class PegawaiDinasComponent implements OnInit {

  displayedColumnsPegawai = ['nip','nama_dinas','nama','tanggal_lahir','jenis_kelamin','pangkat_golongan','no_hp','jabatan','edit','delete'];
  dataSourcePegawai: MatTableDataSource<pegawai>;
  data_tablePegawai : pegawai[]=[];

  displayedColumnsPenilik = ['nip','nama_dinas','nama','tanggal_lahir','jenis_kelamin','pangkat_golongan','no_hp','jabatan','edit','delete'];
  dataSourcePenilik : MatTableDataSource<pegawai>;
  data_tablePenilik : pegawai[]=[];

    @ViewChild('paginatorPegawai') brengsektor: MatPaginator;
    @ViewChild('paginatorPenilik') madafaka: MatPaginator;
    @ViewChild('table1') sort: MatSort;
    @ViewChild('table3') sort2: MatSort;

  constructor(
    private _formBuilder: FormBuilder,
    public register : RegisterService,
    public snakcBar : MatSnackBar,
    public dialog: MatDialog,
    public _router : Router) { }

  ngOnInit() {
            this.getPegawaiDetil();
            this.getPenilikPamongDetil();
  }


  /* Restful API Get All Pegawai from certain Detil*/
  getPegawaiDetil(){
    this.register.GET_PEGAWAI()
    .subscribe(
        (data:any[]) => {
         this.dataSourcePegawai.data = data;
         console.log(this.dataSourcePegawai.data)
    }, error => {
      if(error instanceof HttpErrorResponse){
        // if(error.status === 401)
        //   this._router.navigate(['/super-admin/beranda'])
      } else {
        console.log(error)
      }
    });

    this.dataSourcePegawai = new MatTableDataSource(this.data_tablePegawai);
  }

      getPenilikPamongDetil(){
            this.register.GET_PENILIK()
            .subscribe(
                (data:any[]) => {
                 this.dataSourcePenilik.data = data;
            }, error => {
              if(error instanceof HttpErrorResponse){
                // if(error.status === 401)
                //   this._router.navigate(['/super-admin/beranda'])
              } else {
                console.log(error)
              }
            });

            this.dataSourcePenilik = new MatTableDataSource(this.data_tablePenilik);
        }

        editPegawaiDetil (id_dinas : number, nama_dinas : string, nip : number, nama : string, tanggal_lahir : string, jenis_kelamin, pangkat_golongan : string, no_hp : number, jabatan : string) {
          //row.nip,row.nama.row.tanggal_lahir,row.jenis_kelain,row.pangkat_golongan,row.no_hp,row.jabatan
          const dialogConfig = new MatDialogConfig();
          dialogConfig.autoFocus = true;
          dialogConfig.data = {
              id_dinas : id_dinas,
              nama_dinas : nama_dinas,
              nip : nip,
              nama : nama,
              tanggal_lahir :  tanggal_lahir.substring(0,10),
              jenis_kelamin :  jenis_kelamin,
              pangkat_golongan :  pangkat_golongan,
              no_hp :  no_hp,
              jabatan :  jabatan,
              description : "Edit Pegawai",
              check : true
          };

          const dialogRef = this.dialog.open(EditPegawaiPenilikComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(
            data =>
              {
                    if(data == undefined){
                        this.snakcBar.open("You cancel the Edit Form.", 'close', { duration : 1000 })
                    } else {
                      console.log(data)
                      this.register.EDIT_PEGAWAI_DETIL(data)
                      .subscribe({
                          error : err =>  {
                            if(err instanceof HttpErrorResponse){
                              if(err.status === 401)
                                this._router.navigate(['/super-admin/beranda'])
                            }
                            this.snakcBar.open("Data Created!", 'close', { duration : 1000 }), this.getPegawaiDetil(), this.ngAfterViewInit()} })
                    }
              }
          );
        }

        deletePegawaiDetil(nip: number){
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
                                this.register.DELETE_PEGAWAI_DETIL({ nip : nip }).subscribe({
                                  error : err =>  {
                                    if(err instanceof HttpErrorResponse){
                                      if(err.status === 401)
                                        this._router.navigate(['/super-admin/beranda'])
                                    }
                                    this.snakcBar.open("Data Changed!", 'close', { duration : 1000 }), this.getPegawaiDetil(), this.ngAfterViewInit()
                                  }
                                });
                            } else {
                                this.snakcBar.open("You cancel the Delete.", 'close', { duration : 1000 })
                            }
                        }
                    }
                );
        }

  ngAfterViewInit() {
      this.dataSourcePegawai.paginator = this.brengsektor;
      this.dataSourcePegawai.sort = this.sort;
      this.dataSourcePenilik.paginator = this.madafaka;
      this.dataSourcePenilik.sort = this.sort2;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSourcePegawai.filter = filterValue;
    this.dataSourcePenilik.filter = filterValue;
  }

  }

  export interface pegawai {
  nip : number,
  nama_dinas : string,
  nama : string,
  tanggal_lahir : Date,
  jenis_kelamin :  string,
  pangkat_golongan :  string,
  no_hp :  string,
  jabatan :  string,
  }
