import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';

import { PersonalexpedienteFormService } from './personalexpedienteform.service';
import { CatquincenaService } from '../../catquincena/services/catquincena.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PersonalexpedienteFormIniService implements Resolve<Observable<any>>{

  constructor(private ds: PersonalexpedienteFormService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.ds.getHeaders().pipe(
      take(1),
      map(dataHoraAsignacion => dataHoraAsignacion)
    )
  }
}
