import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher} from '@angular/material/core';
import { MatSnackBar } from '@angular/material';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { Login } from '../../models/login.model';
import decode from 'jwt-decode';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login;

  constructor(public _router: Router, public snakcBar : MatSnackBar, private httpClient:HttpClient, private registerService : RegisterService) { }

    passwordFormControl = new FormControl('',Validators.required);
    usernameFormControl =  new FormControl('',Validators.required);
    matcher = new MyErrorStateMatcher();

    OnSubmit(form : NgForm){

      if(form.valid){
        this.registerService.loginAdmin(form.value)
        .subscribe((data:any)=>{

          try {  this.snakcBar.open("Login Success!", 'close', { duration : 1000 });
                  localStorage.setItem('token', data.token);
                  const tokenPayload = decode(data.token);

                  if(tokenPayload.role == 'Super Admin')
                        this._router.navigate(['/beranda-sa'])
                  else
                        this._router.navigate(['/beranda'])
                  }
          catch (err) {
                  this.snakcBar.open('' + err, 'close', { duration : 1000 })
              }

        }, err =>  this.snakcBar.open("Oops! There's a problem!", 'close', { duration : 1000 }))
      }else
        this.snakcBar.open("Oops! You need to feel the required field!", 'close', { duration : 1000 })
    }

  ngOnInit() {
  }

}
