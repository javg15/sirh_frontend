import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';

import { PlantillasdocsNombramientoService } from './plantillasdocsnombramiento.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PlantillasdocsNombramientoIniService implements Resolve <Observable<any>>{

  constructor(private ds: PlantillasdocsNombramientoService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return null;
  }
}
