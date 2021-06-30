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
  imageAvatar1:any;imageAvatar2:any;imageAvatar3:any;
  imageAvatar4:any;imageAvatar5:any;imageAvatar6:any;

  constructor(private tokenStorage: TokenStorageService,
      private archivoSvc: ArchivosService,
      private router: Router,
      private _sanitizer: DomSanitizer,
    ) {
      this.archivoSvc.getAvatar(this.usuario.id).subscribe(resp => {
        resp.username="02338";
        this.imageAvatar1=(resp.username.length<10?'http://sigaa.cobaev.edu.mx/festival/fotos/personal/'+resp.username+'.JPG':'transform('+resp.username+')')
        this.imageAvatar2=(resp.username.length<10?'http://sigaa.cobaev.edu.mx/festival/fotos/personal/'+resp.username+'.jpg':'transform('+resp.username+')')
        this.imageAvatar3=(resp.username.length<10?'http://sigaa.cobaev.edu.mx/festival/fotos/personal/'+resp.username+'.PNG':'transform('+resp.username+')')
        this.imageAvatar4=(resp.username.length<10?'http://sigaa.cobaev.edu.mx/festival/fotos/personal/'+resp.username+'.png':'transform('+resp.username+')')
        this.imageAvatar5=(resp.username.length<10?'http://sigaa.cobaev.edu.mx/festival/fotos/personal/'+resp.username+'.JPEG':'transform('+resp.username+')')
        this.imageAvatar6=(resp.username.length<10?'http://sigaa.cobaev.edu.mx/festival/fotos/personal/'+resp.username+'.jpeg':'transform('+resp.username+')')

        /*this.imageAvatar = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
                 + resp[0]["datos"]);*/
        this.imageAvatar = 'http://sigaa.cobaev.edu.mx/festival/fotos/personal/02338.jpg';
      },
      error => {
        this.imageAvatar='http://sigaa.cobaev.edu.mx/festival/fotos/personal/02338.jpg';
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
