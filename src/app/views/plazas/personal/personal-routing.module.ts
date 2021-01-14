import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalAdminComponent } from './admin/personal-admin.component';
import { PersonalFormComponent } from './form/personal-form.component';
import { PersonalIniService } from './services/personal.ini.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Personal'
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
          title: 'Personal'
        },
        resolve: {
          userdata: PersonalIniService
        }
      },
      {
        path: 'form',
        component: PersonalFormComponent,
        data: {
          title: 'Personal'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule {}
