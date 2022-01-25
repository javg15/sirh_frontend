import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeService } from './services/home.service';
import { MapsFormComponent } from './maps/maps-form.component';


@NgModule({
  imports: [
    FormsModule,
    HomeRoutingModule,
    CommonModule,
    ModalModule.forRoot(),
  ],
  declarations: [ HomeComponent,
    MapsFormComponent,
  ],
    providers: [
      HomeService
    ]
})
export class HomeModule { }
