import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { RegisterService } from '../../../../services/register.service';
import decode from 'jwt-decode';

@Component({
  selector: 'app-edit-peserta-didik',
  templateUrl: './edit-peserta-didik.component.html',
  styleUrls: ['./edit-peserta-didik.component.css']
})
export class EditPesertaDidikComponent implements OnInit {

    form: FormGroup;
    description:string;
    lembaga = [];
    verified = true;
    toast : string;
    date = new FormControl(new Date().toISOString());

    constructor(public registerService:RegisterService, private fb: FormBuilder,
          private dialogRef: MatDialogRef<EditPesertaDidikComponent>,
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
                 id_peserta_didik : [data.id_peserta_didik,Validators.required],
                 nama : [data.nama,Validators.required],
                 tempat_lahir : [data.tempat_lahir,Validators.required],
                 tanggal_lahir : [data.tanggal_lahir,Validators.required],
                 jenis_kelamin : [data.jenis_kelamin,Validators.required],
                 alamat : [data.alamat,Validators.required],
                 kesetaraan : [data.kesetaraan,Validators.required],
                 status_keaksaraan : [data.status_keaksaraan,Validators.required]
               });

               if(this.form.value.id_lembaga != undefined)
                this.onChange()
           }


            ngOnInit() {
            }

            parser(){
                    let a = new Date(this.form.value.tanggal_lahir);
                    delete this.form.value.tanggal_lahir
                    this.form.value.tanggal_lahir =  a.getFullYear() + '-' + (a.getMonth()+1) + '-' + a.getDate()
            }

            onChange(){
              this.registerService.GET_VERIFIKASI_LEMBAGA({ id_lembaga : this.form.value.id_lembaga })
                .subscribe(
                    (data:any) => {
                      if(data == true)
                        this.verified = false;
                      else
                        this.verified = true;
                }, error => console.log('Oops!', error));
            }

            save() {
                this.parser();
                if(this.verified == true){
                    delete this.form.value.kesetaraan
                    delete this.form.value.status_keaksaraan
                  }

                this.dialogRef.close(this.form.value);
            }

            close() {
                this.dialogRef.close();
            }



  }
