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

import { DataTablesModule } from 'angular-datatables';
import { NgSelect2Module } from 'ng-select2';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  imports: [
    CommonModule,
    PlazasRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    SharedModule,
    NgSelect2Module,
    TabsModule.forRoot(),
  ],
  declarations: [
    PlazasAdminComponent,
    PlazasFormComponent,
    PlazasHistorialComponent,

  ],
  providers: [
    PlazasService
  ]
})
export class PlazasModule { }
