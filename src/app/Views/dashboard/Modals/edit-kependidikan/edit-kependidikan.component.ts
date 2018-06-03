import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { RegisterService } from '../../../../services/register.service';
import decode from 'jwt-decode';

@Component({
  selector: 'app-edit-kependidikan',
  templateUrl: './edit-kependidikan.component.html',
  styleUrls: ['./edit-kependidikan.component.css']
})
export class EditKependidikanComponent implements OnInit {

  form: FormGroup;
  description:string;
  lembaga = [];
  date = new FormControl(new Date().toISOString());
  jenis_kelamin : string = "Laki-Laki";

  constructor(public registerService:RegisterService, private fb: FormBuilder,
        private dialogRef: MatDialogRef<EditKependidikanComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
          const token = localStorage.getItem('token');
          const tokenPayload = decode(token);
          this.description = data.description;

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
                   id_kependidikan : [data.id_kependidikan,Validators.required],
                   nama : [data.nama,Validators.required],
                   tempat_lahir : [data.tempat_lahir,Validators.required],
                   tanggal_lahir : [data.tanggal_lahir,Validators.required],
                   jenis_kelamin : [data.jenis_kelamin,Validators.required],
                   alamat : [data.alamat,Validators.required],
                   pendidikan_terakhir : [data.pendidikan_terakhir,Validators.required],
                   tahun_lulus : [data.tahun_lulus,Validators.required],
                   pangkat_golongan : [data.pangkat_golongan,Validators.required],
                 });

         }

          ngOnInit() {
          }

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

}
