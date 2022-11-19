import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReportesService } from './services/reportes.service';
import { ReportesAdminComponent } from './admin/reportes-admin.component';
import { RPlantillasFormComponent } from './plantillas/rplantillas-form.component';

import { NgSelect2Module } from 'ng-select2';
import { TreeviewModule } from 'ngx-treeview';

@NgModule({
  imports: [
    CommonModule,
    ReportesRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    NgSelect2Module,
    TreeviewModule.forRoot()
  ],
  declarations: [
    ReportesAdminComponent,
    RPlantillasFormComponent,
  ],
  providers: [
    ReportesService
  ]
})
export class ReportesModule { }
