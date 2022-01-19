import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

import {GoogleMapsModule} from '@angular/google-maps';

@NgModule({
  imports: [
    FormsModule,
    HomeRoutingModule,
    CommonModule,
    GoogleMapsModule,
  ],
  declarations: [ HomeComponent ]
})
export class HomeModule { }
