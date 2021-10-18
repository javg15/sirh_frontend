import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatquincenaAdminComponent } from './admin/catquincena-admin.component';
import { CatquincenaFormComponent } from './form/catquincena-form.component';
import { CatquincenaIniService } from './services/catquincena.ini.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Quincenas'
    },
    children: [
      {
        path: '',
        redirectTo: 'admin'
      },
      {
        path: 'admin',
        component: CatquincenaAdminComponent,
        data: {
          title: 'Listado'
        },
        resolve: {
          userdata: CatquincenaIniService
        }
      },
      {
        path: 'form',
        component: CatquincenaFormComponent,
        data: {
          title: 'Catquincena'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatquincenaRoutingModule {}
