import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';

import { CatzonageograficaService } from './catzonageografica.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CatzonageograficaIniService implements Resolve <Observable<any>>{

  constructor(private ds: CatzonageograficaService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.ds.getHeaders().pipe(
      take(1),
      map(userdata => userdata)
    )
  }
}
