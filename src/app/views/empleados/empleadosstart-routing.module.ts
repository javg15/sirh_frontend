import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalhorasAdminComponent } from './personalhoras/admin/personalhoras-admin.component';
import { HorasasignacionAdminComponent } from './personalhoras/horasadmin/horasasignacion-admin.component';
import { HorasasignacionFormComponent } from './personalhoras/horasform/horasasignacion-form.component';
import { HorasdescargaFormComponent } from './personalhoras/horasdescarga/horasdescarga-form.component';
import { PersonalhorasIniService } from './personalhoras/services/personalhoras.ini.service';
import { HorasasignacionAdminIniService } from './personalhoras/services/horasasignacionadmin.ini.service';
import { HorasasignacionFormIniService } from './personalhoras/services/horasasignacionform.ini.service';

import { PlantillasAdminComponent } from './plantillas/admin/plantillas-admin.component';
import { PlantillasFormComponent } from './plantillas/form/plantillas-form.component';
import { PlantillasDocsAdminComponent } from './plantillas/docs/plantillasdocs-admin.component';
import { PlantillasDocsProfesionalFormComponent } from './plantillas/docssub/plantillasdocsprofesional-form.component';
import { PlantillasDocsNombramientoFormComponent } from './plantillas/docssub/plantillasdocsnombramiento-form.component';
import { PlantillasDocsBajaFormComponent } from './plantillas/docssub/plantillasdocsbaja-form.component';
import { PlantillasDocsFamiliaresFormComponent } from './plantillas/docssub/plantillasdocsfamiliares-form.component';
import { PlantillasIniService } from './plantillas/services/plantillas.ini.service';
import { PlantillasdocsIniService } from './plantillas/services/plantillasdocs.ini.service';
import { PlantillasdocsProfesionalIniService } from './plantillas/services/plantillasdocsprofesional.ini.service';
import { PlantillasdocsFamiliaresIniService } from './plantillas/services/plantillasdocsfamiliares.ini.service';
import { PlantillasdocsSindicatoIniService } from './plantillas/services/plantillasdocssindicato.ini.service';
import { PlantillasdocsLicenciasIniService } from './plantillas/services/plantillasdocslicencias.ini.service';
import { PlantillasHistorialNominaIniService } from './plantillas/services/plantillashistorialnomina.ini.service';

import { PersonalEstudiosAdminComponent } from './personalestudios/admin/personalestudios-admin.component';
import { PersonalEstudiosAdminSubComponent } from './personalestudios/estudiosadmin/personalestudios-adminsub.component';
import { PersonalEstudiosFormComponent } from './personalestudios/estudiosform/personalestudios-form.component';
import { PersonalEstudiosIniService } from './personalestudios/services/personalestudios.ini.service';
import { PersonalEstudiosAdminIniService } from './personalestudios/services/personalestudiosadmin.ini.service';



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
        path: 'descarga',
        component: HorasdescargaFormComponent,
        data: {
          title: 'Descarga de horas'
        },
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
          userdataDocsPreparacion: PlantillasdocsProfesionalIniService,
          userdataDocsFamiliares: PlantillasdocsFamiliaresIniService,
          userdataDocsSindicato: PlantillasdocsSindicatoIniService,
          userdataDocsLicencias: PlantillasdocsLicenciasIniService,
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
      
      {
        path: 'empleados/personalestudios',
        redirectTo: 'adminpersonalestudios'
      },
      {
        path: 'adminpersonalestudios',
        component: PersonalEstudiosAdminComponent,
        data: {
          title: 'Personal estudios'
        },
        resolve: {
          userdata: PersonalEstudiosIniService,
          userdataSub: PersonalEstudiosAdminIniService,
        }
      },
      {
        path: 'adminsubpersonalestudios',
        component: PersonalEstudiosAdminSubComponent,
        data: {
          title: 'admin'
        },
      },
      {
        path: 'formpersonalestudios',
        component: PersonalEstudiosFormComponent,
        data: {
          title: 'form'
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosStartRoutingModule { }
