import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';*/
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';


// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { MapsFormComponent } from './maps/maps-form.component';
import { RegisterComponent } from './register/register.component';


import { AuthGuard } from './_guards/auth.guard';


const routes: Routes = [

  /*{ path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },*/
  /*{ path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },*/
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule) },
  /*{
    path: 'maps',
    component: MapsFormComponent,
    data: {
      title: 'Mapa de ubicación de planteles'
    }
  },*/

  {
    path: '',
    canActivate: [AuthGuard],
    component: DefaultLayoutComponent,
    data: {
      title: 'Inicio'
    },
    children: [
      {
          path: 'register',
          component: RegisterComponent,
          data: {
            title: 'Register Page'
          }
      },
      { path: 'home', loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule) },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'catalogos/catplanteles',
        loadChildren: () => import('./views/catalogos/catplanteles/catplanteles.module').then(m => m.CatplantelesModule)
      },
      {
        path: 'catalogos/catmunicipios',
        loadChildren: () => import('./views/catalogos/catmunicipios/catmunicipios.module').then(m => m.CatmunicipiosModule)
      },
      {
        path: 'catalogos/catlocalidades',
        loadChildren: () => import('./views/catalogos/catlocalidades/catlocalidades.module').then(m => m.CatlocalidadesModule)
      },
      {
        path: 'catalogos/catcentrostrabajo',
        loadChildren: () => import('./views/catalogos/catcentrostrabajo/catcentrostrabajo.module').then(m => m.CatcentrostrabajoModule)
      },
      {
        path: 'catalogos/catzonaeconomica',
        loadChildren: () => import('./views/catalogos/catzonaeconomica/catzonaeconomica.module').then(m => m.CatzonaeconomicaModule)
      },
      {
        path: 'catalogos/catzonageografica',
        loadChildren: () => import('./views/catalogos/catzonageografica/catzonageografica.module').then(m => m.CatzonageograficaModule)
      },
      {
        path: 'catalogos/catregiones',
        loadChildren: () => import('./views/catalogos/catregiones/catregiones.module').then(m => m.CatregionesModule)
      },
      {
        path: 'catalogos/categorias',
        loadChildren: () => import('./views/catalogos/categorias/categorias.module').then(m => m.CategoriasModule)
      },
      {
        path: 'catalogos/categoriastabular',
        loadChildren: () => import('./views/catalogos/categoriastabular/categoriastabular.module').then(m => m.CategoriastabularModule)
      },
      {
        path: 'catalogos/catestatusplaza',
        loadChildren: () => import('./views/catalogos/catestatusplaza/catestatusplaza.module').then(m => m.CatestatusplazaModule)
      },
      {
        path: 'catalogos/semestre',
        loadChildren: () => import('./views/catalogos/semestre/semestre.module').then(m => m.SemestreModule)
      },
      {
        path: 'catalogos/catquincena',
        loadChildren: () => import('./views/catalogos/catquincena/catquincena.module').then(m => m.CatquincenaModule)
      },
      {
        path: 'catalogos/gruposclase',
        loadChildren: () => import('./views/catalogos/gruposclase/gruposclase.module').then(m => m.GruposclaseModule)
      },
      {
        path: 'catalogos/materiasclase',
        loadChildren: () => import('./views/catalogos/materiasclase/materiasclase.module').then(m => m.MateriasclaseModule)
      },
      {
        path: 'plazas/plazas',
        loadChildren: () => import('./views/plazas/plazas/plazas.module').then(m => m.PlazasModule)
      },
      {
        path: 'plazas/horasclase',
        loadChildren: () => import('./views/plazas/horasclase/horasclase.module').then(m => m.HorasclaseModule)
      },
      {
        path: 'catalogos/personal',
        loadChildren: () => import('./views/catalogos/personal/personal.module').then(m => m.PersonalModule)
      },
      {
        path: 'empleados',
        loadChildren: () => import('./views/empleados/empleadosstart.module').then(m => m.EmpleadosStartModule)
      },
      {
        path: 'autenticacion',
        loadChildren: () => import('./views/autenticacion/autenticacion.module').then(m => m.AutenticacionModule)
      },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  //imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, { useHash: true })], //reload no marque error
  exports: [RouterModule]
})
export class AppRoutingModule { }
