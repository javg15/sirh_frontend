import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriasAdminComponent } from './admin/categorias-admin.component';
import { CategoriasFormComponent } from './form/categorias-form.component';
import { CategoriasdetalleFormComponent } from './formdetalle/categoriasdetalle-form.component';
import { CatpercepcionescategoriasFormComponent } from './formpercepciones/catpercepcionescategorias-form.component';

import { CategoriasIniService } from './services/categorias.ini.service';
import { CategoriasdetalleIniService } from './services/categoriasdetalle.ini.service';
import { CatpercepcionescategoriasIniService } from './services/catpercepcionescategorias.ini.service';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Categorías'
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
          title: 'Listado'
        },
        resolve: {
          userdata: CategoriasIniService,
          userdataDetalle: CategoriasdetalleIniService,
          userdataPercepciones: CatpercepcionescategoriasIniService,
        }
      },
      {
        path: 'form',
        component: CategoriasFormComponent,
        data: {
          title: 'Categorías'
        },
      },
      {
        path: 'formdetalle',
        component: CategoriasdetalleFormComponent,
        data: {
          title: 'Categorias detalle'
        }
      },
      {
        path: 'formpercepciones',
        component: CatpercepcionescategoriasFormComponent,
        data: {
          title: 'Categorias percepciones'
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
