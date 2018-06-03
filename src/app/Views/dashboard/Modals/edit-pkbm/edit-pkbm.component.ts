import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';


@Component({
  selector: 'app-edit-pkbm',
  templateUrl: './edit-pkbm.component.html',
  styleUrls: ['./edit-pkbm.component.css']
})
export class EditPkbmComponent implements OnInit {


    form: FormGroup;
    description:string;

    constructor(private fb: FormBuilder,
          private dialogRef: MatDialogRef<EditPkbmComponent>,
          @Inject(MAT_DIALOG_DATA) data) {

            this.description = data.description;
            this.form = this.fb.group({
                  id_lembaga : [data.id_lembaga,Validators.required],
                  nama_lembaga : [data.nama_lembaga,Validators.required],
                  akreditasi : [data.akreditasi,Validators.required],
                  alamat_lembaga : [data.alamat_lembaga,Validators.required],
                  kode_pos : [data.kode_pos,Validators.required],
                  no_telepon : [data.no_telp,Validators.required],
                  tahun_berdiri : [data.tahun_berdiri,Validators.required],
                  kondisi_bangunan : [data.kondisi_bangunan,Validators.required],
                  kepemilikan : [data.kepemilikan,Validators.required]
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
