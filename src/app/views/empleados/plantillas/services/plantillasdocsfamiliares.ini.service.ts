import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';

import { PlantillasdocsFamiliaresService } from './plantillasdocsfamiliares.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PlantillasdocsFamiliaresIniService implements Resolve <Observable<any>>{

  constructor(private ds: PlantillasdocsFamiliaresService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return null;
  }
}
