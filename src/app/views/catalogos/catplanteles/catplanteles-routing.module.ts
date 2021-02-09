import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatplantelesAdminComponent } from './admin/catplanteles-admin.component';
import { CatplantelesFormComponent } from './form/catplanteles-form.component';
import { CatplantelesIniService } from './services/catplanteles.ini.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Catplanteles'
    },
    children: [
      {
        path: '',
        redirectTo: 'admin'
      },
      {
        path: 'admin',
        component: CatplantelesAdminComponent,
        data: {
          title: 'Planteles'
        },
        resolve: {
          userdata: CatplantelesIniService
        }
      },
      {
        path: 'form',
        component: CatplantelesFormComponent,
        data: {
          title: 'Planteles'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatplantelesRoutingModule {}
