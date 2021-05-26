import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlantillasAdminComponent } from './admin/plantillas-admin.component';
import { PlantillasFormComponent } from './form/plantillas-form.component';
import { PlantillasDocsAdminComponent } from './docs/plantillasdocs-admin.component';
import { PlantillasDocsFormComponent } from './docssub/plantillasdocs-form.component';
import { PlantillasDocsProfesionalFormComponent } from './docssub/plantillasdocsprofesional-form.component';
import { PlantillasDocsNombramientoFormComponent } from './docssub/plantillasdocsnombramiento-form.component';
import { PlantillasDocsBajaFormComponent } from './docssub/plantillasdocsbaja-form.component';
import { PlantillasDocsFamiliaresFormComponent } from './docssub/plantillasdocsfamiliares-form.component';
import { PlantillasIniService } from './services/plantillas.ini.service';
import { PlantillasdocsIniService } from './services/plantillasdocs.ini.service';

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
          userdataDocs: PlantillasdocsIniService,
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
        path: 'docs',
        component: PlantillasDocsAdminComponent,
        data: {
          title: 'Plantillas'
        },
      },
      {
        path: 'docsform',
        component: PlantillasDocsFormComponent,
        data: {
          title: 'Plantillas'
        },
      },
      {
        path: 'docsprofesional',
        component: PlantillasDocsProfesionalFormComponent,
        data: {
          title: 'Datos Profesionales'
        },
      },
      {
        path: 'docsnombramiento',
        component: PlantillasDocsNombramientoFormComponent,
        data: {
          title: 'Nombramiento Administrativo'
        },
      },
      {
        path: 'docsbaja',
        component: PlantillasDocsBajaFormComponent,
        data: {
          title: 'Baja Administrativo'
        },
      },
      {
        path: 'docsfamiliares',
        component: PlantillasDocsFamiliaresFormComponent,
        data: {
          title: 'Familiares'
        },
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantillasRoutingModule {}
