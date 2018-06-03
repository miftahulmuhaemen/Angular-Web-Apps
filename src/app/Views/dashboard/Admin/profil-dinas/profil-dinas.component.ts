import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../material.module';
import { RegisterService } from '../../../../services/register.service';
import decode from 'jwt-decode';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar,MatCardModule,MatSidenavModule,MatCheckboxModule,MatExpansionModule,MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { EditDataDinasComponent } from '../../modals/edit-data-dinas/edit-data-dinas.component'
@Component({
  selector: 'app-profil-dinas',
  templateUrl: './profil-dinas.component.html',
  styleUrls: ['./profil-dinas.component.css']
})
export class ProfilDinasComponent implements OnInit {


  form: FormGroup;
  ubah : string;
  ubah_ : number;

  ngOnInit(){
  }

  constructor(public dialog: MatDialog,public snakcBar : MatSnackBar,public _router : Router,private fb: FormBuilder, public _data : RegisterService) {
    this.getData();
  }

  getData(){
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);
    this._data.GET_PROFIL_DINAS({ id_akun : tokenPayload.id_akun }).subscribe(
        (data:data) => {
          this.form = this.fb.group({
                nama_dinas : [data[0].nama_dinas,Validators.required],
                alamat_kantor : [data[0].alamat_kantor,Validators.required],
                email : [data[0].email,Validators.required],
                telp_fax : [data[0].telp_fax,Validators.required]
                });

                this.ubah_ = data[0].id_dinas
                this.ubah = data[0].gambar

    }, error => console.log('Oops!', error));

  }

  edit(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    var split = this.form.value.alamat_kantor.split(",");
    split[1] = split[1].trim();

    dialogConfig.data = {
      nama_dinas : this.form.value.nama_dinas,
      alamat_kantor : split[0],
      kabupaten : split[1],
      email : this.form.value.email,
      telp_fax : this.form.value.telp_fax,
      field : true
    };

  const dialogRef = this.dialog.open(EditDataDinasComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
      data =>
        {

              if(data == undefined){
                  this.snakcBar.open("You cancel the Edit Form.", 'close', { duration : 1000 })
              } else {
                if(data.filename == undefined){
                    data.filename = this.ubah
                    data.id_dinas = this.ubah_
                this._data.editDinas(data)
                .subscribe({
                    error : err =>  { this.snakcBar.open("Data Created!", 'close', { duration : 1000 }), this.getData()} })
              }
        }
    });
  }

}

export interface data {
  id_dinas : number,
  nama_dinas : string,
  alamat_kantor : string,
  email : string,
  telp_fax : string,
  gambar : string
}
