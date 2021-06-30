import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../_shared/shared.module';

import { PersonalService } from './services/personal.service';
import { PersonalRoutingModule } from './personal-routing.module';

import { PersonalAdminComponent } from './admin/personal-admin.component';
import { PersonalFormComponent } from './form/personal-form.component';
import { DataTablesModule } from 'angular-datatables';
import { NgSelect2Module } from 'ng-select2';

import { NgxMaskModule, IConfig } from 'ngx-mask'

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
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
    NgxMaskModule.forRoot(maskConfig),
    TabsModule.forRoot(),
    NgSelect2Module,
    BsDropdownModule.forRoot(),
    AutocompleteLibModule,
    SharedModule
  ],
  declarations: [
    PersonalAdminComponent,
    PersonalFormComponent,
  ],
  providers: [
    PersonalService
  ],
  exports: [
  ]
})
export class PersonalModule { }

