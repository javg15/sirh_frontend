import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../_shared/shared.module';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReportesService } from './services/reportes.service';
import { ReportesAdminComponent } from './admin/reportes-admin.component';
import { RPlantillasFormComponent } from './plantillas/rplantillas-form.component';
import { RCatCategoriasFormComponent } from './catalogos/categorias/rcatcategorias-form.component';
import { RPlazasFormComponent } from './plazas/rplazas-form.component';

import { NgSelect2Module } from 'ng-select2';
import { TreeModule } from '@circlon/angular-tree-component';

@NgModule({
  imports: [
    CommonModule,
    ReportesRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    NgSelect2Module,
    TreeModule,
    SharedModule,
  ],
  declarations: [
    ReportesAdminComponent,
    RPlantillasFormComponent,
    RPlazasFormComponent,
    RCatCategoriasFormComponent
  ],
  providers: [
    ReportesService
  ]
})
export class ReportesModule { }
