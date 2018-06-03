import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher} from '@angular/material/core';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar,MatCardModule,MatSidenavModule,MatCheckboxModule,MatExpansionModule,MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PengaturanSaComponent } from './superadmin/pengaturan-sa/pengaturan-sa.component'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    showFiller = false;
    opened : boolean = true;
    state : boolean = true;
    name : string;
    role : string;
    pict : any;
    thot : any;


  constructor(private _auth : RegisterService,
  public snakcBar : MatSnackBar,
  public dialog: MatDialog, public _router : Router,) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);

    this.name = tokenPayload.nama_admin
    this.role = tokenPayload.role

    if(tokenPayload.role != 'Super Admin')
      this.state = false;

    var reader = new FileReader();
    this._auth.getImage({ id_akun : tokenPayload.id_akun })
      .subscribe((data:any)=>{
        try{
            const imageUrl = URL.createObjectURL(data);
             const img = document.querySelector('#demo');
             img.addEventListener('load', () => URL.revokeObjectURL(imageUrl));
             let dispose = (<HTMLElement>document.querySelector('#demo')).style.backgroundImage  = "url('" + imageUrl +"')";
        } catch (err) {
          err =>  this.snakcBar.open("Oops! There's a problem!", 'close', { duration : 1000 })
        }

      }), err =>  this.snakcBar.open("Oops! There's a problem!", 'close', { duration : 1000 })
  }


  //
  // pengaturan(){
  //   const token = localStorage.getItem('token');
  //   const tokenPayload = decode(token);
  //
  //
  //
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.data = {
  //         id_akun : tokenPayload.id_akun,
  //         description : "Pengaturan Akun"
  //   };
  //
  //   const dialogRef = this.dialog.open(PengaturanSaComponent, dialogConfig);
  //     dialogRef.afterClosed().subscribe(
  //     data =>
  //       {
  //             if(data == undefined){
  //                 this.snakcBar.open("You cancel the Pengaturan Form.", 'close', { duration : 1000 })
  //             } else {
  //               data.id_akun = tokenPayload.id_akun,
  //               data.status_akun = tokenPayload.role
  //               this._auth.editPost(data)
  //               .subscribe({
  //                   error : err =>  {
  //                     if(err instanceof HttpErrorResponse){
  //                       if(err.status === 401)
  //                         this._router.navigate(['/super-admin/beranda'])
  //                     }
  //                     this.snakcBar.open("Data Changed!", 'close', { duration : 1000 })} })
  //             }
  //       }
  //   );
  // }



}
