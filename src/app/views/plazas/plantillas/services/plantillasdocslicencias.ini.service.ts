import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';

import { PlantillasdocsLicenciasService } from './plantillasdocslicencias.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PlantillasdocsLicenciasIniService implements Resolve <Observable<any>>{

  constructor(private ds: PlantillasdocsLicenciasService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return null;
  }
}
