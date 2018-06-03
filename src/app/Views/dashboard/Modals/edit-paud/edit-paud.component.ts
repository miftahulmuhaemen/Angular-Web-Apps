import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';


@Component({
  selector: 'app-edit-paud',
  templateUrl: './edit-paud.component.html',
  styleUrls: ['./edit-paud.component.css']
})
export class EditPaudComponent implements OnInit {

  form: FormGroup;
  description:string;

  constructor(private fb: FormBuilder,
        private dialogRef: MatDialogRef<EditPaudComponent>,
        @Inject(MAT_DIALOG_DATA) data) {

          this.description = data.description;
          this.form = this.fb.group({
                id_dinas : [data.id_dinas],
                id_lembaga : [data.id_lembaga,Validators.required],
                nama_lembaga : [data.nama_lembaga,Validators.required],
                nama_program : [data.nama_program,Validators.required],
                kurikulum : [data.kurikulum,Validators.required],
                akreditasi : [data.akreditasi,Validators.required],
                alamat_lembaga : [data.alamat_lembaga,Validators.required],
                kode_pos : [data.kode_pos,Validators.required],
                no_telepon : [data.no_telepon,Validators.required],
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
