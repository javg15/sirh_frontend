import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Collapse Component
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { SearchAdminComponent } from './search-admin.component';
import { HeaderAdminComponent } from './header-admin.component';
import { ValidationSummaryComponent } from './validation-summary.component';

@NgModule({
  imports: [
    CommonModule,
    CollapseModule,
    FormsModule
  ],
  declarations: [
    SearchAdminComponent,
    HeaderAdminComponent,
    ValidationSummaryComponent
  ],
  providers: [

  ],
  exports: [
    SearchAdminComponent,
    HeaderAdminComponent,
    ValidationSummaryComponent,
    CommonModule
  ]
})
export class SharedModule { }
