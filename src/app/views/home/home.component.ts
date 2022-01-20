import { Component, OnInit, ViewChild } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Router } from '@angular/router';

import { HomeService } from './services/home.service';

import { Personal } from '../../_models';
import { PersonalService } from '../catalogos/personal/services/personal.service';
@Component({
  templateUrl: 'home.component.html'
})
export class HomeComponent  {

  record_personal: Personal;

  usuario:any=this.tokenStorage.getUser();
  images=[1,1,1,1,1,1];
  imageDefault:boolean=false;
  imageAvatar:any;
  imageAvatar1:any;imageAvatar2:any;imageAvatar3:any;
  imageAvatar4:any;imageAvatar5:any;imageAvatar6:any;

  constructor(private tokenStorage: TokenStorageService,
    private homeService: HomeService,
    private personalSvc: PersonalService,
    private router: Router,
  ) {
    //this.imageAvatar = 'http://sigaa.cobaev.edu.mx/festival/fotos/personal/'+this.usuario.username+'.jpg';
    this.imageAvatar1=(this.usuario.username.length<10?'http://sigaa.cobaev.edu.mx/festival/fotos/personal/'+this.usuario.username+'.JPG':'transform('+this.usuario.username+')')
    this.imageAvatar2=(this.usuario.username.length<10?'http://sigaa.cobaev.edu.mx/festival/fotos/personal/'+this.usuario.username+'.jpg':'transform('+this.usuario.username+')')
    this.imageAvatar3=(this.usuario.username.length<10?'http://sigaa.cobaev.edu.mx/festival/fotos/personal/'+this.usuario.username+'.PNG':'transform('+this.usuario.username+')')
    this.imageAvatar4=(this.usuario.username.length<10?'http://sigaa.cobaev.edu.mx/festival/fotos/personal/'+this.usuario.username+'.png':'transform('+this.usuario.username+')')
    this.imageAvatar5=(this.usuario.username.length<10?'http://sigaa.cobaev.edu.mx/festival/fotos/personal/'+this.usuario.username+'.JPEG':'transform('+this.usuario.username+')')
    this.imageAvatar6=(this.usuario.username.length<10?'http://sigaa.cobaev.edu.mx/festival/fotos/personal/'+this.usuario.username+'.jpeg':'transform('+this.usuario.username+')')

    this.personalSvc.getRecordSegunUsuario(this.usuario.id).subscribe(resp => {
      this.record_personal = resp;
    });
  }

  openModal(id: string) {
    this.homeService.open(id);
  }

  closeModal(id: string) {
    this.homeService.close(id);
  }
}
  