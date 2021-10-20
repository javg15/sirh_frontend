import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatregionesAdminComponent } from './admin/catregiones-admin.component';
import { CatregionesFormComponent } from './form/catregiones-form.component';
import { CatregionesIniService } from './services/catregiones.ini.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Regiones'
    },
    children: [
      {
        path: '',
        redirectTo: 'admin'
      },
      {
        path: 'admin',
        component: CatregionesAdminComponent,
        data: {
          title: 'Listado'
        },
        resolve: {
          userdata: CatregionesIniService
        }
      },
      {
        path: 'form',
        component: CatregionesFormComponent,
        data: {
          title: 'Catregiones'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatregionesRoutingModule {}
