import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../_shared/shared.module';

import { PlazasRoutingModule } from './plazas-routing.module';
import { PlazasService } from './services/plazas.service';
import { PlazasAdminComponent } from './admin/plazas-admin.component';
import { PlazasFormComponent } from './form/plazas-form.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  imports: [
    CommonModule,
    PlazasRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    SharedModule
  ],
  declarations: [
    PlazasAdminComponent,
    PlazasFormComponent
  ],
  providers: [
    PlazasService
  ]
})
export class PlazasModule { }
