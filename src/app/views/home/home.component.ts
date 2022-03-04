import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Router } from '@angular/router';

import { HomeService } from './services/home.service';

import { Personal } from '../../_models';
import { PersonalService } from '../catalogos/personal/services/personal.service';
@Component({
  templateUrl: 'home.component.html'
})
export class HomeComponent  {

  record_personal: Personal= {
    id: 0,curp: '', rfc: '',  homoclave: '',
    state: '', nombre: '', apellidopaterno: '', apellidomaterno:'',id_catestadocivil:0,
    fechanacimiento: null, id_catestadosnaci: 0, id_catmunicipiosnaci: 0, id_catlocalidadesnaci: 0,
    id_archivos_avatar:0,id_usuarios_sistema:0,numeemp:'',
    telefono: '', email: '', emailoficial:'',observaciones:'',sexo:0,
    id_catestadosresi: 0, id_catmunicipiosresi: 0, id_catlocalidadesresi: 0,
    domicilio:'',colonia:'',cp:'',telefonomovil:'',numimss:'',numissste:'',otronombre:'', numotro:'',tipopension:'',
    created_at: new Date(),  updated_at: new Date(), id_usuarios_r: 0,fechaingreso:null,primaantiguedad:0,
    id_catbanco_deposito:0,cuentadeposito:'',formacobro:0,
  };

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

  ngOnInit(): void {
    // generate random values for mainChart
  }

  onErrorImage(i){
    this.images[i]=0;
    if(this.images[0]==0 && this.images[1]==0 && this.images[2]==0
      && this.images[3]==0 && this.images[4]==0 && this.images[5]==0)
      this.imageDefault=true;
  }

  openModal(id: string) {
    this.homeService.open(id);
  }

  closeModal(id: string) {
    this.homeService.close(id);
  }

}
