import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-edit-potensi',
  templateUrl: './edit-potensi.component.html',
  styleUrls: ['./edit-potensi.component.css']
})
export class EditPotensiComponent implements OnInit {

  form: FormGroup;
  description:string;
  dinas = [];

  constructor(private fb: FormBuilder,
        private dialogRef: MatDialogRef<EditPotensiComponent>,
        @Inject(MAT_DIALOG_DATA) data) {

          this.description = data.description;
          this.form = this.fb.group({
                nama_potensi : [data.nama_potensi,Validators.required],
                jenis_potensi : [data.jenis_potensi,Validators.required],
             });

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
