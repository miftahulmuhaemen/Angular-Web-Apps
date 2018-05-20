import { Component, OnInit, ViewChild,Inject, ChangeDetectorRef } from '@angular/core';
import { MaterialModule } from '../../../../material.module';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher} from '@angular/material/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar,MatCardModule,MatSidenavModule,MatCheckboxModule,MatExpansionModule,MatPaginator, MatSort, MatTableDataSource } from '@angular/material';


import { Router } from '@angular/router';
import { CdkTableModule  } from '@angular/cdk/table';

//Services
import { RegisterService } from '../../../../services/register.service';
import { ExcelServiceService } from '../../../../services/excel-service.service'

//Component Modal
import { EditManajemenAkunComponent } from './edit-manajemen-akun/edit-manajemen-akun.component'
import { KonfirmasiComponent } from '../../../konfirmasi/konfirmasi.component'

//Export to PDF Library
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-manajemen-akun',
  templateUrl: './manajemen-akun.component.html',
  styleUrls: ['./manajemen-akun.component.css']
})
export class ManajemenAkunComponent implements OnInit {

  displayedColumns = ['ID','nama_dinas','username','nama_admin','password','status_akun','aksi','null'];
  dataSource: MatTableDataSource<userTable>;
  data_table : userTable[]=[];
  check : boolean = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(public ExcelExport : ExcelServiceService, public snakcBar : MatSnackBar, private httpClient:HttpClient,private changeDetector:ChangeDetectorRef,public dialog: MatDialog, public registerService : RegisterService, private _router : Router) {
      this.get();
    }

    ngOnInit() {
    }

    //RESTapi Create new user
    createNew(){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;

      dialogConfig.data = {
        description : "Tambah Akun"
      }

    const dialogRef = this.dialog.open(EditManajemenAkunComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
        data =>
          {
                if(data == undefined){
                      this.snakcBar.open("You cancel the Register Form.", 'close', { duration : 1000 })
                  } else {

                    if(data.id_dinas == undefined)
                        data.id_dinas = 1;
                    this.registerService.createNewUser(data)
                    .subscribe(

                    (data) =>  { this.snakcBar.open("Data Changed!", 'close', { duration : 1000 }), this.get(), this.ngAfterViewInit()},
                    error => this.snakcBar.open("Oops! Data not Send!", 'close', { duration : 1000 })
                )
              }
          }
      );
    }

    edit(id_akun:number,id_dinas:number,username:string,nama_admin:string,password:string,status_akun:string){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;

      if(status_akun == "Admin")
        this.check = true

      dialogConfig.data = {
        id_akun : id_akun,
        id_dinas : id_dinas,
        username : username,
        nama_admin : nama_admin,
        password : password,
        status_akun : status_akun,
        check : this.check
      };

    const dialogRef = this.dialog.open(EditManajemenAkunComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
        data =>
          {
                if(data == undefined){
                    this.snakcBar.open("You cancel the Edit Form.", 'close', { duration : 1000 })
                } else {
                  this.registerService.editPost(data)
                  .subscribe({
                      error : err =>  { this.snakcBar.open("Data Created!", 'close', { duration : 1000 }), this.get(), this.ngAfterViewInit()} })
                }
          }
      );
    }


    /*Delete Function*/
    delete(index:number){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;

      dialogConfig.data = {
        id_akun : index
      }

    // RESTful API DeleteUser
    const dialogRef = this.dialog.open(KonfirmasiComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
        data =>
          {
                if(data == undefined){
                    this.snakcBar.open("You cancel the Delete.", 'close', { duration : 1000 })
                } else {

                  if(data == true) {
                      this.registerService.deleteUser(dialogConfig.data).subscribe({
                        error : err =>  { this.snakcBar.open("Data Changed!", 'close', { duration : 1000 }), this.get(), this.ngAfterViewInit()}
                      });


                  } else {
                      this.snakcBar.open("You cancel the Delete.", 'close', { duration : 1000 })
                  }
              }
          }
      );
    }

    // RESTful API GetData
    get(){
      this.httpClient.get(`http://localhost:3000/secureAPI/alluser`)
      .subscribe(
          (data:any[]) => {
           this.dataSource.data = data;
      }, error => {
        if(error instanceof HttpErrorResponse){
          if(error.status === 401)
            this._router.navigate(['/login'])
        }
      });

      // Assign the data to the data source for the table to render
     this.dataSource = new MatTableDataSource(this.data_table);
    }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  //Export to Excel
  exporttoExcel(){
      this.ExcelExport.exportAsExcelFile(this.dataSource.data,"ManajemenUser")
  }

  //Export to PDF
  exportAction(){

    var columns = [
      {title: "ID", dataKey : "id_akun"},
      {title: "Nama Dinas", dataKey : "nama_dinas"},
      {title: "Username", dataKey : "username"},
      {title: "Password", dataKey : "password"},
      {title: "Status Akun", dataKey : "status_akun"}
    ];

    var doc = new jsPDF('p','pt');

    //Tittle
    doc.setFontSize(16)
    doc.setFont('helvetica')
    doc.text(40, 50, 'Daftar Pengguna - BP-PAUD & DIKMAS KALSEL')
    doc.autoTable(columns, this.dataSource.data, {
      margin : { top : 70 }
    });
    doc.save('table.pdf')

  }

}


export interface userTable {
  id_akun: number;
  nama_dinas : string;
  username : string;
  nama_admin : string;
  password : string;
  status_akun : string;
}
