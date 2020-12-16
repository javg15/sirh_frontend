import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../_shared/shared.module';

import { CatregionesRoutingModule } from './catregiones-routing.module';
import { CatregionesService } from './services/catregiones.service';
import { CatregionesAdminComponent } from './admin/catregiones-admin.component';
import { CatregionesFormComponent } from './form/catregiones-form.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  imports: [
    CommonModule,
    CatregionesRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    SharedModule
  ],
  declarations: [
    CatregionesAdminComponent,
    CatregionesFormComponent
  ],
  providers: [
    CatregionesService
  ]
})
export class CatregionesModule { }
