import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../_shared/shared.module';

import { CatzonageograficaRoutingModule } from './catzonageografica-routing.module';
import { CatzonageograficaService } from './services/catzonageografica.service';
import { CatzonageograficaAdminComponent } from './admin/catzonageografica-admin.component';
import { CatzonageograficaFormComponent } from './form/catzonageografica-form.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  imports: [
    CommonModule,
    CatzonageograficaRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    SharedModule
  ],
  declarations: [
    CatzonageograficaAdminComponent,
    CatzonageograficaFormComponent
  ],
  providers: [
    CatzonageograficaService
  ]
})
export class CatzonageograficaModule { }
