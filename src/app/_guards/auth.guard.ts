import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private tokenStorage: TokenStorageService,
      private userService: UserService,
      private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //solo para comprobar si hay respuesta
      this.userService.isValid().subscribe(
        resp => {
          //console.log("isvalid=>",resp)
        },
        err => {
          //console.log("error=>",err.status)
          if(err.status==401){
            window.sessionStorage.clear();
            this.router.navigate(['home']);
          }
        }
        ,
      );
      
      if (this.tokenStorage.getToken()) {
        return true;
      } else {
        return false;
      }
  }

}
