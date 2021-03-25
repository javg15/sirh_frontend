import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../_shared/shared.module';

import { PlantillasRoutingModule } from './plantillas-routing.module';
import { PlantillasService } from './services/plantillas.service';
import { PlantillasAdminComponent } from './admin/plantillas-admin.component';
import { PlantillasFormComponent } from './form/plantillas-form.component';
import { PlantillasDocsAdminComponent } from './docs/plantillasdocs-admin.component';
import { PlantillasDocsFormComponent } from './docssub/plantillasdocs-form.component';
import { PlantillasDocsProfesionalFormComponent } from './docssub/plantillasdocsprofesional-form.component';
import { PlantillasDocsNombramientoFormComponent } from './docssub/plantillasdocsnombramiento-form.component';
import { PlantillasDocsFamiliaresFormComponent } from './docssub/plantillasdocsfamiliares-form.component';
import { PlantillasDocsSindicatoFormComponent } from './docssub/plantillasdocssindicato-form.component';
import { PlantillasDocsLicenciasFormComponent } from './docssub/plantillasdocslicencias-form.component';

import { DataTablesModule } from 'angular-datatables';

import { DatePipe } from '@angular/common'
// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DropdownsComponent } from '../../buttons/dropdowns.component';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { NgSelect2Module } from 'ng-select2';


@NgModule({
  imports: [
    CommonModule,
    PlantillasRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    SharedModule,
    AutocompleteLibModule,
    NgSelect2Module,
    BsDropdownModule.forRoot(),
  ],
  declarations: [
    DropdownsComponent,
    PlantillasAdminComponent,
    PlantillasFormComponent,
    PlantillasDocsAdminComponent,
    PlantillasDocsFormComponent,
    PlantillasDocsProfesionalFormComponent,
    PlantillasDocsNombramientoFormComponent,
    PlantillasDocsFamiliaresFormComponent,
    PlantillasDocsSindicatoFormComponent,
    PlantillasDocsLicenciasFormComponent,
  ],
  providers: [
    PlantillasService,
    DatePipe
  ],
  exports:[
  ]
})
export class PlantillasModule { }
