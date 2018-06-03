import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataServiceService } from '../../../../../services/data-service.service'
import { MaterialModule } from '../../../../../material.module';
import { FormBuilder, FormGroup, Validators, FormGroupDirective,FormControl} from '@angular/forms';
import { RegisterService } from '../../../../../services/register.service';
import { ExcelServiceService } from '../../../../../services/excel-service.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar,MatCardModule,MatSidenavModule,MatCheckboxModule,MatExpansionModule,MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { KonfirmasiComponent } from '../../../../konfirmasi/konfirmasi.component'
import { EditPegawaiPenilikComponent } from '../../../modals/edit-pegawai-penilik/edit-pegawai-penilik.component'
import { EditPotensiComponent } from '../../../modals/edit-potensi/edit-potensi.component'
import { Router } from '@angular/router';
import { CdkTableModule  } from '@angular/cdk/table';

//Export to PDF Library
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-detil-dinas',
  templateUrl: './detil-dinas.component.html',
  styleUrls: ['./detil-dinas.component.css']
})
export class DetilDinasComponent implements OnInit {

  displayedColumnsPegawai = ['nip','nama','tanggal_lahir','jenis_kelamin','pangkat_golongan','no_hp','jabatan','edit','delete'];
  displayedColumnsPotensi = ['id_potensi','nama_potensi','jenis_potensi','edit','delete'];
  dataSourcePotensi : MatTableDataSource<potensi_daerah>;
  displayedColumnsPenilik = ['nip','nama','tanggal_lahir','jenis_kelamin','pangkat_golongan','no_hp','jabatan','edit','delete'];
  dataSourcePenilik : MatTableDataSource<pegawai>;
  dataSourcePegawai: MatTableDataSource<pegawai>;
  data_tablePenilik : pegawai[]=[];
  data_tablePegawai : pegawai[]=[];
  data_tablePotensi : potensi_daerah[]=[];

  @ViewChild('paginatorPegawai') brengsektor: MatPaginator;
  @ViewChild('paginatorPotensiDinas') lolilator: MatPaginator;
  @ViewChild('paginatorPenilik') madafaka: MatPaginator;
  @ViewChild('table1') sort: MatSort;
  @ViewChild('table2') sort1: MatSort;
  @ViewChild('table3') sort2: MatSort;

    message : number;
    Obujek : body;
    test : detil_paud;
    test_2 : detil_lkp;
    test_3 : detil_pkbm;

  constructor(public data : DataServiceService,
    private _formBuilder: FormBuilder,
    public register : RegisterService,
    public snakcBar : MatSnackBar,
    public dialog: MatDialog,
    public _router : Router) {

    }


    check(){



    }

    ngOnInit() {
        this.data.currentMessage.subscribe(message => this.message = message)
        this.register.GET_PROFIL_DETIL({ id_dinas : this.message })
        .subscribe((data:body) => {
            this.Obujek = data;
        })

        this.register.GET_PAUD_TABLE({ id_dinas : this.message })
        .subscribe((data:detil_paud) => {
            this.test = data[0];
        })

        this.register.GET_LKP_TABLE({ id_dinas : this.message })
        .subscribe((data:detil_paud) => {
            this.test_2 = data[0];
        })

        this.register.GET_PKBM_TABLE({ id_dinas : this.message })
        .subscribe((data:detil_paud) => {
            this.test_3 = data[0];
        })

        this.getPegawaiDetil();
        this.getPotensiDetil();
        this.getPenilikPamongDetil();
    }



    editPegawaiDetil (nip : number, nama : string, tanggal_lahir : string, jenis_kelamin, pangkat_golongan : string, no_hp : number, jabatan : string) {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
          id_dinas : this.message,
          nip : nip,
          nama : nama,
          tanggal_lahir :  tanggal_lahir.substring(0,10),
          jenis_kelamin :  jenis_kelamin,
          pangkat_golongan :  pangkat_golongan,
          no_hp :  no_hp,
          jabatan :  jabatan,
          description : "Edit Pegawai"
      };

      const dialogRef = this.dialog.open(EditPegawaiPenilikComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
        data =>
          {
                if(data == undefined){
                    this.snakcBar.open("You cancel the Edit Form.", 'close', { duration : 1000 })
                } else {
                  data.nip_awal = nip;
                  console.log(data)
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
                                this.snakcBar.open("Data Changed!", 'close', { duration : 1000 }), this.getPegawaiDetil(), this.getPenilikPamongDetil(),this.ngAfterViewInit()
                              }
                            });
                        } else {
                            this.snakcBar.open("You cancel the Delete.", 'close', { duration : 1000 })
                        }
                    }
                }
            );
    }

    editPotensiDetil(id_potensi : number, nama_potensi : string, jenis_potensi : string){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
          nama_potensi : nama_potensi,
          jenis_potensi : jenis_potensi,
          description : "Edit Potensi Daerah"
      };
      console.log(dialogConfig.data)


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

          // RESTful API DeleteUser
          const dialogRef = this.dialog.open(KonfirmasiComponent, dialogConfig);
              dialogRef.afterClosed().subscribe(
              data =>
                {
                      if(data == undefined){
                          this.snakcBar.open("You cancel the Delete.", 'close', { duration : 1000 })
                      } else {
                        if(data == true) {
                            this.register.DELETE_PEGAWAI_DETIL({ id_potensi : id_potensi }).subscribe({
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


    /* Restful API Get All Pegawai from certain Detil*/
    getPegawaiDetil(){
      this.register.getPegawaiDetil({ id_dinas : this.message })
      .subscribe(
          (data:any[]) => {
           this.dataSourcePegawai.data = data;
           console.log(this.dataSourcePegawai.data)
      }, error => {
        if(error instanceof HttpErrorResponse){
          if(error.status === 401)
            this._router.navigate(['/super-admin/beranda'])
        } else {
          console.log(error)
        }
      });

      this.dataSourcePegawai = new MatTableDataSource(this.data_tablePegawai);
    }


    getPotensiDetil(){
      this.register.getPotensiDetil({ id_dinas : this.message })
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

      this.dataSourcePotensi = new MatTableDataSource(this.data_tablePotensi);
    }


    getPenilikPamongDetil(){
          this.register.getPenilikPamongDetil({ id_dinas : this.message })
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

          this.dataSourcePenilik = new MatTableDataSource(this.data_tablePenilik);
      }

    ngAfterViewInit() {
        this.dataSourcePegawai.paginator = this.brengsektor;
        this.dataSourcePegawai.sort = this.sort;

        this.dataSourcePotensi.paginator = this.lolilator;
        this.dataSourcePotensi.sort = this.sort1;

        this.dataSourcePenilik.paginator = this.madafaka;
        this.dataSourcePenilik.sort = this.sort2;
    }

    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSourcePegawai.filter = filterValue;
      this.dataSourcePotensi.filter = filterValue;
      this.dataSourcePenilik.filter = filterValue;
    }

}



export interface pegawai {
  nip : number,
  nama : string,
  tanggal_lahir : Date,
  jenis_kelamin :  string,
  pangkat_golongan :  string,
  no_hp :  string,
  jabatan :  string,
}


export interface potensi_daerah {
  id_potensi : number;
  nama_potensi : string;
  jenis_potensi : string;
}

export interface body {
  id_dinas : number,
  nama_dinas : string,
  alamat_kantor : string,
  email : string,
  telp_fax : string,
  gambar : string
}


  export interface detil_paud {
    jumlah_lembaga : number,
    total_tk : number,
    total_kb : number,
    total_tpa : number,
    total_sps : number,
    terakreditasi : number,
    tidak_terakreditasi : number,
    total_K13 : number,
    total_KTSP : number,
    total_miliksendiri : number,
    total_pinjam: number,
    kondisi_baik : number,
    kondisi_rusakringan : number,
    kondisi_rusaksedang : number,
    kondisi_rusakberat : number,
    pendidik_P : number,
    pendidik_L : number,
    kependidikan_P : number,
    kependidikan_L : number,
    guru : number,
    guru_pengasuh : number,
    guru_pendamping : number,
    SMP : number,
    SMA : number,
    D1 : number,
    D2 : number,
    D3 : number,
    D4 : number,
    S1 : number,
    S2 : number,
    S3 : number,
    sertifikasi_L : number,
    sertifikasi_P : number,
    sertifikasi_tidak : number,
    diklat_dasar : number,
    diklat_mahir : number,
    diklat_lanjutan : number,
    pesertadidik_L : number,
    pesertadidik_P : number,
    pesertadidik_TK : number,
    pesertadidik_KB : number,
    pesertadidik_TPA : number,
    pesertadidik_SPS : number,
    tahun_02 : number,
    tahun_34 : number,
    tahun_56 : number
  }

  export interface detil_lkp {
    total_lembaga : number,
    akreditasi_a : number,
    akreditasi_b : number,
    akreditasi_c : number,
    tidak_terakreditasi : number,
    total_miliksendiri : number,
    total_pinjam: number,
    kondisi_baik : number,
    kondisi_rusakringan : number,
    kondisi_rusaksedang : number,
    kondisi_rusakberat : number,
    pendidik_P : number,
    pendidik_L : number,
    kependidikan_P : number,
    kependidikan_L : number,
    SMP : number,
    SMA : number,
    D1 : number,
    D2 : number,
    D3 : number,
    D4 : number,
    S1 : number,
    S2 : number,
    S3 : number,
    sertifikasi_L : number,
    sertifikasi_P : number,
    sertifikasi_tidak : number,
    pesertadidik_L : number,
    pesertadidik_P : number,
  }

  export interface detil_pkbm {
    total_lembaga : number,
    akreditasi_a : number,
    akreditasi_b : number,
    akreditasi_c : number,
    tidak_terakreditasi : number,
    total_miliksendiri : number,
    total_pinjam: number,
    kondisi_baik : number,
    kondisi_rusakringan : number,
    kondisi_rusaksedang : number,
    kondisi_rusakberat : number,
    pendidik_P : number,
    pendidik_L : number,
    kependidikan_P : number,
    kependidikan_L : number,
    SMP : number,
    SMA : number,
    D1 : number,
    D2 : number,
    D3 : number,
    D4 : number,
    S1 : number,
    S2 : number,
    S3 : number,
    sertifikasi_L : number,
    sertifikasi_P : number,
    sertifikasi_tidak : number,
    pesertadidik_L : number,
    pesertadidik_P : number,
    Kesetaraan_A : number,
    kesetaraan_B : number,
    kesetaraan_C : number
  }
