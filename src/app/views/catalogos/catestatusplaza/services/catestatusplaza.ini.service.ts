import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';

import { CatestatusplazaService } from './catestatusplaza.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CatestatusplazaIniService implements Resolve <Observable<any>>{

  constructor(private ds: CatestatusplazaService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.ds.getHeaders().pipe(
      take(1),
      map(userdata => userdata)
    )
  }
}
