import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router'
import { RegisterService } from './register.service'
import decode from 'jwt-decode';

@Injectable()
export class RoleGuardServiceService implements CanActivate {

  constructor(public auth : RegisterService, public router: Router) { }

  canActivate(route : ActivatedRouteSnapshot) : boolean {

    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');

    const tokenPayload = decode(token);

    if(!this.auth.LoggedIn() || tokenPayload.role !== expectedRole){
      this.router.navigate(['/login'])
      return false
    }

    return true;
  }

}
