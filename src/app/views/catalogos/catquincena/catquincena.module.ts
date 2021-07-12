import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../_shared/shared.module';

import { CatquincenaRoutingModule } from './catquincena-routing.module';
import { CatquincenaService } from './services/catquincena.service';
import { CatquincenaAdminComponent } from './admin/catquincena-admin.component';
import { CatquincenaFormComponent } from './form/catquincena-form.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  imports: [
    CommonModule,
    CatquincenaRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    SharedModule,
  ],
  declarations: [
    CatquincenaAdminComponent,
    CatquincenaFormComponent
  ],
  providers: [
    CatquincenaService
  ]
})
export class CatquincenaModule { }
