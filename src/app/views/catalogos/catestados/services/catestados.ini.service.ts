import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';

import { CatestadosService } from './catestados.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CatestadosIniService implements Resolve <Observable<any>>{

  constructor(private ds: CatestadosService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.ds.getHeaders().pipe(
      take(1),
      map(userdata => userdata)
    )
  }
}
