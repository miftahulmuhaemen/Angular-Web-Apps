import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { RegisterService } from '../../../../services/register.service';


@Component({
  selector: 'app-edit-lkp',
  templateUrl: './edit-lkp.component.html',
  styleUrls: ['./edit-lkp.component.css']
})
export class EditLkpComponent implements OnInit {

    form: FormGroup;
    description:string;
    program = [];

    constructor(public registerService:RegisterService, private fb: FormBuilder,
          private dialogRef: MatDialogRef<EditLkpComponent>,
          @Inject(MAT_DIALOG_DATA) data) {

                    registerService.GET_PROGRAM_LKP().subscribe(
                        (data:any[]) => {
                            for(let b of data){
                                this.program.push(b);
                            }
                    }, error => console.log('Oops!', error));



            this.description = data.description;
            this.form = this.fb.group({
                  id_dinas : [data.id_dinas],
                  id_lembaga : [data.id_lembaga,Validators.required],
                  nama_lembaga : [data.nama_lembaga,Validators.required],
                  nama_program : [data.nama_program],
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
      var polo: string = "";
      for(let x of this.form.value.nama_program){
        if(x != undefined)
          polo += x + ",";
      }
      this.form.value.nama_program = polo
      this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }

  }
