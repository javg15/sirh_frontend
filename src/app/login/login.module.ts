import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { LoginComponent } from './login.component';
import { LoginRecoverComponent } from './login-recover.component';
import { LoginNewPassComponent } from './login-newpass.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginService } from './services/login.service';
import { InjectionToken, FactoryProvider } from '@angular/core';

export const WINDOW = new InjectionToken<Window>('window');

const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: () => window
};

export const WINDOW_PROVIDERS = [
    windowProvider
]

@NgModule({
  imports: [
    FormsModule,
    LoginRoutingModule,
    CommonModule,
    ModalModule.forRoot(),
  ],
  declarations: [ 
    LoginComponent,
    LoginNewPassComponent,
    LoginRecoverComponent
  ],
    providers: [
      LoginService,
      WINDOW_PROVIDERS,
    ]
})
export class LoginModule { }
