import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../_shared/shared.module';

import { PersonalRoutingModule } from './personal-routing.module';
import { PersonalService } from './services/personal.service';
import { PersonalAdminComponent } from './admin/personal-admin.component';
import { PersonalFormComponent } from './form/personal-form.component';
import { DataTablesModule } from 'angular-datatables';

import { NgxMaskModule, IConfig } from 'ngx-mask'

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
  ],
  declarations: [
    PersonalAdminComponent,
    PersonalFormComponent
  ],
  providers: [
    PersonalService
  ]
})
export class PersonalModule { }
