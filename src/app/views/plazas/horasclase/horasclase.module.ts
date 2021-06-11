import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../_shared/shared.module';

import { HorasclaseRoutingModule } from './horasclase-routing.module';
import { HorasclaseService } from './services/horasclase.service';
import { HorasclaseAdminComponent } from './admin/horasclase-admin.component';
import { HorasclaseFormComponent } from './form/horasclase-form.component';
import { HorasclaseasignarFormComponent } from './form/horasclaseasignar-form.component';
import { HorasclasedetalleFormComponent } from './formsub/horasclasedetalle-form.component';
import { DataTablesModule } from 'angular-datatables';
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  imports: [
    CommonModule,
    HorasclaseRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    SharedModule,
    NgSelect2Module
  ],
  declarations: [
    HorasclaseAdminComponent,
    HorasclaseFormComponent,
    HorasclaseasignarFormComponent,
    HorasclasedetalleFormComponent
  ],
  providers: [
    HorasclaseService
  ]
})
export class HorasclaseModule { }
