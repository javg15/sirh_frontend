import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportesAdminComponent } from './admin/reportes-admin.component';
import { RPlantillasFormComponent } from './plantillas/rplantillas-form.component';
import { ReportesIniService } from './services/reportes.ini.service';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Reportes'
    },
    children: [
      {
        path: '',
        redirectTo: 'admin'
      },
      {
        path: 'admin',
        component: ReportesAdminComponent,
        data: {
          title: 'Listado'
        },
        resolve: {

        }
      },
      {
        path: 'form',
        component: RPlantillasFormComponent,
        data: {
          title: 'Reportes'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule {}
