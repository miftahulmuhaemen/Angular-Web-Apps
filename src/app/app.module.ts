import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './views/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material.module';

//Services
import { ExcelServiceService } from './services/excel-service.service';
import { RegisterService } from './services/register.service';
import { AuthGuard } from './auth.guard'
import { TokenInterceptorService } from './services/token-interceptor.service'
import { RoleGuardServiceService } from './services/role-guard-service.service'

//Components
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { BerandaComponent } from './views/dashboard/admin/beranda/beranda.component';
import { ProfilDinasComponent } from './views/dashboard/admin/profil-dinas/profil-dinas.component';
import { PegawaiDinasComponent } from './views/dashboard/admin/pegawai-dinas/pegawai-dinas.component';
import { PotensiDaerahComponent } from './views/dashboard/admin/potensi-daerah/potensi-daerah.component';
import { LembagaPaudComponent } from './views/dashboard/admin/lembaga-paud/lembaga-paud.component';
import { LembagaLkpComponent } from './views/dashboard/admin/lembaga-lkp/lembaga-lkp.component';
import { LembagaPkbmComponent } from './views/dashboard/admin/lembaga-pkbm/lembaga-pkbm.component';
import { PendidikComponent } from './views/dashboard/admin/pendidik/pendidik.component';
import { KependidikanComponent } from './views/dashboard/admin/kependidikan/kependidikan.component';
import { PesertaDidikComponent } from './views/dashboard/admin/peserta-didik/peserta-didik.component';
import { PeraturanComponent } from './views/dashboard/admin/peraturan/peraturan.component';
import { EditProfilDinasComponent } from './views/dashboard/admin/profil-dinas/edit-profil-dinas/edit-profil-dinas.component';
import { KonfirmasiComponent } from './views/konfirmasi/konfirmasi.component';
import { ManajemenAkunComponent } from './views/dashboard/superadmin/manajemen-akun/manajemen-akun.component';
import { EditManajemenAkunComponent } from './views/dashboard/superadmin/manajemen-akun/edit-manajemen-akun/edit-manajemen-akun.component';
import { DataDinasComponent } from './views/dashboard/superadmin/data-dinas/data-dinas.component';
import { BerandaSaComponent } from './views/dashboard/superadmin/beranda-sa/beranda-sa.component';
import { PegawaiDinasSaComponent } from './views/dashboard/superadmin/pegawai-dinas-sa/pegawai-dinas-sa.component';
import { PotensiDaerahSaComponent } from './views/dashboard/superadmin/potensi-daerah-sa/potensi-daerah-sa.component';
import { LembagaPaudSaComponent } from './views/dashboard/superadmin/lembaga-paud-sa/lembaga-paud-sa.component';
import { LembagaLkpSaComponent } from './views/dashboard/superadmin/lembaga-lkp-sa/lembaga-lkp-sa.component';
import { LembagaPkbmSaComponent } from './views/dashboard/superadmin/lembaga-pkbm-sa/lembaga-pkbm-sa.component';
import { PendidikSaComponent } from './views/dashboard/superadmin/pendidik-sa/pendidik-sa.component';
import { KependidikanSaComponent } from './views/dashboard/superadmin/kependidikan-sa/kependidikan-sa.component';
import { PesertaDidikSaComponent } from './views/dashboard/superadmin/peserta-didik-sa/peserta-didik-sa.component';
import { PengaturanSaComponent } from './views/dashboard/superadmin/pengaturan-sa/pengaturan-sa.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    BerandaComponent,
    ProfilDinasComponent,
    PegawaiDinasComponent,
    PotensiDaerahComponent,
    LembagaPaudComponent,
    LembagaLkpComponent,
    LembagaPkbmComponent,
    PendidikComponent,
    KependidikanComponent,
    PesertaDidikComponent,
    PeraturanComponent,
    EditProfilDinasComponent,
    KonfirmasiComponent,
    ManajemenAkunComponent,
    EditManajemenAkunComponent,
    DataDinasComponent,
    BerandaSaComponent,
    PegawaiDinasSaComponent,
    PotensiDaerahSaComponent,
    LembagaPaudSaComponent,
    LembagaLkpSaComponent,
    LembagaPkbmSaComponent,
    PendidikSaComponent,
    KependidikanSaComponent,
    PesertaDidikSaComponent,
    PengaturanSaComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MaterialModule
  ],
  providers: [RegisterService, ExcelServiceService, RoleGuardServiceService, AuthGuard, {
    provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptorService,
    multi : true
  }],
  bootstrap: [AppComponent],
  entryComponents: [EditProfilDinasComponent,KonfirmasiComponent,EditManajemenAkunComponent]
})
export class AppModule { }
