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
import { DataTablesModule } from 'angular-datatables';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { NgSelect2Module } from 'ng-select2';
import { FormUploadComponent } from '../../_shared/upload/form-upload.component';
import { ListUploadComponent } from '../../_shared/upload/list-upload.component';
import { DetailsUploadComponent } from '../../_shared/upload/details-upload.component';



@NgModule({
  imports: [
    CommonModule,
    PlantillasRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    SharedModule,
    AutocompleteLibModule,
    NgSelect2Module
  ],
  declarations: [
    PlantillasAdminComponent,
    PlantillasFormComponent,
    PlantillasDocsAdminComponent,
    PlantillasDocsFormComponent,
    FormUploadComponent,
    ListUploadComponent,
    DetailsUploadComponent
  ],
  providers: [
    PlantillasService
  ],
  exports:[
    FormUploadComponent,
    ListUploadComponent,
    DetailsUploadComponent
  ]
})
export class PlantillasModule { }
