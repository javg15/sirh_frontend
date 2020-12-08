import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Collapse Component
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { SearchAdminComponent } from './search-admin.component';

@NgModule({
  imports: [
    CommonModule,
    CollapseModule,
    FormsModule
  ],
  declarations: [
    SearchAdminComponent
  ],
  providers: [

  ],
  exports: [
    SearchAdminComponent,
    CommonModule
  ]
})
export class SharedModule { }
