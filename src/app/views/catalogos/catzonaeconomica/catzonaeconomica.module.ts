import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../_shared/shared.module';

import { CatzonaeconomicaRoutingModule } from './catzonaeconomica-routing.module';
import { CatzonaeconomicaService } from './services/catzonaeconomica.service';
import { CatzonaeconomicaAdminComponent } from './admin/catzonaeconomica-admin.component';
import { CatzonaeconomicaFormComponent } from './form/catzonaeconomica-form.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  imports: [
    CommonModule,
    CatzonaeconomicaRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    SharedModule
  ],
  declarations: [
    CatzonaeconomicaAdminComponent,
    CatzonaeconomicaFormComponent
  ],
  providers: [
    CatzonaeconomicaService
  ]
})
export class CatzonaeconomicaModule { }
