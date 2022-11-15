import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';

import { LoginRecoverService } from './login-recover.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginRecoverIniService implements Resolve <Observable<any>>{

  constructor(private ds: LoginRecoverService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return null;
  }
}
