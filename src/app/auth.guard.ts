import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterService } from './services/register.service'

@Injectable()

export class AuthGuard implements CanActivate {

  constructor(private _Auth : RegisterService, private _router : Router){ }

  canActivate() : boolean{
    if(this._Auth.LoggedIn())
      return true
    else{
      this._router.navigate(['/login'])
      return false;
    }

  }

}
