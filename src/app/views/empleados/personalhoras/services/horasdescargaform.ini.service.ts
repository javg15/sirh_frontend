import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';

import { HorasdescargaFormService } from './horasdescargaform.service';
import { CatquincenaService } from '../../../catalogos/catquincena/services/catquincena.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HorasdescargaFormIniService implements Resolve<Observable<any>>{

  constructor(private ds: HorasdescargaFormService,
    private catquincenaSvc: CatquincenaService,) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.catquincenaSvc.getQuincenaActiva().pipe(
      map(dataHoraDescarga => dataHoraDescarga)
    )
  }
}
