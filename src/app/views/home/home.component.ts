import { Component, OnInit, ViewChild } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Router } from '@angular/router';

import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'


import { Personal } from '../../_models';
import { PersonalService } from '../catalogos/personal/services/personal.service';
@Component({
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow

  record_personal: Personal;

  usuario:any=this.tokenStorage.getUser();
  images=[1,1,1,1,1,1];
  imageDefault:boolean=false;
  imageAvatar:any;
  imageAvatar1:any;imageAvatar2:any;imageAvatar3:any;
  imageAvatar4:any;imageAvatar5:any;imageAvatar6:any;


  zoom = 12
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid',
    maxZoom: 15,
    minZoom: 8,
  }
  markers = []
  infoContent = ''


  constructor(private tokenStorage: TokenStorageService,
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
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }

  onErrorImage(i){
    this.images[i]=0;
    if(this.images[0]==0 && this.images[1]==0 && this.images[2]==0
      && this.images[3]==0 && this.images[4]==0 && this.images[5]==0)
      this.imageDefault=true;
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
  }

  click(event: google.maps.MouseEvent) {
    console.log(event)
  }

  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()))
  }

  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    })
  }

  openInfo(marker: MapMarker, content) {
    this.infoContent = content
    this.info.open(marker)
  }
}
