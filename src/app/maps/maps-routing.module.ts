import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapsFormComponent } from './maps-form.component';

const routes: Routes = [
  {
    path: '',
    component: MapsFormComponent,
    data: {
      title: 'Mapa'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule {}
