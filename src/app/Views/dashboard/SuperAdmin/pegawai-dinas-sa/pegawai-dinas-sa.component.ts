import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MaterialModule } from '../../../../material.module';
import { FormBuilder, FormGroup, Validators, FormGroupDirective,FormControl} from '@angular/forms';
import { RegisterService } from '../../../../services/register.service';
import { ExcelServiceService } from '../../../../services/excel-service.service';
import { ImportXlsxService } from '../../../../services/import-xlsx.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar,MatCardModule,MatSidenavModule,MatCheckboxModule,MatExpansionModule,MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { KonfirmasiComponent } from '../../../konfirmasi/konfirmasi.component'
import { EditPegawaiPenilikComponent } from '../../modals/edit-pegawai-penilik/edit-pegawai-penilik.component'


import { Router } from '@angular/router';
import { CdkTableModule  } from '@angular/cdk/table';
import decode from 'jwt-decode';

//Export to PDF Library
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';


//Export to Excel Library
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-pegawai-dinas-sa',
  templateUrl: './pegawai-dinas-sa.component.html',
  styleUrls: ['./pegawai-dinas-sa.component.css']
})
export class PegawaiDinasSaComponent implements OnInit {

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

    validity : boolean
    file : any
    header_id_dinas : number
    header_role : string
    header_id_akun : number

  constructor(public ExcelExport : ExcelServiceService,
    private _formBuilder: FormBuilder,
    public register : RegisterService,
    public snakcBar : MatSnackBar,
    public dialog: MatDialog,
    public _router : Router,
    public _import : ImportXlsxService)
    { }

  tambah_Pegawai(evt: any) {
      this._import.DataStream(evt,this.header_id_dinas,'Pegawai')
    }

  tambah_PamongPenilik(evt: any){
      this._import.DataStream(evt,this.header_id_dinas,'PamongPenilik')
    }

  exporttoExcel(name : string){
      if(name == "Pegawai")
      this.ExcelExport.exportAsExcelFile(this.dataSourcePegawai.data,"Data Pegawai")
      else if(name == "Penilik")
      this.ExcelExport.exportAsExcelFile(this.dataSourcePenilik.data,"Data Penilik")
    }

  exportAction(state: number){

              var columns_pegawai_penilk = [
                {title: "NIP", dataKey : "nip"},
                {title: "Nam", dataKey : "nama"},
                {title: "Tanggal Lahir", dataKey : "tanggal_lahir"},
                {title: "Jenis Kelamin", dataKey : "jenis_kelamin"},
                {title: "Pangkat Golongan", dataKey : "pangkat_golongan"},
                {title: "No. Hp.", dataKey : "no_hp"},
                {title: "Jabatan", dataKey : "jabatan"},
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

                if (state == 1)
                      doc.autoTable(columns_pegawai_penilk, this.dataSourcePegawai.data, general_setting);
                else if (state == 2)
                     doc.autoTable(columns_pegawai_penilk, this.dataSourcePenilik.data, general_setting);

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

    this._import.onPegawaiStream()
    this._import.onPamongPenilikStream()
    this._import.status.subscribe(res => {
      this.getPegawaiDetil(), this.getPenilikPamongDetil(), this.ngAfterViewInit()
    })
}

  getPegawaiDetil(){

    if(this.header_role == 'Super Admin'){
    this.register.GET_PEGAWAI()
    .subscribe(
        (data:any[]) => {
         this.dataSourcePegawai.data = data;
    }, error => {
      if(error instanceof HttpErrorResponse){
        if(error.status === 401)
          this._router.navigate(['/super-admin/beranda'])
      } else {
        console.log(error)
      }
    });}

    else {
      this.register.GET_PEGAWAI_ADMIN({ id_akun : this.header_id_akun })
        .subscribe(
            (data:any[]) => {
             this.dataSourcePegawai.data = data;
        }, error => {
          if(error instanceof HttpErrorResponse){
            if(error.status === 401)
              this._router.navigate(['/super-admin/beranda'])
          } else {
            console.log(error)
          }
        });
    }

    this.dataSourcePegawai = new MatTableDataSource(this.data_tablePegawai);
  }

      getPenilikPamongDetil(){

        if(this.header_role == 'Super Admin'){
            this.register.GET_PENILIK()
            .subscribe(
                (data:any[]) => {
                 this.dataSourcePenilik.data = data;
            }, error => {
              if(error instanceof HttpErrorResponse){
                if(error.status === 401)
                  this._router.navigate(['/super-admin/beranda'])
              } else {
                console.log(error)
              }
            });
        } else {
            this.register.GET_PENILIK_ADMIN({ id_akun : this.header_id_akun })
            .subscribe(
                (data:any[]) => {
                 this.dataSourcePenilik.data = data;
            }, error => {
              if(error instanceof HttpErrorResponse){
                if(error.status === 401)
                  this._router.navigate(['/super-admin/beranda'])
              } else {
                console.log(error)
              }
            });
        }

            this.dataSourcePenilik = new MatTableDataSource(this.data_tablePenilik);
        }

        editPegawaiDetil (id_dinas : number, nama_dinas : string, nip : number, nama : string, tanggal_lahir : string, jenis_kelamin, pangkat_golongan : string, no_hp : number, jabatan : string, check : string) {

          const dialogConfig = new MatDialogConfig();
          dialogConfig.autoFocus = true;
          dialogConfig.data = {
              status_akun : this.header_role,
              id_akun : this.header_id_akun,
              id_dinas : id_dinas,
              nama_dinas : nama_dinas,
              nip : nip,
              nama : nama,
              tanggal_lahir :  tanggal_lahir.substring(0,10),
              jenis_kelamin :  jenis_kelamin,
              pangkat_golongan :  pangkat_golongan,
              no_hp :  no_hp,
              jabatan :  jabatan,
              description : "Edit Pegawai/Pamong/Penilik",
              check : check
          };

          const dialogRef = this.dialog.open(EditPegawaiPenilikComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(
            data =>
              {
                    if(data == undefined){
                        this.snakcBar.open("You cancel the Edit Form.", 'close', { duration : 1000 })
                    } else {
                      data.nip_awal = nip
                      this.register.EDIT_PEGAWAI_DETIL(data)
                      .subscribe({
                          error : err =>  {
                            if(err instanceof HttpErrorResponse){
                              if(err.status === 401)
                                this._router.navigate(['/super-admin/beranda'])
                            }
                            this.snakcBar.open("Data Created!", 'close', { duration : 1000 }), this.getPegawaiDetil(), this.getPenilikPamongDetil(), this.ngAfterViewInit()} })
                    }
              }
          );
        }

        deletePegawaiDetil(nip: number){
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
                                this.register.DELETE_PEGAWAI_DETIL({ nip : nip }).subscribe({
                                  error : err =>  {
                                    if(err instanceof HttpErrorResponse){
                                      if(err.status === 401)
                                        this._router.navigate(['/super-admin/beranda'])
                                    }
                                    this.snakcBar.open("Data Changed!", 'close', { duration : 1000 }), this.getPegawaiDetil(), this.getPenilikPamongDetil(), this.ngAfterViewInit()
                                  }
                                });
                            } else {
                                this.snakcBar.open("You cancel the Delete.", 'close', { duration : 1000 })
                            }
                        }
                    }
                );
        }

        tambahPegawai(check : string) {

          const dialogConfig = new MatDialogConfig();
          dialogConfig.autoFocus = true;
          dialogConfig.data = {
              id_akun : this.header_id_akun,
              description : "Tambah Pegawai",
              check : check
          };

          const dialogRef = this.dialog.open(EditPegawaiPenilikComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(
            data =>
              {
                    if (data == undefined){
                        this.snakcBar.open("You cancel the Edit Form.", 'close', { duration : 1000 })
                    } else {
                      this.register.ADD_PEGAWAI(data)
                      .subscribe({
                          error : err =>  {
                            if(err instanceof HttpErrorResponse){
                              if(err.status === 401)
                                this._router.navigate(['/super-admin/beranda'])
                            }
                            this.snakcBar.open("Data Created!", 'close', { duration : 1000 }), this.getPegawaiDetil(), this.getPenilikPamongDetil(), this.ngAfterViewInit()} })
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
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
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
