import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Register } from '../models/register.model';
import { Login } from '../models/login.model';
import { Router }from '@angular/router'


@Injectable()

export class RegisterService {
  readonly rootUrl = 'http://localhost:3000';
  constructor(private http: HttpClient, private router : Router) { }

  registerAdmin(register : Register){
    const body: Register = {
          id_dinas: register.id_dinas,
          username: register.username,
          nama_admin: register.nama_admin,
          password: register.password,
          status_akun: register.status_akun
    }
    return this.http.post(this.rootUrl + '/api/register/add', body);
  }

  createNewUser(data){
    return this.http.post(this.rootUrl + '/api/register/add', data);
  }


  loginAdmin(login : Login){
      const body: Login = {
            username: login.username,
            password: login.password,
      }
      return this.http.post(this.rootUrl + '/api/login', body);
    }

    dinas(){
      return  this.http.get(`http://localhost:3000/api/register/dinas`)
    }

    editPost(data){
      return this.http.post(this.rootUrl + '/api/editPost',data)
    }

    deleteUser(body){
      return this.http.post(this.rootUrl + '/api/deleteUser', body);
  }

    LoggedIn(){
      return !!localStorage.getItem('token')
    }

    getToken(){
      return localStorage.getItem('token')
    }

    logOut(){
      localStorage.removeItem('token')
      this.router.navigate(['/login'])
    }

    /*

      Add Error Handling :
      1. Existing Username
      2. Jwt Token false
      3. Encrypted Password with Byscript (Hashing)
      4. Preloading, Caching and LazyLoading

    */

}
