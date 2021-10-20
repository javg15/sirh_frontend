import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SemestreAdminComponent } from './admin/semestre-admin.component';
import { SemestreFormComponent } from './form/semestre-form.component';
import { SemestreIniService } from './services/semestre.ini.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Semestres'
    },
    children: [
      {
        path: '',
        redirectTo: 'admin'
      },
      {
        path: 'admin',
        component: SemestreAdminComponent,
        data: {
          title: 'Listado'
        },
        resolve: {
          userdata: SemestreIniService
        }
      },
      {
        path: 'form',
        component: SemestreFormComponent,
        data: {
          title: 'Semestre'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SemestreRoutingModule {}
