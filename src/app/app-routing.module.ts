import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard'
import { RoleGuardServiceService as RoleGuard } from './services/role-guard-service.service'

//Components
import { RegisterComponent } from './views/register/register.component';
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

const routes: Routes = [
  {
  path : 'login',
  component : LoginComponent
  },
  {
    path : '', redirectTo:'/login', pathMatch : 'full'
  },
  {
    path : 'beranda', component : DashboardComponent,
    children : [{ path : '', component: BerandaComponent }],
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole : 'Admin'
    }
  },
  {
    path : 'profil-dinas', component : DashboardComponent,
    children : [{ path : '', component: ProfilDinasComponent}],
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole : 'Admin'
    }
  },
  {
    path : 'pegawai-dinas', component : DashboardComponent,
    children : [{ path : '', component: PegawaiDinasComponent }],
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole : 'Admin'
    }
  },
  {
    path : 'potensi-daerah', component : DashboardComponent,
    children : [{ path : '', component: PotensiDaerahComponent}],
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole : 'Admin'
    }
  },
  {
    path : 'lembaga-paud', component : DashboardComponent,
    children : [{ path : '', component: LembagaPaudComponent}],
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole : 'Admin'
    }
  },
  {
    path : 'lembaga-lkp', component : DashboardComponent,
    children : [{ path : '', component: LembagaLkpComponent}],
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole : 'Admin'
    }
  },
  {
    path : 'lembaga-pkbm', component : DashboardComponent,
    children : [{ path : '', component: LembagaPkbmComponent}],
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole : 'Admin'
    }
  },
  {
    path : 'pendidik', component : DashboardComponent,
    children : [{ path : '', component: PendidikComponent}],
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole : 'Admin'
    }
  },
  {
    path : 'kependidikan', component : DashboardComponent,
    children : [{ path : '', component: KependidikanComponent}],
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole : 'Admin'
    }
  },
  {
    path : 'peraturan', component : DashboardComponent,
    children : [{ path : '', component: PeraturanComponent}],
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole : 'Admin'
    }
  },
  {
    path : 'peserta-didik', component : DashboardComponent,
    children : [{ path : '', component: PesertaDidikComponent}],
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole : 'Admin'
    }
  },













  
  /* Super Admin Only Access */

  {
    path : 'beranda-sa', component : DashboardComponent,
    children : [{ path : '', component: BerandaSaComponent}],
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole : 'Super Admin'
    }
  },
  {
    path : 'manajemen-akun', component : DashboardComponent,
    children : [{ path : '', component: ManajemenAkunComponent}],
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole : 'Super Admin'
    }
  },
  {
    path : 'data-dinas', component : DashboardComponent,
    children : [{ path : '', component: DataDinasComponent}],
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole : 'Super Admin'
    }
  },
  {
    path : 'pegawai-dinas-sa', component : DashboardComponent,
    children : [{ path : '', component: PegawaiDinasSaComponent}],
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole : 'Super Admin'
    }
  },
  {
    path : 'potensi-daerah-sa', component : DashboardComponent,
    children : [{ path : '', component: PotensiDaerahSaComponent}],
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole : 'Super Admin'
    }
  },
  {
    path : 'lembaga-paud-sa', component : DashboardComponent,
    children : [{ path : '', component: LembagaPaudSaComponent}],
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole : 'Super Admin'
    }
  },
  {
    path : 'lembaga-lkp-sa', component : DashboardComponent,
    children : [{ path : '', component: LembagaLkpComponent}],
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole : 'Super Admin'
    }
  },
  {
    path : 'lembaga-pkbm-sa', component : DashboardComponent,
    children : [{ path : '', component: LembagaPkbmSaComponent}],
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole : 'Super Admin'
    }
  },
  {
    path : 'pendidik-sa', component : DashboardComponent,
    children : [{ path : '', component: PendidikSaComponent}],
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole : 'Super Admin'
    }
  },
  {
    path : 'kependidikan-sa', component : DashboardComponent,
    children : [{ path : '', component: KependidikanSaComponent}],
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole : 'Super Admin'
    }
  },
  {
    path : 'peserta-didik-sa', component : DashboardComponent,
    children : [{ path : '', component: PesertaDidikSaComponent}],
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole : 'Super Admin'
    }
  },
  {
    path : 'pengaturan-sa', component : DashboardComponent,
    children : [{ path : '', component: PengaturanSaComponent}],
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole : 'Super Admin'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
