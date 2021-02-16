import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import { TokenStorageService } from '../../_services/token-storage.service';
import { ArchivosService } from '../../views/catalogos/archivos/services/archivos.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-default',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  usuario:any=this.tokenStorage.getUser();
  imageAvatar:any;

  constructor(private tokenStorage: TokenStorageService,
      private archivoSvc: ArchivosService,
      private router: Router,
      private _sanitizer: DomSanitizer,
    ) {
      this.archivoSvc.getAvatar(this.usuario.id).subscribe(resp => {
        this.imageAvatar = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
                 + resp[0]["datos"]);
      },
      error => {
        this.imageAvatar='assets/img/avatars/avatar.jpg';
      }
      );
  }


  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout(): void {
    this.tokenStorage.signOut();

    //this.router.navigate(['/login']);
  }
}
