import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalAdminComponent } from './admin/personal-admin.component';
import { PersonalFormComponent } from './form/personal-form.component';
import { PersonalexpedienteFormComponent } from './formexpediente/personalexpediente-form.component';
import { PersonalIniService } from './services/personal.ini.service';
import { PersonalexpedienteFormIniService } from './services/personalexpedienteform.ini.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Personas'
    },
    children: [
      {
        path: '',
        redirectTo: 'admin'
      },
      {
        path: 'admin',
        component: PersonalAdminComponent,
        data: {
          title: 'Listado'
        },
        resolve: {
          userdata: PersonalIniService,
          userdataExpediente:PersonalexpedienteFormIniService,
        }
      },
      {
        path: 'form',
        component: PersonalFormComponent,
        data: {
          title: 'Personas'
        },
        resolve: {

        }
      },
      {
        path: 'formexpediente',
        component: PersonalexpedienteFormComponent,
        data: {
          title: 'Personas'
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }

