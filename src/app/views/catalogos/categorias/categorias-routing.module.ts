import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriasAdminComponent } from './admin/categorias-admin.component';
import { CategoriasFormComponent } from './form/categorias-form.component';
import { CategoriasdetalleFormComponent } from './formdetalle/categoriasdetalle-form.component';
import { CategoriaspercepcionesFormComponent } from './formpercepciones/categoriaspercepciones-form.component';

import { CategoriasIniService } from './services/categorias.ini.service';
import { CategoriasdetalleIniService } from './services/categoriasdetalle.ini.service';
import { CategoriaspercepcionesIniService } from './services/categoriaspercepciones.ini.service';


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
          title: 'Categorías'
        },
        resolve: {
          userdata: CategoriasIniService,
          userdataDetalle: CategoriasdetalleIniService,
          userdataPercepciones: CategoriaspercepcionesIniService,
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
        component: CategoriaspercepcionesFormComponent,
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
