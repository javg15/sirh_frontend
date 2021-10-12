import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';

import { HorasasignacionFormService } from './horasasignacionform.service';
import { CatquincenaService } from '../../../catalogos/catquincena/services/catquincena.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HorasasignacionFormIniService implements Resolve<Observable<any>>{

  constructor(private ds: HorasasignacionFormService,
    private catquincenaSvc: CatquincenaService,) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.catquincenaSvc.getQuincenaActiva().pipe(
      map(dataHoraAsignacion => dataHoraAsignacion)
    )
  }
}
