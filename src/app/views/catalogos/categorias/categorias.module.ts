import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../_shared/shared.module';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriasService } from './services/categorias.service';
import { CategoriasAdminComponent } from './admin/categorias-admin.component';
import { CategoriasFormComponent } from './form/categorias-form.component';
import { CategoriasdetalleFormComponent } from './formdetalle/categoriasdetalle-form.component';
import { CatpercepcionescategoriasFormComponent } from './formpercepciones/catpercepcionescategorias-form.component';
import { DataTablesModule } from 'angular-datatables';

import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgSelect2Module } from 'ng-select2';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    SharedModule,
    NgxMaskModule.forRoot(maskConfig),
    NgSelect2Module
  ],
  declarations: [
    CategoriasAdminComponent,
    CategoriasFormComponent,
    CategoriasdetalleFormComponent,
    CatpercepcionescategoriasFormComponent
  ],
  providers: [
    CategoriasService
  ]
})
export class CategoriasModule { }
