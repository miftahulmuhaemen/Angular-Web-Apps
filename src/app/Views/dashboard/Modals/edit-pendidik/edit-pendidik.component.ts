import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { RegisterService } from '../../../../services/register.service';
import decode from 'jwt-decode';

@Component({
  selector: 'app-edit-pendidik',
  templateUrl: './edit-pendidik.component.html',
  styleUrls: ['./edit-pendidik.component.css']
})
export class EditPendidikComponent implements OnInit {

  form: FormGroup;
  description:string;
  lembaga = [];
  name : string;
  date = new FormControl(new Date().toISOString());
  jenis_kelamin : string = "Laki-Laki";

  constructor(public registerService:RegisterService, private fb: FormBuilder,
        private dialogRef: MatDialogRef<EditPendidikComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
          const token = localStorage.getItem('token');
          const tokenPayload = decode(token);
          this.description = data.description;
          this.name = data.jenis_lembaga

          if(tokenPayload.role == 'Super Admin'){
          registerService.lembaga().subscribe(
              (data:any[]) => {
                  for(let b of data){
                      this.lembaga.push(b);
                  }
          }, error => console.log('Oops!', error));
          } else {

              if(data.lembaga != undefined)
              this.lembaga.push(data.lembaga)

              else{
              registerService.GET_LEMBAGA_SPESIFIK({ id_akun : tokenPayload.id_akun }).subscribe(
                  (file:any[]) => {
                    for(let b of file){
                        this.lembaga.push(b);
                    }
              }, error => console.log('Oops!', error));}

            }

          this.form = this.fb.group({
               id_lembaga : [data.id_lembaga,Validators.required],
               nip : [data.id_pendidik,Validators.required],
               nama : [data.nama,Validators.required],
               tempat_lahir : [data.tempat_lahir,Validators.required],
               tanggal_lahir : [data.tanggal_lahir,Validators.required],
               jenis_kelamin : [data.jenis_kelamin,Validators.required],
               alamat : [data.alamat,Validators.required],
               pendidikan_terakhir : [data.pendidikan_terakhir,Validators.required],
               tahun_lulus : [data.tahun_lulus,Validators.required],
               status_pendidik : [data.status_pendidik,Validators.required],
               sertifikat_pelatihan : [data.sertifikat_pelatihan,Validators.required],
               status_diklat : [data.status_diklat,Validators.required],
             });
        }

// Dibawah ini bisa parsernya diperbaiki fungsinya, terus
// perbaiki bug, jika user memilih lembagab bukan LKP maka tidak muncul tutor
// karena halaman utama pendidik masih begitu, yang import sudah benar

              parser(){
                      let a = new Date(this.form.value.tanggal_lahir);
                      delete this.form.value.tanggal_lahir
                      this.form.value.tanggal_lahir =  a.getFullYear() + '-' + (a.getMonth()+1) + '-' + a.getDate()
              }

              save() {
                  this.parser();
                  this.dialogRef.close(this.form.value);
              }

              close() {
                  this.dialogRef.close();
              }


  ngOnInit() {
  }

}
