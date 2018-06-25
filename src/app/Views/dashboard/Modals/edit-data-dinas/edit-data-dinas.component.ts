import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';

  const url = 'http://localhost:3000/superadmin/upload';
@Component({
  selector: 'app-edit-data-dinas',
  templateUrl: './edit-data-dinas.component.html',
  styleUrls: ['./edit-data-dinas.component.css']
})
export class EditDataDinasComponent implements OnInit {

  form: FormGroup;
  description:string;
  filename : string;
  full_alamat : string;
  field : boolean = false;

  uploader : FileUploader = new FileUploader({url:url})


  constructor(private fb: FormBuilder,
        private dialogRef: MatDialogRef<EditDataDinasComponent>,
        @Inject(MAT_DIALOG_DATA) data) {


          this.uploader.onBeforeUploadItem = (item) => {
              item.withCredentials = false;
          }

          this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            this.filename = JSON.parse(response).uploadname
          }
          
          this.description = data.description;
          this.field = data.field;
          this.form = this.fb.group({
                 nama_dinas : [data.nama_dinas],
                 alamat_kantor : [data.alamat_kantor, Validators.required],
                 kabupaten : [data.kabupaten, Validators.required],
                 email : [data.email, Validators.required],
                 telp_fax : [data.telp_fax, Validators.required]
             });
        }

            ngOnInit() {
            }

            save() {
                this.full_alamat = this.form.value.alamat_kantor + ', ' + this.form.value.kabupaten;
                delete this.form.value.kabupaten;
                delete this.form.value.alamat_kantor;
                this.form.value.alamat_kantor = this.full_alamat;
                if(this.form.value.filename==undefined)
                this.form.value.filename = this.filename;
                //console.log(this.form.value)
                this.dialogRef.close(this.form.value);
            }

            close() {
                this.dialogRef.close();
            }

}
