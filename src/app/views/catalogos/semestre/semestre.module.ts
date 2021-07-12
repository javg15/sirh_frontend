import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../_shared/shared.module';

import { SemestreRoutingModule } from './semestre-routing.module';
import { SemestreService } from './services/semestre.service';
import { SemestreAdminComponent } from './admin/semestre-admin.component';
import { SemestreFormComponent } from './form/semestre-form.component';
import { DataTablesModule } from 'angular-datatables';
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  imports: [
    CommonModule,
    SemestreRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    SharedModule,
    NgSelect2Module,
  ],
  declarations: [
    SemestreAdminComponent,
    SemestreFormComponent
  ],
  providers: [
    SemestreService
  ]
})
export class SemestreModule { }
