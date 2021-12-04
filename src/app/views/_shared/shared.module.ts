import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Collapse Component
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { SearchAdminComponent } from './search/search-admin.component';
import { HeaderAdminComponent } from './header/header-admin.component';
import { ValidationSummaryComponent } from './validation/validation-summary.component';
import { DetailsUploadComponent } from './upload/details-upload.component';
import { FormUploadComponent } from './upload/form-upload.component';
import { ListUploadComponent } from './upload/list-upload.component';
import { DetailsUploadFisicoComponent } from './upload_fisico/details-uploadFisico.component';
import { FormUploadFisicoComponent } from './upload_fisico/form-uploadFisico.component';
import { ListUploadFisicoComponent } from './upload_fisico/list-uploadFisico.component';
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  imports: [
    CommonModule,
    CollapseModule,
    FormsModule,
    NgSelect2Module
  ],
  declarations: [
    SearchAdminComponent,
    HeaderAdminComponent,

    ValidationSummaryComponent,
    FormUploadComponent,
    ListUploadComponent,
    DetailsUploadComponent,
    FormUploadFisicoComponent,
    ListUploadFisicoComponent,
    DetailsUploadFisicoComponent
  ],
  providers: [

  ],
  exports: [
    SearchAdminComponent,
    HeaderAdminComponent,
    ValidationSummaryComponent,
    FormUploadComponent,
    ListUploadComponent,
    DetailsUploadComponent,
    FormUploadFisicoComponent,
    ListUploadFisicoComponent,
    DetailsUploadFisicoComponent,
    CommonModule
  ]
})
export class SharedModule { }
