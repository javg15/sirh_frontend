import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';

import { HomeService } from '../services/home.service';
import { CatplantelesService } from '../../catalogos/catplanteles/services/catplanteles.service';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Catplanteles } from '../../../_models';
import { titulosModal } from '../../../../environments/environment';
import { Observable } from 'rxjs';

import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-maps-form',
  templateUrl: './maps-form.component.html',
  styleUrls: ['./maps-form.component.css']
})

export class MapsFormComponent implements OnInit, OnDestroy {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow
  
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() id: string; //idModal
  tituloForm: string;
  @ViewChild('basicModal') basicModal: ModalDirective;

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

  private elementModal: any;
  
  catplantelesCat:Catplanteles[];

  constructor(private el: ElementRef,
      private homeService: HomeService,
      private catplantelesSvc: CatplantelesService,

      ) {
      this.elementModal = el.nativeElement;
      this.catplantelesSvc.getCatalogo().subscribe(resp => {
        this.catplantelesCat = resp;
      });
  }

  ngOnInit(): void {


      let modal = this;

      // ensure id attribute exists
      if (!modal.id) {//idModal {
          console.error('modal must have an id');
          return;
      }

          // generate random values for mainChart
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })


      // add self (this modal instance) to the modal service so it's accessible from controllers
      modal.homeService.add(modal);

  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.homeService.remove(this.id); //idModal
      this.elementModal.remove();
  }


  // open modal
  open(idItem: string, accion: string,id_plantillasdocsnombramiento_actual:number,id_estatus:number):  void {

    this.tituloForm="Localización de Planteles";

    // console.log($('#modalTest').html()); poner el id a algun elemento para testear
    this.basicModal.show();
  }

  // close modal
  close(): void {
      this.basicModal.hide();
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
