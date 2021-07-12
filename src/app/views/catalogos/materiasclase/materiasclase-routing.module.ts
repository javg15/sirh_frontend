import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MateriasclaseAdminComponent } from './admin/materiasclase-admin.component';
import { MateriasclaseFormComponent } from './form/materiasclase-form.component';
import { MateriasclaseIniService } from './services/materiasclase.ini.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Materiasclase'
    },
    children: [
      {
        path: '',
        redirectTo: 'admin'
      },
      {
        path: 'admin',
        component: MateriasclaseAdminComponent,
        data: {
          title: 'Estatus de plaza'
        },
        resolve: {
          userdata: MateriasclaseIniService
        }
      },
      {
        path: 'form',
        component: MateriasclaseFormComponent,
        data: {
          title: 'Materiasclase'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MateriasclaseRoutingModule {}
