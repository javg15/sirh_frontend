import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';*/
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';


// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


import { AuthGuard } from './_guards/auth.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  /*{ path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },*/
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'dashboard',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
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
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'usuarios',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme5',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
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
        path: 'catalogos/catestatusplaza',
        loadChildren: () => import('./views/catalogos/catestatusplaza/catestatusplaza.module').then(m => m.CatestatusplazaModule)
      },
      {
        path: 'plazas/plazas',
        loadChildren: () => import('./views/plazas/plazas/plazas.module').then(m => m.PlazasModule)
      },
      {
        path: 'plazas/personal',
        loadChildren: () => import('./views/plazas/personal/personal.module').then(m => m.PersonalModule)
      },
      {
        path: 'plazas/plantillas',
        loadChildren: () => import('./views/plazas/plantillas/plantillas.module').then(m => m.PlantillasModule)
      },
      {
        path: 'usuarios/formdirect',
        loadChildren: () => import('./views/autenticacion/usuarios/usuarios.module').then(m => m.UsuariosModule)
      },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
