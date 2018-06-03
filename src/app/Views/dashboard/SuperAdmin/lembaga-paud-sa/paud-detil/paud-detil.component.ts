import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataServiceService } from '../../../../../services/data-service.service'
import { MaterialModule } from '../../../../../material.module';
import { FormBuilder, FormGroup, Validators, FormGroupDirective,FormControl} from '@angular/forms';
import { RegisterService } from '../../../../../services/register.service';
import { ExcelServiceService } from '../../../../../services/excel-service.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar,MatCardModule,MatSidenavModule,MatCheckboxModule,MatExpansionModule,MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { KonfirmasiComponent } from '../../../../konfirmasi/konfirmasi.component'
import { EditPendidikComponent } from '../../../modals/edit-pendidik/edit-pendidik.component'
import { EditKependidikanComponent } from '../../../modals/edit-kependidikan/edit-kependidikan.component'
import { EditPesertaDidikComponent } from '../../../modals/edit-peserta-didik/edit-peserta-didik.component';
import { Router } from '@angular/router';
import { CdkTableModule  } from '@angular/cdk/table';
import decode from 'jwt-decode';

//Export to PDF Library
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';



@Component({
  selector: 'app-paud-detil',
  templateUrl: './paud-detil.component.html',
  styleUrls: ['./paud-detil.component.css']
})
export class PaudDetilComponent implements OnInit {

  displayedColumnPesertadidik = ['id_peserta_didik','nama_lembaga','nama','tempat_lahir','tanggal_lahir','jenis_kelamin','alamat','kesetaraan','status_keaksaraan','edit','delete'];
  displayedColumnPendidik = ['id_pendidik','nama_lembaga','nama','tempat_lahir','tanggal_lahir','jenis_kelamin','alamat','pendidikan_terakhir','tahun_lulus','status_pendidik','sertifikat_pelatihan','status_diklat','edit','delete'];
  displayedColumnKependidikan = ['id_kependidikan','nama_lembaga','nama','tempat_lahir','tanggal_lahir','pangkat_golongan','jenis_kelamin','alamat','pendidikan_terakhir','tahun_lulus','edit','delete'];

  dataSource_Pesertadidik : MatTableDataSource<pesertadidik>;
  dataSource_Pendidik :MatTableDataSource<pendidik>;
  dataSource_Kependidikan : MatTableDataSource<kependidikan>;
  data_table_Pesertadidik : pesertadidik[]=[];
  data_table_Pendidik : pendidik[]=[];
  data_table_Kependidikan: kependidikan[]=[];

      @ViewChild('paginator_pesertadidik') pag_pesertadidik: MatPaginator;
      @ViewChild('table_pesertadidik') sort_pesertadidik: MatSort;
      @ViewChild('paginator_pendidik') pag_pendidik: MatPaginator;
      @ViewChild('table_pendidik') sort_pendidik: MatSort;
      @ViewChild('paginator_kependidikan') paginator_kependidikan : MatPaginator;
      @ViewChild('table_kependidikan') sort_kependidikan: MatSort;
      validity : boolean
      name : string;
      message : number;
      Obujek : body;

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

    this.data.currentMessage.subscribe(message => this.message = message )
    this.data.nameMessage.subscribe(message => this.name = message)
    this.register.GET_PAUD_DETIL({ id_lembaga : this.message })
    .subscribe((data:body) => {
        this.Obujek = data[0];
    })

    this.getPendidik()
    this.getKependidikan()
    this.getPesertadidik()
  }

/*




EDIT DELETE













*/



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
       jenis_lembaga : this.name,
       identifier : this.name,
       lembaga : {
         id_lembaga : this.Obujek.id_lembaga,
         nama_lembaga : this.Obujek.nama_lembaga
       },
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

tambahPendidik () {

const dialogConfig = new MatDialogConfig();
dialogConfig.autoFocus = true;
dialogConfig.data = {
    jenis_lembaga : this.name,
    lembaga : {
      id_lembaga : this.Obujek.id_lembaga,
      nama_lembaga : this.Obujek.nama_lembaga
    },
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

tambahKependidikan () {

const dialogConfig = new MatDialogConfig();
dialogConfig.autoFocus = true;
dialogConfig.data = {
    lembaga : {
      id_lembaga : this.Obujek.id_lembaga,
      nama_lembaga : this.Obujek.nama_lembaga
    },
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


tambahPesertadidik () {

const dialogConfig = new MatDialogConfig();
dialogConfig.autoFocus = true;
dialogConfig.data = {
    lembaga : {
      id_lembaga : this.Obujek.id_lembaga,
      nama_lembaga : this.Obujek.nama_lembaga
    },
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
        identifier : this.name,
        lembaga : {
          id_lembaga : this.Obujek.id_lembaga,
          nama_lembaga : this.Obujek.nama_lembaga
        },
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
        identifier : this.name,
        lembaga : {
          id_lembaga : this.Obujek.id_lembaga,
          nama_lembaga : this.Obujek.nama_lembaga
        },
        description : "Edit Peserta Didik"
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


deletePesertaDidik(id_peserta_didik: number){
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



  getPendidik(){
    this.register.GET_PAUD_DETIL_PENDIDIK({ id_lembaga : this.message })
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

    this.dataSource_Pendidik = new MatTableDataSource(this.data_table_Pendidik);
  }

  getKependidikan(){
    this.register.GET_PAUD_DETIL_KEPENDIDIKAN({ id_lembaga : this.message })
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

    this.dataSource_Kependidikan = new MatTableDataSource(this.data_table_Kependidikan);
  }

  getPesertadidik(){
    this.register.GET_PAUD_DETIL_PESERTA_DIDIK({ id_lembaga : this.message })
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

    this.dataSource_Pesertadidik = new MatTableDataSource(this.data_table_Pesertadidik);
  }

  ngAfterViewInit() {
      this.dataSource_Pesertadidik.paginator = this.pag_pesertadidik;
      this.dataSource_Pesertadidik.sort = this.sort_pesertadidik;

      this.dataSource_Kependidikan.paginator = this.paginator_kependidikan;
      this.dataSource_Kependidikan.sort = this.sort_kependidikan;

      this.dataSource_Pendidik.paginator = this.pag_pendidik;
      this.dataSource_Pendidik.sort = this.sort_pendidik;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource_Pesertadidik.filter = filterValue;
    this.dataSource_Kependidikan.filter = filterValue;
    this.dataSource_Pendidik.filter = filterValue;
  }


}


export interface body {
    id_lembaga : number,
    nama_lembaga : string,
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
