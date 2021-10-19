/*import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalAdminComponent } from './admin/personal-admin.component';
import { PersonalFormComponent } from './form/personal-form.component';
import { PersonalhorasAdminComponent } from './horasadmin/personalhoras-admin.component';
import { PersonalhorasFormComponent } from './horasform/personalhoras-form.component';
import { PersonalIniService } from './services/personal.ini.service';
import { PersonalhorasAdminIniService } from './services/personalhorasadmin.ini.service';

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
          title: 'Personas'
        },
        resolve: {
          userdata: PersonalIniService,
          userdataHoras: PersonalhorasAdminIniService,
        }
      },
      {
        path: 'form',
        component: PersonalFormComponent,
        data: {
          title: 'Personas'
        }
      },
      {
        path: 'horas',
        component: PersonalhorasAdminComponent,
        data: {
          title: 'Horas asignadas'
        },
      },
      {
        path: 'horasform',
        component: PersonalhorasFormComponent,
        data: {
          title: 'Horas asignadas'
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
*/
