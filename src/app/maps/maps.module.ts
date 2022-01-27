import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MapsRoutingModule } from './maps-routing.module';
import { MapsService } from './services/maps.service';
import { MapsFormComponent } from './maps-form.component';


@NgModule({
  imports: [
    FormsModule,
    MapsRoutingModule,
    CommonModule,
  ],
  declarations: [ MapsFormComponent,
  ],
    providers: [
      MapsService
    ]
})
export class MapsModule { }
