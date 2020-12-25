import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriasAdminComponent } from './admin/categorias-admin.component';
import { CategoriasFormComponent } from './form/categorias-form.component';
import { CategoriasIniService } from './services/categorias.ini.service';

import { CategoriassueldosFormComponent } from './formsub/categoriassueldos-form.component';
import { CategoriassueldosIniService } from './services/categoriassueldos.ini.service';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Categorias'
    },
    children: [
      {
        path: '',
        redirectTo: 'admin'
      },
      {
        path: 'admin',
        component: CategoriasAdminComponent,
        data: {
          title: 'Categorias'
        },
        resolve: {
          userdata: CategoriasIniService,
          userdataSueldos: CategoriassueldosIniService
        }
      },
      {
        path: 'form',
        component: CategoriasFormComponent,
        data: {
          title: 'Categorias'
        },
      },
      {
        path: 'form',
        component: CategoriassueldosFormComponent,
        data: {
          title: 'Categorias sueldos'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule {}
