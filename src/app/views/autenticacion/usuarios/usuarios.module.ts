import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../_shared/shared.module';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosService } from './services/usuarios.service';
import { UsuariosAdminComponent } from './admin/usuarios-admin.component';
import { UsuariosFormComponent } from './form/usuarios-form.component';
import { UsuariosFormdirectComponent } from './formdirect/usuarios-formdirect.component';
import { DataTablesModule } from 'angular-datatables';

import { NgxMaskModule, IConfig } from 'ngx-mask'

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';


const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    SharedModule,
    NgxMaskModule.forRoot(maskConfig),
    TabsModule.forRoot(),
  ],
  declarations: [
    UsuariosAdminComponent,
    UsuariosFormComponent,
    UsuariosFormdirectComponent
  ],
  providers: [
    UsuariosService
  ],
  exports:[
  ]
})
export class UsuariosModule { }
