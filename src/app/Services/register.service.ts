import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  // registerAdmin(register : Register){
  //   const body: Register = {
  //         id_dinas: register.id_dinas,
  //         username: register.username,
  //         nama_admin: register.nama_admin,
  //         password: register.password,
  //         status_akun: register.status_akun
  //   }
  //   return this.http.post(this.rootUrl + '/api/register/add', body);
  // } *

  getImage(data){
    return this.http.post(this.rootUrl + '/getProfUri', data, {
      responseType : 'blob',
      headers: new HttpHeaders().append('Content-Type','application/json')
    })
  }

  createNewUser(data){
    return this.http.post(this.rootUrl + '/superadmin/addUser', data);
  }

    addDinas(data){
      return this.http.post(this.rootUrl + '/superadmin/addDinas', data)
    }

  loginAdmin(login : Login){
      const body: Login = {
            username: login.username,
            password: login.password
      }
      return this.http.post(this.rootUrl + '/login', body);
    }

    GET_PROFIL_DINAS(data){
      return this.http.post(this.rootUrl + '/admin/profil_dinas',data)
    }

    getAllUser(){
      return this.http.get(this.rootUrl + '/superadmin/secureAPI/alluser')
    }

    getAllDinas(){
      return this.http.get(this.rootUrl + '/superadmin/secureAPI/allDinas')
    }

    ADD_LEMBAGA(data){
      return this.http.post(this.rootUrl + '/admin/lembaga/add', data)
    }

    GET_PROGRAM_LKP(){
      return this.http.get(this.rootUrl + '/admin/program_lkp')
    }

    GET_POTENSI(){
      return this.http.get(this.rootUrl + '/superadmin/potensi')
    }

    ADD_POTENSI(data) {
      return this.http.post(this.rootUrl + '/admin/potensi/add',data)
    }

    GET_POTENSI_SPESIFIK(data){
      return this.http.post(this.rootUrl + '/admin/potensi',data)
    }

    GET_PEGAWAI(){
      return this.http.get(this.rootUrl + '/superadmin/pegawai')
    }

    GET_PENILIK(){
      return this.http.get(this.rootUrl + '/superadmin/penilik')
    }

    GET_PEGAWAI_ADMIN(data){
      return this.http.post(this.rootUrl + '/admin/pegawai', data)
    }

    GET_PENILIK_ADMIN(data){
      return this.http.post(this.rootUrl + '/admin/penilik', data)
    }

    GET_PAUD_DETIL(data){
      return this.http.post(this.rootUrl + '/admin/paud/detil', data)
    }

    GET_PAUD_DETIL_PESERTA_DIDIK(data){
      return this.http.post(this.rootUrl + '/admin/paud/detil/pesertadidik',data)
    }

    GET_PAUD_DETIL_KEPENDIDIKAN(data){
      return this.http.post(this.rootUrl + '/admin/paud/detil/kependidikan',data)
    }

    GET_PAUD_DETIL_PENDIDIK(data){
      return this.http.post(this.rootUrl + '/admin/paud/detil/pendidik',data)
    }

    GET_PENDIDIK(){
      return this.http.get(this.rootUrl + '/superadmin/pendidik')
    }

    GET_KEPENDIDIKAN(){
      return this.http.get(this.rootUrl + '/superadmin/kependidikan')
    }

    GET_PESERTADIDIK(){
      return this.http.get(this.rootUrl + '/superadmin/pesertadidik')
    }

    GET_PAUD(){
      return this.http.get(this.rootUrl + '/superadmin/paud')
    }

    GET_PAUD_SPESIFIK(data){
      return this.http.post(this.rootUrl + '/admin/paud',data)
    }

    GET_LKP_SPESIFIK(data){
      return this.http.post(this.rootUrl + '/admin/lkp',data)
    }

    GET_PKBM_SPESIFIK(data){
      return this.http.post(this.rootUrl + '/admin/pkbm',data)
    }

    GET_PAUD_TABLE(data){
      return this.http.post(this.rootUrl + '/superadmin/paud/detil/table',data)
    }

    GET_LKP_TABLE(data){
      return this.http.post(this.rootUrl + '/superadmin/lkp/detil/table',data)
    }

    GET_PKBM_TABLE(data){
      return this.http.post(this.rootUrl + '/superadmin/pkbm/detil/table',data)
    }

    GET_LKP(){
      return this.http.get(this.rootUrl + '/superadmin/lkp')
    }

    GET_PKBM(){
      return this.http.get(this.rootUrl + '/superadmin/pkbm')
    }

    ADD_PROGRAM_LKP(data){
    return this.http.post(this.rootUrl + '/admin/lkp/program/add',data)
    }

    EDIT_PROGRAM_LKP(data){
    return this.http.post(this.rootUrl + '/admin/lkp/program/edit',data)
    }

    EDIT_LEMBAGA(data){
      return this.http.post(this.rootUrl + '/admin/lembaga/edit',data)
    }

    DELETE_PROGRAM_LKP(data){
      return this.http.post(this.rootUrl + '/admin/lkp/program/delete',data)
    }

    DELETE_LEMBAGA(data){
      return this.http.post(this.rootUrl + '/admin/lembaga/delete',data)
    }

    GET_PROFIL_DETIL(data){
      return this.http.post(this.rootUrl + '/superadmin/detil/profil',data)
    }

    ADD_PEGAWAI(data){
      return this.http.post(this.rootUrl + '/admin/pegawai/add', data)
    }

    EDIT_PEGAWAI_DETIL(data){
      return this.http.post(this.rootUrl + '/admin/pegawai/edit', data)
    }

    DELETE_PEGAWAI_DETIL(data){
      return this.http.post(this.rootUrl + '/admin/pegawai/delete', data)
    }

    EDIT_POTENSI_DETIL(data){
      return this.http.post(this.rootUrl + '/admin/potensi/edit',data)
    }

    DELETE_POTENSI_DETIL(data){
      return this.http.post(this.rootUrl + '/admin/potensi/delete',data)
    }

    ADD_PENDIDIK(data){
      return this.http.post(this.rootUrl + '/admin/pendidik/add',data)
    }

    ADD_KEPENDIDIKAN(data){
      return this.http.post(this.rootUrl + '/admin/kependidikan/add',data)
    }

    ADD_PESERTADIDIK(data){
      return this.http.post(this.rootUrl + '/admin/pesertadidik/add',data)
    }

    EDIT_PENDIDIK(data){
      return this.http.post(this.rootUrl + '/admin/pendidik/edit',data)
    }

    EDIT_KEPENDIDIKAN(data){
      return this.http.post(this.rootUrl + '/admin/kependidikan/edit',data)
    }

    EDIT_PESERTADIDIK(data){
      return this.http.post(this.rootUrl + '/admin/pesertadidik/edit',data)
    }

    DELETE_PENDIDIK(data){
      return this.http.post(this.rootUrl + '/admin/pendidik/delete',data)
    }

    DELETE_KEPENDIDIKAN(data){
      return this.http.post(this.rootUrl + '/admin/kependidikan/delete',data)
    }

    DELETE_PESERTADIDIK(data){
      return this.http.post(this.rootUrl + '/admin/pesertadidik/delete',data)
    }

    getPenilikPamongDetil(data){
      return this.http.post(this.rootUrl + '/superadmin/detil/penilik',data)
    }

    getPegawaiDetil(data){
      return this.http.post(this.rootUrl + '/superadmin/detil/pegawai',data)
    }

    getPotensiDetil(data){
      return this.http.post(this.rootUrl + '/superadmin/detil/potensi',data)
    }

    dinas(){
      return this.http.get(this.rootUrl + `/admin/dinas`)
    }

    SPECIFIC_DINAS(data){
      return this.http.post(this.rootUrl + '/admin/dinas/spesifik',data)
    }

    lembaga(){
      return this.http.get(this.rootUrl + '/admin/lembaga')
    }

    GET_LEMBAGA_SPESIFIK(data){
      return this.http.post(this.rootUrl + '/admin/lembaga/spesifik',data)
    }

    GET_LEMBAGA_SPESIFIK_ID_LEMBAGA(data){
      return this.http.post(this.rootUrl + '/admin/lembaga/spesifik',data)
    }

    editPost(data){
      return this.http.post(this.rootUrl + '/admin/updateUser', data)
    }

    PENGATURAN_USER(data){
      return this.http.post(this.rootUrl + '/admin/pengaturan/user', data)
    }

    editDinas(data){
        return this.http.post(this.rootUrl + '/admin/updatedinas', data)
    }

    deleteUser(body){
      return this.http.post(this.rootUrl + '/superadmin/deleteUser', body);
    }

    deleteDinas(body){
      return this.http.post(this.rootUrl + '/superadmin/deletedinas', body);
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

    GET_PENDIDIK_SPESIFIK(data){
      return this.http.post(this.rootUrl + '/admin/pendidik',data)
    }

    GET_KEPENDIDIKAN_SPESIFIK(data){
      return this.http.post(this.rootUrl + '/admin/kependidikan',data)
    }

    GET_PESERTADIDIK_SPESIFIK(data){
      return this.http.post(this.rootUrl + '/admin/pesertadidik',data)
    }

    GET_VERIFIKASI_LEMBAGA(data){
      return this.http.post(this.rootUrl + '/admin/lembaga/verifikasi', data)
    }

    /*

      Add Error Handling :
      1. Existing Username
      2. Jwt Token false
      3. Encrypted Password with Byscript (Hashing)
      4. Preloading, Caching and LazyLoading

    */

}
