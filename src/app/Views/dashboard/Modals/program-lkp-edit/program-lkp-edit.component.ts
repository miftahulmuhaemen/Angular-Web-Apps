import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-program-lkp-edit',
  templateUrl: './program-lkp-edit.component.html',
  styleUrls: ['./program-lkp-edit.component.css']
})
export class ProgramLkpEditComponent implements OnInit {

    form: FormGroup;
    description:string;

    constructor(private fb: FormBuilder,
          private dialogRef: MatDialogRef<ProgramLkpEditComponent>,
          @Inject(MAT_DIALOG_DATA) data) {

            this.description = data.description;


            this.form = this.fb.group({
                  nama_program : [data.nama_program,Validators.required],
                  keterangan : [data.keterangan,Validators.required],
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
