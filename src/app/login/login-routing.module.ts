import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { LoginRecoverComponent } from './login-recover.component';
import { LoginNewPassComponent } from './login-newpass.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
      title: 'Inicio'
    }
  },
  {
    path: 'recuperar',
    component: LoginRecoverComponent,
    data: {
      title: 'Recuperar contraseña'
    }
  },
  {
    path: 'nuevacontraseña',
    component: LoginNewPassComponent,
    data: {
      title: 'Generar contraseña'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
