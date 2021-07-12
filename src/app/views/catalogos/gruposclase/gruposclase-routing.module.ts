import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GruposclaseAdminComponent } from './admin/gruposclase-admin.component';
import { GruposclaseFormComponent } from './form/gruposclase-form.component';
import { GruposclaseIniService } from './services/gruposclase.ini.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Gruposclase'
    },
    children: [
      {
        path: '',
        redirectTo: 'admin'
      },
      {
        path: 'admin',
        component: GruposclaseAdminComponent,
        data: {
          title: 'Estatus de plaza'
        },
        resolve: {
          userdata: GruposclaseIniService
        }
      },
      {
        path: 'form',
        component: GruposclaseFormComponent,
        data: {
          title: 'Gruposclase'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GruposclaseRoutingModule {}
