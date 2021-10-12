import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalhorasAdminComponent } from './personalhoras/admin/personalhoras-admin.component';
import { HorasasignacionAdminComponent } from './personalhoras/horasadmin/horasasignacion-admin.component';
import { HorasasignacionFormComponent } from './personalhoras/horasform/horasasignacion-form.component';
import { PersonalhorasIniService } from './personalhoras/services/personalhoras.ini.service';
import { HorasasignacionAdminIniService } from './personalhoras/services/horasasignacionadmin.ini.service';
import { HorasasignacionFormIniService } from './personalhoras/services/horasasignacionform.ini.service';

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
import { PlantillasHistorialNominaIniService } from './plantillas/services/plantillashistorialnomina.ini.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Asignación de horas'
    },
    children: [
      {
        path: 'personalhoras',
        redirectTo: 'admin'
      },
      {
        path: 'admin',
        component: PersonalhorasAdminComponent,
        data: {
          title: 'Carga horaria'
        },
        resolve: {
          userdata: PersonalhorasIniService,
          userdataHoras: HorasasignacionAdminIniService,
        }
      },
      {
        path: 'form',
        component: HorasasignacionFormComponent,
        data: {
          title: 'Carga horaria'
        },
        resolve:{
          dataHoraAsignacion:HorasasignacionFormIniService,
        }
      },
      {
        path: 'horas',
        component: HorasasignacionAdminComponent,
        data: {
          title: 'Carga horaria'
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
          userdataHoras: HorasasignacionAdminIniService,
          userdataHistorialNomina:PlantillasHistorialNominaIniService,
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
