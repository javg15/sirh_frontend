import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlantillasAdminComponent } from './admin/plantillas-admin.component';
import { PlantillasFormComponent } from './form/plantillas-form.component';
import { PlantillasIniService } from './services/plantillas.ini.service';

import { PlantillaspersonalFormComponent } from './formsub/plantillaspersonal-form.component';
import { PlantillaspersonalIniService } from './services/plantillaspersonal.ini.service';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Plantillas'
    },
    children: [
      {
        path: '',
        redirectTo: 'admin'
      },
      {
        path: 'admin',
        component: PlantillasAdminComponent,
        data: {
          title: 'Plantillas'
        },
        resolve: {
          userdata: PlantillasIniService,
          userdataPersonal: PlantillaspersonalIniService
        }
      },
      {
        path: 'form',
        component: PlantillasFormComponent,
        data: {
          title: 'Plantillas'
        },
      },
      {
        path: 'form',
        component: PlantillaspersonalFormComponent,
        data: {
          title: 'Plantillas personal'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantillasRoutingModule {}
