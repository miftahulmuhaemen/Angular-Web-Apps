import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { RegisterService } from '../../../../services/register.service';

@Component({
  selector: 'app-edit-pegawai-penilik',
  templateUrl: './edit-pegawai-penilik.component.html',
  styleUrls: ['./edit-pegawai-penilik.component.css']
})
export class EditPegawaiPenilikComponent implements OnInit {

  form: FormGroup;
  description:string;
  dinas = [];
  check = false;
  date = new FormControl(new Date().toISOString());
  jenis_kelamin : string = "Laki-Laki";

  constructor(public registerService:RegisterService, private fb: FormBuilder,
        private dialogRef: MatDialogRef<EditPegawaiPenilikComponent>,
        @Inject(MAT_DIALOG_DATA) data) {

        this.description = data.description;

        if(data.check != undefined){

          if(data.check == 'Pegawai')
            this.check = true

          if(data.status_akun == "Super Admin"){
            registerService.dinas().subscribe(
                (data:any[]) => {
                    for(let b of data){
                        this.dinas.push(b);
                    }
            }, error => console.log('Oops!', error));}
          else {
                this.adminForm(data.id_akun)
            }

          } else {
            this.adminForm(data.id_akun)
          }

        this.form = this.fb.group({
              id_dinas : [data.id_dinas],
              nip : [data.nip,Validators.required],
              nama : [data.nama,Validators.required],
              tanggal_lahir : [data.tanggal_lahir,Validators.required],
              jenis_kelamin : [data.jenis_kelamin,Validators.required],
              pangkat_golongan : [data.pangkat_golongan,Validators.required],
              no_hp : [data.no_hp,Validators.required],
              jabatan : [data.jabatan,Validators.required]
           });

       }


      ngOnInit() {

      }

      adminForm(id : number){
        this.registerService.SPECIFIC_DINAS({ id_akun : id }).subscribe(
            (data:any[]) => {
                for(let b of data){
                    this.dinas.push(b);
                }
        }, error => console.log('Oops!', error));
      }

      Dateparser(){
              let a = new Date(this.form.value.tanggal_lahir);
              delete this.form.value.tanggal_lahir
              this.form.value.tanggal_lahir =  a.getFullYear() + '-' + (a.getMonth()+1) + '-' + a.getDate()
      }

      save() {
          this.Dateparser();
          this.dialogRef.close(this.form.value);
      }

      close() {
          this.dialogRef.close();
      }


}
