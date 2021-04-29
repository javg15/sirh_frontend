import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';

import { CategoriasdetalleService } from './categoriasdetalle.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriasdetalleIniService implements Resolve <Observable<any>>{

  constructor(private ds: CategoriasdetalleService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.ds.getHeaders().pipe(
      take(1),
      map(userdata => userdata)
    )
  }
}
