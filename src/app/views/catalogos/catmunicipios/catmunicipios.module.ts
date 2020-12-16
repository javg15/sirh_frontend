import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../_shared/shared.module';

import { CatmunicipiosRoutingModule } from './catmunicipios-routing.module';
import { CatmunicipiosService } from './services/catmunicipios.service';
import { CatmunicipiosAdminComponent } from './admin/catmunicipios-admin.component';
import { CatmunicipiosFormComponent } from './form/catmunicipios-form.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  imports: [
    CommonModule,
    CatmunicipiosRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    SharedModule
  ],
  declarations: [
    CatmunicipiosAdminComponent,
    CatmunicipiosFormComponent
  ],
  providers: [
    CatmunicipiosService
  ]
})
export class CatmunicipiosModule { }
