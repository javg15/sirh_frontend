import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../_shared/shared.module';

import { PersonalRoutingModule } from './personal-routing.module';
import { PersonalService } from './services/personal.service';
import { PersonalAdminComponent } from './admin/personal-admin.component';
import { PersonalFormComponent } from './form/personal-form.component';
import { PersonalhorasAdminComponent } from './horasadmin/personalhoras-admin.component';
import { PersonalhorasFormComponent } from './horasform/personalhoras-form.component';
import { DataTablesModule } from 'angular-datatables';
import { NgSelect2Module } from 'ng-select2';

import { NgxMaskModule, IConfig } from 'ngx-mask'

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';


const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    CommonModule,
    PersonalRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    SharedModule,
    NgxMaskModule.forRoot(maskConfig),
    TabsModule.forRoot(),
    NgSelect2Module,
    BsDropdownModule.forRoot(),
  ],
  declarations: [
    PersonalAdminComponent,
    PersonalFormComponent,
    PersonalhorasAdminComponent,
    PersonalhorasFormComponent,
  ],
  providers: [
    PersonalService
  ],
  exports: [
  ]
})
export class PersonalModule { }
