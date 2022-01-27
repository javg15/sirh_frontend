import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs/operators';

import { MapsService } from './maps.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MapsIniService implements Resolve <Observable<any>>{

  constructor(private ds: MapsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return null;
  }
}
