import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';

import { HorasclaseasignarService } from './horasclaseasignar.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HorasclaseasignarIniService implements Resolve <Observable<any>>{

  constructor(private ds: HorasclaseasignarService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.ds.getHeaders().pipe(
      take(1),
      map(userdata => userdata)
    )
  }
}
