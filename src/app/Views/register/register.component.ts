import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher} from '@angular/material/core';
import { MatSnackBar,MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RegisterService } from '../../services/register.service';
import { Register } from '../../models/register.model';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  ngOnInit(){


  }

  title = 'Register';
  dinas = [];
  user: Register;

  constructor(public snakcBar : MatSnackBar, private httpClient:HttpClient, private registerService : RegisterService){
    this.get();
  }

  passwordFormControl = new FormControl('',Validators.required);
  usernameFormControl =  new FormControl('',Validators.required);
  namaAdminFormControl =  new FormControl('',Validators.required);
  matcher = new MyErrorStateMatcher();

  //get the value of the DINAS
  get(){
    this.registerService.dinas().subscribe(
        (data:any[]) => {
            for(let b of data){
                this.dinas.push(b);
            }
    }, error => console.log('Oops!', error));
  }

  //post
  OnSubmit(form : NgForm){

    if(form.valid){
      this.registerService.registerAdmin(form.value)
      .subscribe((data:any)=>{
            this.snakcBar.open("Account Created!", 'close', { duration : 1000 });
      }, err =>  this.snakcBar.open("Oops! There's a problem!", 'close', { duration : 1000 }))
    }else
      this.snakcBar.open("Oops! You need to feel the required field!", 'close', { duration : 1000 })
  }

}
