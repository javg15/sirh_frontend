import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../_shared/shared.module';

import { MateriasclaseRoutingModule } from './materiasclase-routing.module';
import { MateriasclaseService } from './services/materiasclase.service';
import { MateriasclaseAdminComponent } from './admin/materiasclase-admin.component';
import { MateriasclaseFormComponent } from './form/materiasclase-form.component';
import { DataTablesModule } from 'angular-datatables';
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  imports: [
    CommonModule,
    MateriasclaseRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    SharedModule,
    NgSelect2Module,
  ],
  declarations: [
    MateriasclaseAdminComponent,
    MateriasclaseFormComponent
  ],
  providers: [
    MateriasclaseService
  ]
})
export class MateriasclaseModule { }
