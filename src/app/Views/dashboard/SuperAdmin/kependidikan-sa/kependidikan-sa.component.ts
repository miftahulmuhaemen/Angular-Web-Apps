import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MaterialModule } from '../../../../material.module';
import { FormBuilder, FormGroup, Validators, FormGroupDirective,FormControl} from '@angular/forms';
import { RegisterService } from '../../../../services/register.service';
import { ExcelServiceService } from '../../../../services/excel-service.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar,MatCardModule,MatSidenavModule,MatCheckboxModule,MatExpansionModule,MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { KonfirmasiComponent } from '../../../konfirmasi/konfirmasi.component'
import { EditKependidikanComponent } from '../../modals/edit-kependidikan/edit-kependidikan.component'
import { Router } from '@angular/router';
import { CdkTableModule  } from '@angular/cdk/table';
import decode from 'jwt-decode';
import { ImportXlsxService } from '../../../../services/import-xlsx.service';

//Export to PDF Library
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-kependidikan-sa',
  templateUrl: './kependidikan-sa.component.html',
  styleUrls: ['./kependidikan-sa.component.css']
})
export class KependidikanSaComponent implements OnInit {
  displayedColumnKependidikan = ['id_kependidikan','nama_lembaga','nama','tempat_lahir','tanggal_lahir','pangkat_golongan','jenis_kelamin','alamat','pendidikan_terakhir','tahun_lulus','edit','delete'];
  dataSource_Kependidikan : MatTableDataSource<kependidikan>;
  data_table_Kependidikan: kependidikan[]=[];
  @ViewChild('paginator_kependidikan') paginator_kependidikan : MatPaginator;
  @ViewChild('table_kependidikan') sort_kependidikan: MatSort;

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


  ngOnInit() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);

    this.header_id_dinas = tokenPayload.id_dinas
    this.header_role = tokenPayload.role
    this.header_id_akun = tokenPayload.id_akun

    if(this.header_role == 'Super Admin')
      this.validity = true

    this._import.onKependidikanStream()
    this._import.status.subscribe(res => {
      this.getKependidikan(), this.ngAfterViewInit()
    })
  }

  editKependidikan (
    id_lembaga : number,
    id_kependidikan : string,
    nama : string,
    tempat_lahir : string,
    tanggal_lahir : Date,
    jenis_kelamin : string,
    alamat : string,
    pendidikan_terakhir : string,
    tahun_lulus : number,
    pangkat_golongan : string) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
          id_lembaga : id_lembaga,
          id_kependidikan : id_kependidikan,
          nama : nama,
          tempat_lahir : tempat_lahir,
          tanggal_lahir : tanggal_lahir,
          jenis_kelamin : jenis_kelamin,
          alamat : alamat,
          pendidikan_terakhir : pendidikan_terakhir,
          tahun_lulus : tahun_lulus,
          pangkat_golongan : pangkat_golongan,
          description : "Edit Kependidikan"
    };

    const dialogRef = this.dialog.open(EditKependidikanComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
      data =>
        {
              if(data == undefined){
                  this.snakcBar.open("You cancel the Edit Form.", 'close', { duration : 1000 })
              } else {
                data.id_kependidikan_lama = id_kependidikan;
                this.register.EDIT_KEPENDIDIKAN(data)
                .subscribe({
                    error : err =>  {
                      if(err instanceof HttpErrorResponse){
                        if(err.status === 401)
                          this._router.navigate(['/super-admin/beranda'])
                      }
                      this.snakcBar.open("Data Created!", 'close', { duration : 1000 }), this.getKependidikan(), this.ngAfterViewInit()} })
              }
        }
    );
  }

  deleteKependidikan(id_kependidikan: number){
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
                          this.register.DELETE_KEPENDIDIKAN({ id_kependidikan : id_kependidikan }).subscribe({
                            error : err =>  {
                              if(err instanceof HttpErrorResponse){
                                if(err.status === 401)
                                  this._router.navigate(['/super-admin/beranda'])
                              }
                              this.snakcBar.open("Data Changed!", 'close', { duration : 1000 }), this.getKependidikan(), this.ngAfterViewInit()
                            }
                          });
                      } else {
                          this.snakcBar.open("You cancel the Delete.", 'close', { duration : 1000 })
                      }
                  }
              }
          );
  }

  getKependidikan(){
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);

    if(tokenPayload.role == 'Super Admin'){
    this.register.GET_KEPENDIDIKAN()
    .subscribe(
        (data:any[]) => {
         this.dataSource_Kependidikan.data = data;
    }, error => {
      if(error instanceof HttpErrorResponse){
        if(error.status === 401)
          this._router.navigate(['/super-admin/beranda'])
      } else {
        console.log(error)
      }
    });} else {
      this.register.GET_KEPENDIDIKAN_SPESIFIK({ id_akun : tokenPayload.id_akun })
      .subscribe(
          (data:any[]) => {
           this.dataSource_Kependidikan.data = data;
      }, error => {
        if(error instanceof HttpErrorResponse){
          if(error.status === 401)
            this._router.navigate(['/super-admin/beranda'])
        } else {
          console.log(error)
        }
      });
    }

    this.dataSource_Kependidikan = new MatTableDataSource(this.data_table_Kependidikan);
  }

  tambahKependidikan () {

  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.data = {
      description : "Tambah Kependidikan"
  };

  const dialogRef = this.dialog.open(EditKependidikanComponent, dialogConfig);
   dialogRef.afterClosed().subscribe(
   data =>
     {
           if(data == undefined){
               this.snakcBar.open("You cancel the Tambah Form.", 'close', { duration : 1000 })
           } else {
             this.register.ADD_KEPENDIDIKAN(data)
             .subscribe({
                 error : err =>  {
                   if(err instanceof HttpErrorResponse){
                     if(err.status === 401)
                       this._router.navigate(['/super-admin/beranda'])
                   }
                   this.snakcBar.open("Data Created!", 'close', { duration : 1000 }), this.getKependidikan(), this.ngAfterViewInit()} })
           }
     }
  );
  }

  ngAfterViewInit() {
      this.dataSource_Kependidikan.paginator = this.paginator_kependidikan;
      this.dataSource_Kependidikan.sort = this.sort_kependidikan;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource_Kependidikan.filter = filterValue;
  }



          exporttoExcel(){
            this.ExcelExport.exportAsExcelFile(this.dataSource_Kependidikan.data,"Data Kependidikan")
          }

          exportAction(){

            var columns_kependidikan = [
              {title: "ID", dataKey : "id_pendidik"},
              {title: "Lembaga", dataKey : "nama_lembaga"},
              {title: "Nama", dataKey : "nama"},
              {title: "Tempat", dataKey : "tempat_lahir"},
              {title: "Tanggal Lahir", dataKey : "tanggal_lahir"},
              {title: "Pangkat Golongan", dataKey : "pangkat_golongan"},
              {title: "Jenis Kelamin", dataKey : "jenis_kelamin"},
              {title: "Alamat", dataKey : "alamat"},
              {title: "Pendidikan", dataKey : "pendidikan_terakhir"},
              {title: "Tahun", dataKey : "tahun_lulus"},
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

            doc.autoTable(columns_kependidikan, this.dataSource_Kependidikan.data, general_setting);
            doc.save('table.pdf')

          }


}


   export interface kependidikan {
      id_kependidikan : number,
      id_lembaga : number,
      nama_lembaga : string,
      nama : string,
      tempat_lahir : string,
      tanggal_lahir : Date,
      jenis_kelamin : string,
      pangkat_golongan : string,
      alamat : string,
      pendidikan_terakhir : string,
      tahun_lulus : number,
   }
