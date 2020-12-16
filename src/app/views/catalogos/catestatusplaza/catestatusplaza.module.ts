import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../_shared/shared.module';

import { CatestatusplazaRoutingModule } from './catestatusplaza-routing.module';
import { CatestatusplazaService } from './services/catestatusplaza.service';
import { CatestatusplazaAdminComponent } from './admin/catestatusplaza-admin.component';
import { CatestatusplazaFormComponent } from './form/catestatusplaza-form.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  imports: [
    CommonModule,
    CatestatusplazaRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    SharedModule
  ],
  declarations: [
    CatestatusplazaAdminComponent,
    CatestatusplazaFormComponent
  ],
  providers: [
    CatestatusplazaService
  ]
})
export class CatestatusplazaModule { }
