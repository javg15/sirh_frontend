import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriastabularAdminComponent } from './admin/categoriastabular-admin.component';
import { CategoriastabularFormComponent } from './form/categoriastabular-form.component';
import { CategoriastabularIniService } from './services/categoriastabular.ini.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Estructura ocupacional'
    },
    children: [
      {
        path: '',
        redirectTo: 'admin'
      },
      {
        path: 'admin',
        component: CategoriastabularAdminComponent,
        data: {
          title: 'Listado'
        },
        resolve: {
          userdata: CategoriastabularIniService
        }
      },
      {
        path: 'form',
        component: CategoriastabularFormComponent,
        data: {
          title: 'Centros de trabajo'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriastabularRoutingModule {}
