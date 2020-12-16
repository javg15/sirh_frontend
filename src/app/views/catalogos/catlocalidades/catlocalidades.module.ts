import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../_shared/shared.module';

import { CatlocalidadesRoutingModule } from './catlocalidades-routing.module';
import { CatlocalidadesService } from './services/catlocalidades.service';
import { CatlocalidadesAdminComponent } from './admin/catlocalidades-admin.component';
import { CatlocalidadesFormComponent } from './form/catlocalidades-form.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  imports: [
    CommonModule,
    CatlocalidadesRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    SharedModule
  ],
  declarations: [
    CatlocalidadesAdminComponent,
    CatlocalidadesFormComponent
  ],
  providers: [
    CatlocalidadesService
  ]
})
export class CatlocalidadesModule { }
