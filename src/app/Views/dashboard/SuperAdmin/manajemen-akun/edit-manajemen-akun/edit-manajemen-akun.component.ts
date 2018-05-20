import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { RegisterService } from '../../../../../services/register.service';

@Component({
  selector: 'app-edit-manajemen-akun',
  templateUrl: './edit-manajemen-akun.component.html',
  styleUrls: ['./edit-manajemen-akun.component.css']
})
export class EditManajemenAkunComponent implements OnInit {


    form: FormGroup;
    description:string;
    dinas = [];
    check = false;

    constructor(public registerService:RegisterService, private fb: FormBuilder,
          private dialogRef: MatDialogRef<EditManajemenAkunComponent>,
          @Inject(MAT_DIALOG_DATA) data) {

          this.description = data.description;
          this.check = data.check;

          registerService.dinas().subscribe(
              (data:any[]) => {
                  for(let b of data){
                      this.dinas.push(b);
                  }
          }, error => console.log('Oops!', error));

          this.form = this.fb.group({
                 id_akun: [data.id_akun, Validators.nullValidator],
                 id_dinas : [data.id_dinas],
                 username : [data.username, Validators.required],
                 nama_admin : [data.nama_admin, Validators.required],
                 password : [data.password, Validators.required],
                 status_akun : [data.status_akun, Validators.required],
             });

         }

      checkReq(){

        if(this.check==true || this.form.value.status_akun == "Super Admin")
          this.check = false;
        else
          this.check = true;

      }


        ngOnInit() {

        }

        save() {
            this.dialogRef.close(this.form.value);
        }

        close() {
            this.dialogRef.close();
        }

}
