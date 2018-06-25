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
import { EditPkbmComponent} from '../../modals/edit-pkbm/edit-pkbm.component'
import { DataServiceService } from '../../../../services/data-service.service'
import decode from 'jwt-decode';
import { ImportXlsxService } from '../../../../services/import-xlsx.service';

//Export to PDF Library
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-lembaga-pkbm-sa',
  templateUrl: './lembaga-pkbm-sa.component.html',
  styleUrls: ['./lembaga-pkbm-sa.component.css']
})
export class LembagaPkbmSaComponent implements OnInit {


    displayedColumnsPotensi = ['id_lembaga','nama_lembaga','jenis_lembaga','akreditasi','alamat_lembaga','kode_pos','no_telp','tahun_berdiri','kondisi_bangunan','kepemilikan','edit','delete','detil'];
    dataSourcePotensi : MatTableDataSource<paud>;
    data_tablePotensi : paud[]=[];
    @ViewChild('paginatorPotensiDinas') lolilator: MatPaginator;
    @ViewChild('table2') sort1: MatSort;

    validity : boolean
    header_id_dinas : number
    header_role : string
    header_id_akun : number

    constructor(public ExcelExport : ExcelServiceService,
    public data : DataServiceService,
    private _formBuilder: FormBuilder,
    public register : RegisterService,
    public snakcBar : MatSnackBar,
    public dialog: MatDialog,
    public _router : Router,
    public _import : ImportXlsxService) { }

    importExcel(evt: any){
      this._import.DataStream(evt,this.header_id_dinas,'lembagaPKBM')
    }

        exporttoExcel(){
          this.ExcelExport.exportAsExcelFile(this.dataSourcePotensi.data,"Data PKBM")
        }

        exportAction(){

          var columns_pkbm = [
            {title: "ID", dataKey : "id_lembaga"},
            {title: "Nama", dataKey : "nama_lembaga"},
            {title: "Jenis", dataKey : "jenis_lembaga"},
            {title: "Kurikulum", dataKey : "kurikulum"},
            {title: "Akreditasi", dataKey : "akreditasi"},
            {title: "Kode Pos", dataKey : "kode_pos"},
            {title: "No. Telp.", dataKey : "no_telp"},
            {title: "Tahun Berdiri", dataKey : "tahun_berdiri"},
            {title: "Kondisi Bangunan", dataKey : "kondisi_bangunan"},
            {title: "Kepemilikan", dataKey : "kepemilikan"},
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

          doc.autoTable(columns_pkbm, this.dataSourcePotensi.data, general_setting);
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

      this._import.onLembagaLKPStream()
      this._import.status.subscribe(res => {
        this.getPAUD(), this.ngAfterViewInit()
      })
    }

    getPAUD(){
      const token = localStorage.getItem('token');
      const tokenPayload = decode(token);

      if(tokenPayload.role == 'Super Admin'){
      this.register.GET_PKBM()
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
        this.register.GET_PKBM_SPESIFIK({ id_akun : tokenPayload.id_akun })
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

    editPAUD(
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

      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
            id_dinas : id_dinas,
            id_lembaga : id_lembaga,
            nama_dinas : nama_dinas,
            nama_lembaga : nama_lembaga,
            nama_program : nama_program,
            kurikulum : kurikulum,
            akreditasi : akreditasi,
            alamat_lembaga : alamat_lembaga,
            kode_pos : kode_pos,
            no_telp : no_telp,
            tahun_berdiri : tahun_berdiri,
            kondisi_bangunan : kondisi_bangunan,
            kepemilikan : kepemilikan,
          description : "Edit PKBM"
      };


      const dialogRef = this.dialog.open(EditPkbmComponent, dialogConfig);
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
                        this.snakcBar.open("Data Created!", 'close', { duration : 1000 }), this.getPAUD(), this.ngAfterViewInit()} })
                }
          }
      );
    }

    deletePAUD (id_lembaga : number) {
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
                            this.register.DELETE_LEMBAGA({ id_lembaga : id_lembaga }).subscribe({
                              error : err =>  {
                                if(err instanceof HttpErrorResponse){
                                  if(err.status === 401)
                                    this._router.navigate(['/super-admin/beranda'])
                                }
                                this.snakcBar.open("Data Changed!", 'close', { duration : 1000 }), this.getPAUD(), this.ngAfterViewInit()
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
      const token = localStorage.getItem('token')
      const tokenPayload = decode(token)
      const dialogConfig = new MatDialogConfig()
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
          description : "Tambah PKBM"
      };

      const dialogRef = this.dialog.open(EditPkbmComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
        data =>
          {
                if(data == undefined){
                    this.snakcBar.open("You cancel the Edit Form.", 'close', { duration : 1000 })
                } else {
                  data.id_dinas = tokenPayload.id_dinas
                  data.jenis_lembaga = "PKBM"
                  this.register.ADD_LEMBAGA(data)
                  .subscribe({
                      error : err =>  {
                        if(err instanceof HttpErrorResponse){
                          if(err.status === 401)
                            this._router.navigate(['/super-admin/beranda'])
                          else if(err.status === 500)
                            this.snakcBar.open("There's some failure caused in Database.", 'close', { duration : 1000 })
                        }
                        this.snakcBar.open("Data Created!", 'close', { duration : 1000 }), this.getPAUD(), this.ngAfterViewInit()} })
                }
          }
      );
    }

    detil(id_lembaga : number){
      this.data.changeMessage(id_lembaga)
      this.data.changeName("PKBM")
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


    export interface paud {
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
