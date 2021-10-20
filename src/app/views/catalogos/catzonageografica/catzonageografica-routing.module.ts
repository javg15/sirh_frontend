import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatzonageograficaAdminComponent } from './admin/catzonageografica-admin.component';
import { CatzonageograficaFormComponent } from './form/catzonageografica-form.component';
import { CatzonageograficaIniService } from './services/catzonageografica.ini.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Zonas geográficas'
    },
    children: [
      {
        path: '',
        redirectTo: 'admin'
      },
      {
        path: 'admin',
        component: CatzonageograficaAdminComponent,
        data: {
          title: 'Listado'
        },
        resolve: {
          userdata: CatzonageograficaIniService
        }
      },
      {
        path: 'form',
        component: CatzonageograficaFormComponent,
        data: {
          title: 'Catzonageografica'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatzonageograficaRoutingModule {}
