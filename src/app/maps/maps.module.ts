import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../views/_shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { MapsRoutingModule } from './maps-routing.module';
import { MapsService } from './services/maps.service';
import { MapsFormComponent } from './maps-form.component';
import { NgSelect2Module } from 'ng-select2';
import { NgxMaskModule, IConfig } from 'ngx-mask'

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    FormsModule,
    MapsRoutingModule,
    CommonModule,
    NgSelect2Module,
    NgxMaskModule.forRoot(maskConfig),
    ModalModule.forRoot(),
    SharedModule
  ],
  declarations: [ MapsFormComponent,
  ],
    providers: [
      MapsService
    ]
})
export class MapsModule { }
