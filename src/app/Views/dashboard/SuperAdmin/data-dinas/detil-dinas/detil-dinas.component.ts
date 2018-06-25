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
  dataSourcePegawai: MatTableDataSource<pegawai>;
  data_tablePegawai : pegawai[]=[];
  data_tablePotensi : potensi_daerah[]=[];

  @ViewChild('paginatorPegawai') brengsektor: MatPaginator;
  @ViewChild('paginatorPotensiDinas') lolilator: MatPaginator;
  @ViewChild('table1') sort: MatSort;
  @ViewChild('table2') sort1: MatSort;

    message : number;
    Obujek : body;
    test : detil_paud;
    test_2 : detil_lkp;
    test_3 : detil_pkbm;
    test_4 : penilik;

  constructor(public ExcelExport : ExcelServiceService,
    public data : DataServiceService,
    private _formBuilder: FormBuilder,
    public register : RegisterService,
    public snakcBar : MatSnackBar,
    public dialog: MatDialog,
    public _router : Router) {

    }

    exporttoExcel(name : string){
      if(name == "Pegawai")
      this.ExcelExport.exportAsExcelFile(this.dataSourcePegawai.data,"Data Pegawai")
      else if(name == "Potensi")
      this.ExcelExport.exportAsExcelFile(this.dataSourcePotensi.data,"Data Potensi")
    }

    check(state : number){
          var columns_pegawai_penilk = [
            {title: "NIP", dataKey : "nip"},
            {title: "Nam", dataKey : "nama"},
            {title: "Tanggal Lahir", dataKey : "tanggal_lahir"},
            {title: "Jenis Kelamin", dataKey : "jenis_kelamin"},
            {title: "Pangkat Golongan", dataKey : "pangkat_golongan"},
            {title: "No. Hp.", dataKey : "no_hp"},
            {title: "Jabatan", dataKey : "jabatan"},
          ];

          var columns_potensi = [
            {title: "ID", dataKey : "id_potensi"},
            {title: "Nama Potensi", dataKey : "nama_potensi"},
            {title: "Jenis Potensi", dataKey : "jenis_potensi"},
          ];

          var columns_lembaga_pendidikan = [
            {title: "SMP", dataKey : "SMP"},
            {title: "SMA", dataKey : "SMA"},
            {title: "D1", dataKey : "D1"},
            {title: "D2", dataKey : "D2"},
            {title: "D3", dataKey : "D3"},
            {title: "D4", dataKey : "D4"},
            {title: "S1", dataKey : "S1"},
            {title: "S2", dataKey : "S2"},
            {title: "S3", dataKey : "S3"},
          ]

          var columns_pendidik = [
            {title: "Pendidik Perempuan", dataKey : "pendidik_P"},
            {title: "Pendidik Laki-Laki", dataKey : "pendidik_L"},
            {title: "Kependidikan Perempuan", dataKey : "kependidikan_P"},
            {title: "Kependidikan Laki-Laki", dataKey : "kependidikan_L"},
            {title: "Peserta Didik Laki-Laki", dataKey : "pesertadidik_L"},
            {title: "Peserta Didik Perempuan", dataKey : "pesertadidik_P"},
          ]

          var columns_pinjam_rusak = [
            {title: "Total Milik Sendiri", dataKey : "total_miliksendiri"},
            {title: "Total Pinjam", dataKey : "total_pinjam"},
            {title: "Total Kondisi Baik", dataKey : "kondisi_baik"},
            {title: "Total Rusak Ringan", dataKey : "kondisi_rusakringan"},
            {title: "Total Rusak Sedang", dataKey : "kondisi_rusaksedang"},
            {title: "Kondisi Rusak Berat", dataKey : "kondisi_rusakberat"},
          ]

          var columns_paud_1 = [
            {title: "Jumlah Lembaga", dataKey : "jumlah_lembaga"},
            {title: "Total TK", dataKey : "total_tk"},
            {title: "Total KB", dataKey : "total_kb"},
            {title: "Total SPS", dataKey : "total_sps"},
            {title: "Terakreditasi", dataKey : "terakreditasi"},
            {title: "Tidak Terakreditasi", dataKey : "tidak_terakreditasi"},
            {title: "Total K13", dataKey : "total_K13"},
            {title: "Total KTSP", dataKey : "total_KTSP"},
          ];

          var columns_paud_2 = [
            {title: "Guru", dataKey : "guru"},
            {title: "Guru Pengasuh", dataKey : "guru_pengasuh"},
            {title: "Guru Pendamping", dataKey : "guru_pendamping"},
            {title: "Sertifikasi Laki-Laki", dataKey : "sertifikasi_L"},
            {title: "Sertifikasi Perempuan", dataKey : "sertifikasi_P"},
            {title: "Tidak Sertifikasi", dataKey : "sertifikasi_tidak"},
            {title: "Diklat Dasar", dataKey : "diklat_dasar"},
            {title: "Diklat Mahir", dataKey : "diklat_mahir"},
            {title: "Diklat Lanjutan", dataKey : "diklat_lanjutan"},
          ];

          var columns_paud_3 = [
            {title: "Peserta Didik TK", dataKey : "pesertadidik_TK"},
            {title: "Peserta Didik KB", dataKey : "pesertadidik_KB"},
            {title: "Peserta Didik TPA", dataKey : "pesertadidik_TPA"},
            {title: "Peserta Didik SPS", dataKey : "pesertadidik_SPS"},
            {title: "Umur 0 - 2 Tahun", dataKey : "tahun_02"},
            {title: "Umur 3 - 4 Tahun", dataKey : "tahun_34"},
            {title: "Umur 5 - 6 Tahun", dataKey : "tahun_56"}
          ];

          var columns_lkp = [
            {title: "Jumlah Lembaga", dataKey : "total_lembaga"},
            {title: "Akreditasi A", dataKey : "akreditasi_a"},
            {title: "Akreditasi B", dataKey : "akreditasi_b"},
            {title: "Akreditasi C", dataKey : "akreditasi_c"},
            {title: "Tidak Terakreditasi", dataKey : "tidak_terakreditasi"},
            {title: "Sertifikasi Laki-Laki", dataKey : "sertifikasi_L"},
            {title: "Sertifikasi Perempuan", dataKey : "sertifikasi_P"},
            {title: "Tidak Sertifikasi", dataKey : "sertifikasi_tidak"},
          ];

          var columns_pkbm = [
            {title: "Jumlah Lembaga", dataKey : "total_lembaga"},
            {title: "Akreditasi A", dataKey : "akreditasi_a"},
            {title: "Akreditasi B", dataKey : "akreditasi_b"},
            {title: "Akreditasi C", dataKey : "akreditasi_c"},
            {title: "Tidak Terakreditasi", dataKey : "tidak_terakreditasi"},
          ];

          var columns_pkbm_2 = [
            {title: "Sertifikasi Laki-Laki", dataKey : "sertifikasi_L"},
            {title: "Sertifikasi Perempuan", dataKey : "sertifikasi_P"},
            {title: "Tidak Sertifikasi", dataKey : "sertifikasi_tidak"},
            {title: "Kesetaraan Paket A", dataKey : "kesetaraan_A"},
            {title: "Kesetaraan Paket B", dataKey : "kesetaraan_B"},
            {title: "Kesetaraan Paket C", dataKey : "kesetaraan_C"},
          ];

          var columns_pamong = [
            {title: "Penilik Laki-Laki", dataKey : "Penilik_L"},
            {title: "Penilik Perempuan", dataKey : "Penilik_P"},
            {title: "Pamong Laki-Laki", dataKey : "Pamong_L"},
            {title: "Pamong Perempuan", dataKey : "Pamong_P"},
          ];


          var doc = new jsPDF('l', 'mm');

          var header = function(data) {
              doc.setFontSize(18);
              doc.setTextColor(40);
              doc.setFontStyle('normal');
              doc.text("BP-PAUD & DIKMAS KALSEL", data.settings.margin.left, 20);
            };

          var options = {
            addPageContent: header,
            margin: {
              top: 25
            },
            startY: doc.autoTable.previous.finalY,
          };

          var general_setting = {
            addPageContent: header,
            margin: {
              top: 25
            },
          };


          var paud = [];  paud.push(this.test)
          var lkp = [];  lkp.push(this.test_2)
          var pkbm = [];  pkbm.push(this.test_3)
          var pamong = []; pamong.push(this.test_4)

          if(state == 0){
            // <h2 class="card-title mb-0">{{ this.Obujek[0].nama_dinas }}</h2>
            // <div class="small text-muted">Alamat : {{ this.Obujek[0].alamat_kantor }}. Email : {{ this.Obujek[0].email }}, Telp : {{ this.Obujek[0].telp_fax }}</div>

                    doc.autoTable(columns_pegawai_penilk, this.dataSourcePegawai.data, { margin : { top : 20 } });
                    doc.autoTable(columns_potensi, this.dataSourcePotensi.data, options);

                    doc.autoTable(columns_paud_1, paud, options);
                    doc.autoTable(columns_paud_2, paud, {  margin : { top : 45 } });
                    doc.autoTable(columns_paud_3, paud, {  margin : { top : 65 }   });
                    doc.autoTable(columns_lembaga_pendidikan, paud, {  margin : { top : 85 }  });
                    doc.autoTable(columns_pendidik, paud, {  margin : { top : 105 }   });
                    doc.autoTable(columns_pinjam_rusak, paud, {  margin : { top : 125 }    });

                    doc.autoTable(columns_lkp, lkp, options);
                    doc.autoTable(columns_lembaga_pendidikan, lkp, { margin : { top : 45 }  });
                    doc.autoTable(columns_pendidik, lkp, {  margin : { top : 65 }     });
                    doc.autoTable(columns_pinjam_rusak, lkp, {  margin : { top : 85 }   });

                    doc.autoTable(columns_pkbm, pkbm, options);
                    doc.autoTable(columns_pkbm_2, pkbm, {  margin : { top : 45 }    });
                    doc.autoTable(columns_lembaga_pendidikan, pkbm, {  margin : { top : 65 }   });
                    doc.autoTable(columns_pendidik, pkbm, {  margin : { top : 85 }  });
                    doc.autoTable(columns_pinjam_rusak, pkbm, {  margin : { top : 105 } });

                    doc.autoTable(columns_pamong, pamong, options);

              } else if (state == 1)
                    doc.autoTable(columns_pegawai_penilk, this.dataSourcePegawai.data, general_setting);
                else if (state == 2){
                     doc.autoTable(columns_pamong, pamong, options);
                   }
                else if (state == 3)
                    doc.autoTable(columns_potensi, this.dataSourcePotensi.data, general_setting);
               else if (state == 4){
                 doc.autoTable(columns_paud_1, paud, general_setting);
                 doc.autoTable(columns_paud_2, paud, {  margin : { top : 45 } });
                 doc.autoTable(columns_paud_3, paud, {  margin : { top : 65 }   });
                 doc.autoTable(columns_lembaga_pendidikan, paud, {  margin : { top : 85 }  });
                 doc.autoTable(columns_pendidik, paud, {  margin : { top : 105 }   });
                 doc.autoTable(columns_pinjam_rusak, paud, {  margin : { top : 125 }    });
                 }
                else if (state == 5){
                  doc.autoTable(columns_lkp, lkp, general_setting);
                  doc.autoTable(columns_lembaga_pendidikan, lkp, { margin : { top : 45 }  });
                  doc.autoTable(columns_pendidik, lkp, {  margin : { top : 65 }     });
                  doc.autoTable(columns_pinjam_rusak, lkp, {  margin : { top : 85 }   });
                  }
               else if (state == 6){
                 doc.autoTable(columns_pkbm, pkbm, general_setting);
                 doc.autoTable(columns_pkbm_2, pkbm, {  margin : { top : 45 }    });
                 doc.autoTable(columns_lembaga_pendidikan, pkbm, {  margin : { top : 65 }   });
                 doc.autoTable(columns_pendidik, pkbm, {  margin : { top : 85 }  });
                 doc.autoTable(columns_pinjam_rusak, pkbm, {  margin : { top : 105 } });
                 }


          doc.save('table.pdf')
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
        .subscribe((data:detil_lkp) => {
            this.test_2 = data[0];
        })

        this.register.GET_PKBM_TABLE({ id_dinas : this.message })
        .subscribe((data:detil_pkbm) => {
            this.test_3 = data[0];
        })

        this.register.GET_PENILIK_DETIL({ id_dinas : this.message })
        .subscribe((data:detil_pkbm) => {
            this.test_4 = data[0];
        })

        this.getPegawaiDetil();
        this.getPotensiDetil();
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
                        this.snakcBar.open("Data Created!", 'close', { duration : 1000 }), this.getPegawaiDetil(), this.ngAfterViewInit()} })
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
                                this.snakcBar.open("Data Changed!", 'close', { duration : 1000 }), this.getPegawaiDetil(),this.ngAfterViewInit()
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


    ngAfterViewInit() {
        this.dataSourcePegawai.paginator = this.brengsektor;
        this.dataSourcePegawai.sort = this.sort;

        this.dataSourcePotensi.paginator = this.lolilator;
        this.dataSourcePotensi.sort = this.sort1;

    }

    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSourcePegawai.filter = filterValue;
      this.dataSourcePotensi.filter = filterValue;
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

  export interface penilik {
    Penilik_L : number,
    Penilik_P : number,
    Pamong_L : number,
    Pamong_P : number
  }
