import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../_shared/shared.module';

import { PlantillasRoutingModule } from './plantillas-routing.module';
import { PlantillasService } from './services/plantillas.service';
import { PlantillasAdminComponent } from './admin/plantillas-admin.component';
import { PlantillasFormComponent } from './form/plantillas-form.component';
import { PlantillaspersonalFormComponent } from './formsub/plantillaspersonal-form.component';
import { DataTablesModule } from 'angular-datatables';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';

@NgModule({
  imports: [
    CommonModule,
    PlantillasRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    SharedModule,
    AutocompleteLibModule
  ],
  declarations: [
    PlantillasAdminComponent,
    PlantillasFormComponent,
    PlantillaspersonalFormComponent
  ],
  providers: [
    PlantillasService
  ]
})
export class PlantillasModule { }
