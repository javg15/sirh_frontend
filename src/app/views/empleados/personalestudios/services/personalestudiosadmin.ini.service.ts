import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';

import { PersonalEstudiosAdminService } from './personalestudiosadmin.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PersonalEstudiosAdminIniService implements Resolve <Observable<any>>{

  constructor(private ds: PersonalEstudiosAdminService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.ds.getHeaders().pipe(
      take(1),
      map(userdataDocs => userdataDocs)
    )
  }
}
