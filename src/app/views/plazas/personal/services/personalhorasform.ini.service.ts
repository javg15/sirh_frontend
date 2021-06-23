import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';

import { PersonalhorasFormService } from './personalhorasform.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PersonalhorasFormIniService implements Resolve<Observable<any>>{

  constructor(private ds: PersonalhorasFormService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return null;
  }
}
