import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalAdminComponent } from './personal/admin/personal-admin.component';
import { PersonalFormComponent } from './personal/form/personal-form.component';
import { PersonalhorasAdminComponent } from './personal/horasadmin/personalhoras-admin.component';
import { PersonalhorasFormComponent } from './personal/horasform/personalhoras-form.component';
import { PersonalIniService } from './personal/services/personal.ini.service';
import { PersonalhorasAdminIniService } from './personal/services/personalhorasadmin.ini.service';

import { PlantillasAdminComponent } from './plantillas/admin/plantillas-admin.component';
import { PlantillasFormComponent } from './plantillas/form/plantillas-form.component';
import { PlantillasDocsAdminComponent } from './plantillas/docs/plantillasdocs-admin.component';
import { PlantillasDocsFormComponent } from './plantillas/docssub/plantillasdocs-form.component';
import { PlantillasDocsProfesionalFormComponent } from './plantillas/docssub/plantillasdocsprofesional-form.component';
import { PlantillasDocsNombramientoFormComponent } from './plantillas/docssub/plantillasdocsnombramiento-form.component';
import { PlantillasDocsBajaFormComponent } from './plantillas/docssub/plantillasdocsbaja-form.component';
import { PlantillasDocsFamiliaresFormComponent } from './plantillas/docssub/plantillasdocsfamiliares-form.component';
import { PlantillasIniService } from './plantillas/services/plantillas.ini.service';
import { PlantillasdocsIniService } from './plantillas/services/plantillasdocs.ini.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Personas'
    },
    children: [
      {
        path: 'personal',
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
      {
        path: 'plantillas',
        redirectTo: 'adminplantillas'
      },
      {
        path: 'adminplantillas',
        component: PlantillasAdminComponent,
        data: {
          title: 'Plantillas'
        },
        resolve: {
          userdata: PlantillasIniService,
          userdataDocs: PlantillasdocsIniService,
          userdataHoras: PersonalhorasAdminIniService,
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
export class PlazasStartRoutingModule { }
