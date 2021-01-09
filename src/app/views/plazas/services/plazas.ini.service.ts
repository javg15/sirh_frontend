import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';

import { PlazasService } from './plazas.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PlazasIniService implements Resolve <Observable<any>>{

  constructor(private ds: PlazasService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.ds.getHeaders().pipe(
      take(1),
      map(userdata => userdata)
    )
  }
}
