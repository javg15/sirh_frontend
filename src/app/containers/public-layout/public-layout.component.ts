import {Component} from '@angular/core';
//import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { INavData } from '@coreui/angular';

@Component({
  selector: 'app-public',
  templateUrl: './public-layout.component.html'
})
export class PublicLayoutComponent {
  
  
  constructor(
      private router: Router,
      private _sanitizer: DomSanitizer,
    ) {
        
  }


  

  logout(): void {


    //this.router.navigate(['/login']);
  }

}
