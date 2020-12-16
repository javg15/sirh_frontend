import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatcentrostrabajoAdminComponent } from './admin/catcentrostrabajo-admin.component';
import { CatcentrostrabajoFormComponent } from './form/catcentrostrabajo-form.component';
import { CatcentrostrabajoIniService } from './services/catcentrostrabajo.ini.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Catcentrostrabajo'
    },
    children: [
      {
        path: '',
        redirectTo: 'admin'
      },
      {
        path: 'admin',
        component: CatcentrostrabajoAdminComponent,
        data: {
          title: 'Catcentrostrabajo'
        },
        resolve: {
          userdata: CatcentrostrabajoIniService
        }
      },
      {
        path: 'form',
        component: CatcentrostrabajoFormComponent,
        data: {
          title: 'Catcentrostrabajo'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatcentrostrabajoRoutingModule {}
