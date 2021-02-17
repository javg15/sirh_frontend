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
import { DataTablesModule } from 'angular-datatables';

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
  ],
  declarations: [
    PlantillasAdminComponent,
    PlantillasFormComponent,
    PlantillasDocsAdminComponent,
    PlantillasDocsFormComponent,
    PlantillasDocsProfesionalFormComponent,
  ],
  providers: [
    PlantillasService
  ],
  exports:[
  ]
})
export class PlantillasModule { }
