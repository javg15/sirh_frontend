import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlazasAdminComponent } from './admin/plazas-admin.component';
import { PlazasFormComponent } from './form/plazas-form.component';
import { PlazasIniService } from './services/plazas.ini.service';
import { PlazasHistorialIniService } from './services/plazashistorial.ini.service';
import { PlazasHistorialNominaIniService } from './services/plazashistorialnomina.ini.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Plazas'
    },
    children: [
      {
        path: '',
        redirectTo: 'admin'
      },
      {
        path: 'admin',
        component: PlazasAdminComponent,
        data: {
          title: 'Plazas'
        },
        resolve: {
          userdata: PlazasIniService,
          userdataHistorial: PlazasHistorialIniService,
          userdataHistorialNomina:PlazasHistorialNominaIniService
        }
      },
      {
        path: 'form',
        component: PlazasFormComponent,
        data: {
          title: 'Plazas'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlazasRoutingModule {}
