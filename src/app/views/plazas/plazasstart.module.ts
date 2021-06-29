import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../_shared/shared.module';

import { PlazasStartRoutingModule } from './plazasstart-routing.module';

import { PersonalAdminComponent } from './personal/admin/personal-admin.component';
import { PersonalFormComponent } from './personal/form/personal-form.component';
import { PersonalhorasAdminComponent } from './personal/horasadmin/personalhoras-admin.component';
import { PersonalhorasFormComponent } from './personal/horasform/personalhoras-form.component';
import { PlantillasAdminComponent } from './plantillas/admin/plantillas-admin.component';
import { PlantillasFormComponent } from './plantillas/form/plantillas-form.component';
import { PlantillasDocsAdminComponent } from './plantillas/docs/plantillasdocs-admin.component';
import { PlantillasDocsFormComponent } from './plantillas/docssub/plantillasdocs-form.component';
import { PlantillasDocsProfesionalFormComponent } from './plantillas/docssub/plantillasdocsprofesional-form.component';
import { PlantillasDocsNombramientoFormComponent } from './plantillas/docssub/plantillasdocsnombramiento-form.component';
import { PlantillasDocsBajaFormComponent } from './plantillas/docssub/plantillasdocsbaja-form.component';
import { PlantillasDocsFamiliaresFormComponent } from './plantillas/docssub/plantillasdocsfamiliares-form.component';
import { PlantillasDocsSindicatoFormComponent } from './plantillas/docssub/plantillasdocssindicato-form.component';
import { PlantillasDocsLicenciasFormComponent } from './plantillas/docssub/plantillasdocslicencias-form.component';
import { DataTablesModule } from 'angular-datatables';
import { NgSelect2Module } from 'ng-select2';

import { NgxMaskModule, IConfig } from 'ngx-mask'

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

import { ReplacePipe } from '../../_services/replace-pipe';

import { DatePipe } from '@angular/common'

@NgModule({
  imports: [
    CommonModule,
    //PersonalRoutingModule,
    PlazasStartRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(maskConfig),
    TabsModule.forRoot(),
    NgSelect2Module,
    BsDropdownModule.forRoot(),
    AutocompleteLibModule,
    SharedModule,
  ],
  declarations: [
    PersonalAdminComponent,
    PersonalFormComponent,
    PersonalhorasAdminComponent,
    PersonalhorasFormComponent,
    PlantillasAdminComponent,
    PlantillasFormComponent,
    PlantillasDocsAdminComponent,
    PlantillasDocsFormComponent,
    PlantillasDocsProfesionalFormComponent,
    PlantillasDocsBajaFormComponent,
    PlantillasDocsNombramientoFormComponent,
    PlantillasDocsFamiliaresFormComponent,
    PlantillasDocsSindicatoFormComponent,
    PlantillasDocsLicenciasFormComponent,
    ReplacePipe
  ],
  providers: [
    //PersonalService
    DatePipe
  ],
  exports: [
    PersonalAdminComponent,
    PersonalFormComponent,
    PersonalhorasAdminComponent,
    PersonalhorasFormComponent,
    PlantillasAdminComponent,
    PlantillasFormComponent,
    PlantillasDocsAdminComponent,
    PlantillasDocsFormComponent,
    PlantillasDocsProfesionalFormComponent,
    PlantillasDocsBajaFormComponent,
    PlantillasDocsNombramientoFormComponent,
    PlantillasDocsFamiliaresFormComponent,
    PlantillasDocsSindicatoFormComponent,
    PlantillasDocsLicenciasFormComponent,
  ]
})
export class PlazasStartModule { }
