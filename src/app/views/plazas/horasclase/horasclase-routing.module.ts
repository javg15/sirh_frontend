import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HorasclaseAdminComponent } from './admin/horasclase-admin.component';
import { HorasclaseFormComponent } from './form/horasclase-form.component';
import { HorasclaseIniService } from './services/horasclase.ini.service';

import { HorasclasedetalleFormComponent } from './formsub/horasclasedetalle-form.component';
import { HorasclasedetalleIniService } from './services/horasclasedetalle.ini.service';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Horasclase'
    },
    children: [
      {
        path: '',
        redirectTo: 'admin'
      },
      {
        path: 'admin',
        component: HorasclaseAdminComponent,
        data: {
          title: 'Categorías'
        },
        resolve: {
          userdata: HorasclaseIniService,
          userdataSueldos: HorasclasedetalleIniService
        }
      },
      {
        path: 'form',
        component: HorasclaseFormComponent,
        data: {
          title: 'Categorías'
        },
      },
      {
        path: 'form',
        component: HorasclasedetalleFormComponent,
        data: {
          title: 'Horasclase sueldos'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorasclaseRoutingModule {}
