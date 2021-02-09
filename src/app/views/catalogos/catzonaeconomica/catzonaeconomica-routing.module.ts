import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatzonaeconomicaAdminComponent } from './admin/catzonaeconomica-admin.component';
import { CatzonaeconomicaFormComponent } from './form/catzonaeconomica-form.component';
import { CatzonaeconomicaIniService } from './services/catzonaeconomica.ini.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Catzonaeconomica'
    },
    children: [
      {
        path: '',
        redirectTo: 'admin'
      },
      {
        path: 'admin',
        component: CatzonaeconomicaAdminComponent,
        data: {
          title: 'Zona económica'
        },
        resolve: {
          userdata: CatzonaeconomicaIniService
        }
      },
      {
        path: 'form',
        component: CatzonaeconomicaFormComponent,
        data: {
          title: 'Catzonaeconomica'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatzonaeconomicaRoutingModule {}
