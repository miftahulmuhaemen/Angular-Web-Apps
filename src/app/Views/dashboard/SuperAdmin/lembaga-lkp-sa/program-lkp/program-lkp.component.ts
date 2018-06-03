import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MaterialModule } from '../../../../../material.module';
import { FormBuilder, FormGroup, Validators, FormGroupDirective,FormControl} from '@angular/forms';
import { RegisterService } from '../../../../../services/register.service';
import { ExcelServiceService } from '../../../../../services/excel-service.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar,MatCardModule,MatSidenavModule,MatCheckboxModule,MatExpansionModule,MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { KonfirmasiComponent } from '../../../../konfirmasi/konfirmasi.component'
import { ProgramLkpEditComponent } from '../../../modals/program-lkp-edit/program-lkp-edit.component'
import { Router } from '@angular/router';
import { CdkTableModule  } from '@angular/cdk/table';

@Component({
  selector: 'app-program-lkp',
  templateUrl: './program-lkp.component.html',
  styleUrls: ['./program-lkp.component.css']
})
export class ProgramLkpComponent implements OnInit {

    displayedColumnsPotensi = ['nama_program','keterangan','edit','delete'];
    dataSourcePotensi : MatTableDataSource<program_lkp>;
    data_tablePotensi : program_lkp[]=[];

        @ViewChild('paginatorPotensiDinas') lolilator: MatPaginator;
        @ViewChild('table2') sort1: MatSort;

          constructor(
            private _formBuilder: FormBuilder,
          public register : RegisterService,
          public snakcBar : MatSnackBar,
          public dialog: MatDialog,
          public _router : Router) { }

          ngOnInit() {
            this.getProgramLKP();
          }

          getProgramLKP(){
            this.register.GET_PROGRAM_LKP()
            .subscribe(
                (data:any[]) => {
                 this.dataSourcePotensi.data = data;
            }, error => {
              if(error instanceof HttpErrorResponse){
                if(error.status === 401)
                  this._router.navigate(['/super-admin/beranda'])
              } else {
                console.log(error)
              }
            });

            this.dataSourcePotensi = new MatTableDataSource(this.data_tablePotensi);
          }

          editProgram(
              nama_program : string,
              keterangan : string){

            const dialogConfig = new MatDialogConfig();
            dialogConfig.autoFocus = true;
            dialogConfig.data = {
                  nama_program : nama_program,
                  keterangan : keterangan,
                  description : "Edit LKP"
            };
            console.log(dialogConfig.data)


            const dialogRef = this.dialog.open(ProgramLkpEditComponent, dialogConfig);
              dialogRef.afterClosed().subscribe(
              data =>
                {
                      if(data == undefined){
                          this.snakcBar.open("You cancel the Edit Form.", 'close', { duration : 1000 })
                      } else {
                        data.nama_program_lama = nama_program
                        this.register.EDIT_PROGRAM_LKP(data)
                        .subscribe({
                            error : err =>  {
                              if(err instanceof HttpErrorResponse){
                                if(err.status === 401)
                                  this._router.navigate(['/super-admin/beranda'])
                              }
                              this.snakcBar.open("Data Created!", 'close', { duration : 1000 }), this.getProgramLKP(), this.ngAfterViewInit()} })
                      }
                }
            );
          }

          deleteProgramLKP(nama_program : number) {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.autoFocus = true;

                // RESTful API DeleteUser
                const dialogRef = this.dialog.open(KonfirmasiComponent, dialogConfig);
                    dialogRef.afterClosed().subscribe(
                    data =>
                      {
                            if(data == undefined){
                                this.snakcBar.open("You cancel the Delete.", 'close', { duration : 1000 })
                            } else {
                              if(data == true) {
                                  this.register.DELETE_PROGRAM_LKP({ nama_program : nama_program }).subscribe({
                                    error : err =>  {
                                      if(err instanceof HttpErrorResponse){
                                        if(err.status === 401)
                                          this._router.navigate(['/super-admin/beranda'])
                                      }
                                      this.snakcBar.open("Data Changed!", 'close', { duration : 1000 }), this.getProgramLKP(), this.ngAfterViewInit()
                                    }
                                  });
                              } else {
                                  this.snakcBar.open("You cancel the Delete.", 'close', { duration : 1000 })
                              }
                          }
                      }
                  );
          }


                    addProgramLKP() {
                      const dialogConfig = new MatDialogConfig();
                      dialogConfig.autoFocus = true;

                      dialogConfig.data = {
                            description : "Edit LKP"
                      };
                          // RESTful API DeleteUser
                          const dialogRef = this.dialog.open(ProgramLkpEditComponent, dialogConfig);
                              dialogRef.afterClosed().subscribe(
                              data =>
                                {
                                      if(data == undefined){
                                          this.snakcBar.open("You cancel the Add.", 'close', { duration : 1000 })
                                      } else {
                                            this.register.ADD_PROGRAM_LKP(data).subscribe({
                                              error : err =>  {
                                                if(err instanceof HttpErrorResponse){
                                                  if(err.status === 401)
                                                    this._router.navigate(['/super-admin/beranda'])
                                                }
                                                this.snakcBar.open("Data Changed!", 'close', { duration : 1000 }), this.getProgramLKP(), this.ngAfterViewInit()
                                              }
                                        });
                                    }
                                }
                            );
                    }

          ngAfterViewInit() {
              this.dataSourcePotensi.paginator = this.lolilator;
              this.dataSourcePotensi.sort = this.sort1;
          }

          applyFilter(filterValue: string) {
            filterValue = filterValue.trim(); // Remove whitespace
            filterValue = filterValue.toLowerCase(); //
            this.dataSourcePotensi.filter = filterValue;
          }
        }


          export interface program_lkp {
              nama_program : string,
              keterangan : string,
        }
