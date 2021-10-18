import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalhorasAdminComponent } from './empleados/personalhoras/admin/personalhoras-admin.component';
import { HorasasignacionAdminComponent } from './empleados/personalhoras/horasadmin/horasasignacion-admin.component';
import { HorasasignacionFormComponent } from './empleados/personalhoras/horasform/horasasignacion-form.component';
import { PersonalhorasIniService } from './empleados/personalhoras/services/personalhoras.ini.service';
import { HorasasignacionAdminIniService } from './empleados/personalhoras/services/horasasignacionadmin.ini.service';
import { HorasasignacionFormIniService } from './empleados/personalhoras/services/horasasignacionform.ini.service';

import { PlantillasAdminComponent } from './empleados/plantillas/admin/plantillas-admin.component';
import { PlantillasFormComponent } from './empleados/plantillas/form/plantillas-form.component';
import { PlantillasDocsAdminComponent } from './empleados/plantillas/docs/plantillasdocs-admin.component';
import { PlantillasDocsFormComponent } from './empleados/plantillas/docssub/plantillasdocs-form.component';
import { PlantillasDocsProfesionalFormComponent } from './empleados/plantillas/docssub/plantillasdocsprofesional-form.component';
import { PlantillasDocsNombramientoFormComponent } from './empleados/plantillas/docssub/plantillasdocsnombramiento-form.component';
import { PlantillasDocsBajaFormComponent } from './empleados/plantillas/docssub/plantillasdocsbaja-form.component';
import { PlantillasDocsFamiliaresFormComponent } from './empleados/plantillas/docssub/plantillasdocsfamiliares-form.component';
import { PlantillasIniService } from './empleados/plantillas/services/plantillas.ini.service';
import { PlantillasdocsIniService } from './empleados/plantillas/services/plantillasdocs.ini.service';
import { PlantillasHistorialNominaIniService } from './empleados/plantillas/services/plantillashistorialnomina.ini.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Empleados'
    },
    children: [
      {
        path: 'empleados/personalhoras',
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
          title: 'Plantillas de personal'
        },
      },
      {
        path: 'empleados/plantillas',
        redirectTo: 'adminplantillas'
      },
      {
        path: 'adminplantillas',
        component: PlantillasAdminComponent,
        data: {
          title: 'Plantillas de personal'
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
