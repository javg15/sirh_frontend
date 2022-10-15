import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';

import { HorashistorialService } from './horashistorial.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HorasHistorialIniService implements Resolve <Observable<any>>{

  constructor(private ds: HorashistorialService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.ds.getHeaders().pipe(
      take(1),
      map(userdataMateriasHistoria => userdataMateriasHistoria)
    )
  }

}
