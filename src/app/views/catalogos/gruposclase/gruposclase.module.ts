import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../_shared/shared.module';

import { GruposclaseRoutingModule } from './gruposclase-routing.module';
import { GruposclaseService } from './services/gruposclase.service';
import { GruposclaseAdminComponent } from './admin/gruposclase-admin.component';
import { GruposclaseFormComponent } from './form/gruposclase-form.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  imports: [
    CommonModule,
    GruposclaseRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    SharedModule
  ],
  declarations: [
    GruposclaseAdminComponent,
    GruposclaseFormComponent
  ],
  providers: [
    GruposclaseService
  ]
})
export class GruposclaseModule { }
