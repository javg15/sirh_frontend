import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatestatusplazaAdminComponent } from './admin/catestatusplaza-admin.component';
import { CatestatusplazaFormComponent } from './form/catestatusplaza-form.component';
import { CatestatusplazaIniService } from './services/catestatusplaza.ini.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Estatus de plaza'
    },
    children: [
      {
        path: '',
        redirectTo: 'admin'
      },
      {
        path: 'admin',
        component: CatestatusplazaAdminComponent,
        data: {
          title: 'Listado'
        },
        resolve: {
          userdata: CatestatusplazaIniService
        }
      },
      {
        path: 'form',
        component: CatestatusplazaFormComponent,
        data: {
          title: 'Catestatusplaza'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatestatusplazaRoutingModule {}
