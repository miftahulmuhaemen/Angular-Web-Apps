import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';


@Component({
  selector: 'app-konfirmasi',
  templateUrl: './konfirmasi.component.html',
  styleUrls: ['./konfirmasi.component.css']
})

export class KonfirmasiComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<KonfirmasiComponent>,
  @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit() {
  }

  save() {
      this.dialogRef.close(true);
  }

  close() {
      this.dialogRef.close(false);
  }

}
