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

@NgModule({
  imports: [
    CommonModule,
    CollapseModule,
    FormsModule
  ],
  declarations: [
    SearchAdminComponent,
    HeaderAdminComponent,

    ValidationSummaryComponent,
    FormUploadComponent,
    ListUploadComponent,
    DetailsUploadComponent
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
    CommonModule
  ]
})
export class SharedModule { }
