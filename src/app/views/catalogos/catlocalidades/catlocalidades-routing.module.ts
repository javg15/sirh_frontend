import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatlocalidadesAdminComponent } from './admin/catlocalidades-admin.component';
import { CatlocalidadesFormComponent } from './form/catlocalidades-form.component';
import { CatlocalidadesIniService } from './services/catlocalidades.ini.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Catlocalidades'
    },
    children: [
      {
        path: '',
        redirectTo: 'admin'
      },
      {
        path: 'admin',
        component: CatlocalidadesAdminComponent,
        data: {
          title: 'Localidades'
        },
        resolve: {
          userdata: CatlocalidadesIniService
        }
      },
      {
        path: 'form',
        component: CatlocalidadesFormComponent,
        data: {
          title: 'Catlocalidades'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatlocalidadesRoutingModule {}
