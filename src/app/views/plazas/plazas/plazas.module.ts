import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../_shared/shared.module';

import { PlazasRoutingModule } from './plazas-routing.module';
import { PlazasService } from './services/plazas.service';
import { PlazasAdminComponent } from './admin/plazas-admin.component';
import { PlazasFormComponent } from './form/plazas-form.component';
import { PlazasHistorialComponent } from './historial/plazas-historial.component';
import { PlazasHistorialNominaComponent } from './historialnomina/plazas-historialnomina.component';
import { DataTablesModule } from 'angular-datatables';
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  imports: [
    CommonModule,
    PlazasRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    SharedModule,
    NgSelect2Module
  ],
  declarations: [
    PlazasAdminComponent,
    PlazasFormComponent,
    PlazasHistorialComponent,
    PlazasHistorialNominaComponent
  ],
  providers: [
    PlazasService
  ]
})
export class PlazasModule { }
