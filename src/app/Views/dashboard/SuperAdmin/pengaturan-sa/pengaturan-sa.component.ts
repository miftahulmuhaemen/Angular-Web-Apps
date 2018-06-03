import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { RegisterService } from '../../../../services/register.service';
import decode from 'jwt-decode';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pengaturan-sa',
  templateUrl: './pengaturan-sa.component.html',
  styleUrls: ['./pengaturan-sa.component.css']
})
export class PengaturanSaComponent implements OnInit {

      form: FormGroup;

  constructor(public snakcBar : MatSnackBar,public _router : Router,private fb: FormBuilder, public _data : RegisterService) {
    this.getData();
  }

  ngOnInit() {
  }

  getData(){
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);
    this._data.PENGATURAN_USER({ id_akun : tokenPayload.id_akun }).subscribe(
        (data:data) => {
          this.form = this.fb.group({
                username : [data[0].username,Validators.required],
                password : [data[0].password,Validators.required],
                nama_admin : [data[0].nama_admin,Validators.required]
                });

    }, error => console.log('Oops!', error));

  }

  save(){
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);
    this.form.value.id_dinas = tokenPayload.id_dinas
    this.form.value.id_akun = tokenPayload.id_akun
    this.form.value.status_akun = tokenPayload.role

    console.log(this.form.value)
    this._data.editPost(this.form.value)
    .subscribe({
        error : err =>  {
          if(err instanceof HttpErrorResponse){
            if(err.status === 401)
              this._router.navigate(['/super-admin/beranda'])
          }
          this.snakcBar.open("Data Changed!", 'close', { duration : 1000 }), this.getData()} })
  }

}

export interface data {
  id_dinas : number,
  nama_admin : string,
  username : string,
  password : string,

}
