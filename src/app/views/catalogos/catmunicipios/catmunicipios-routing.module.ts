import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatmunicipiosAdminComponent } from './admin/catmunicipios-admin.component';
import { CatmunicipiosFormComponent } from './form/catmunicipios-form.component';
import { CatmunicipiosIniService } from './services/catmunicipios.ini.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Catmunicipios'
    },
    children: [
      {
        path: '',
        redirectTo: 'admin'
      },
      {
        path: 'admin',
        component: CatmunicipiosAdminComponent,
        data: {
          title: 'Catmunicipios'
        },
        resolve: {
          userdata: CatmunicipiosIniService
        }
      },
      {
        path: 'form',
        component: CatmunicipiosFormComponent,
        data: {
          title: 'Catmunicipios'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatmunicipiosRoutingModule {}
