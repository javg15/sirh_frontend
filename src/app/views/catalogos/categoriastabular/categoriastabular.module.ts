import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../_shared/shared.module';

import { CategoriastabularRoutingModule } from './categoriastabular-routing.module';
import { CategoriastabularService } from './services/categoriastabular.service';
import { CategoriastabularAdminComponent } from './admin/categoriastabular-admin.component';
import { CategoriastabularFormComponent } from './form/categoriastabular-form.component';
import { DataTablesModule } from 'angular-datatables';
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  imports: [
    CommonModule,
    CategoriastabularRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    SharedModule,
    NgSelect2Module
  ],
  declarations: [
    CategoriastabularAdminComponent,
    CategoriastabularFormComponent
  ],
  providers: [
    CategoriastabularService
  ]
})
export class CategoriastabularModule { }
