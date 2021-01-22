import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../_shared/shared.module';

import { CatcentrostrabajoRoutingModule } from './catcentrostrabajo-routing.module';
import { CatcentrostrabajoService } from './services/catcentrostrabajo.service';
import { CatcentrostrabajoAdminComponent } from './admin/catcentrostrabajo-admin.component';
import { CatcentrostrabajoFormComponent } from './form/catcentrostrabajo-form.component';
import { DataTablesModule } from 'angular-datatables';
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  imports: [
    CommonModule,
    CatcentrostrabajoRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    SharedModule,
    NgSelect2Module
  ],
  declarations: [
    CatcentrostrabajoAdminComponent,
    CatcentrostrabajoFormComponent
  ],
  providers: [
    CatcentrostrabajoService
  ]
})
export class CatcentrostrabajoModule { }
