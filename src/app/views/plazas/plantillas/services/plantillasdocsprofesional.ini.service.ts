import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';

import { PlantillasdocsProfesionalService } from './plantillasdocsprofesional.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PlantillasdocsProfesionalIniService implements Resolve <Observable<any>>{

  constructor(private ds: PlantillasdocsProfesionalService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return null;
  }
}
