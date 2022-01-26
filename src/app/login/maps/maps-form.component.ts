import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';

import { LoginService } from '../services/login.service';
import { CatplantelesService } from '../../views/catalogos/catplanteles/services/catplanteles.service';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Catplanteles } from '../../_models';
import { titulosModal,environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import H from '@here/maps-api-for-javascript';
import onResize from 'simple-element-resize-detector';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-maps-form',
  templateUrl: './maps-form.component.html',
  styleUrls: ['./maps-form.component.css']
})

export class MapsFormComponent implements OnInit, OnDestroy {
  public URL = environment.URL;

  private map?: H.Map;
  @ViewChild('map') mapDiv?: ElementRef;

  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() id: string; //idModal
  tituloForm: string;
  @ViewChild('basicModal') basicModal: ModalDirective;

  private elementModal: any;

  catplantelesCat:Catplanteles[];
  zoom: number=7;
  lat: number=17.9613981;
  lng: number=-94.7352529;

  constructor(private el: ElementRef,
      private loginService: LoginService,
      private catplantelesSvc: CatplantelesService,

      ) {
      this.elementModal = el.nativeElement;

  }

  ngOnInit(): void {

      let modal = this;

      // ensure id attribute exists
      if (!modal.id) {//idModal {
          console.error('modal must have an id');
          return;
      }
      // add self (this modal instance) to the modal service so it's accessible from controllers
      modal.loginService.add(modal);

  }

  ngAfterViewInit(): void {
    if (!this.map && this.mapDiv) {
      // instantiate a platform, default layers and a map as usual
      const platform = new H.service.Platform({
        apikey: 'AMO0y-Nu5tUIBy_b7wuCpu72tGnqIoC2LNbzs3vX7b0'
      });
      const layers = platform.createDefaultLayers();
      const map = new H.Map(
        this.mapDiv.nativeElement,
        layers.vector.normal.map,
        {
          pixelRatio: window.devicePixelRatio,
          center: {lat: this.lat, lng: this.lng},
          zoom: this.zoom,
        },
      );
      onResize(this.mapDiv.nativeElement, () => {
        map.getViewPort().resize();
      });
      this.map = map;

      // MapEvents enables the event system
      // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
      var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // Create the default UI:
      const ui = H.ui.UI.createDefault(map, layers, 'es-ES');

      // Define a variable holding SVG mark-up that defines an icon image:
      var svgMarkup = this.URL + 'assets/img/brand/cobaevico.png';

      // Create an icon, an object holding the latitude and longitude, and a marker:
      var icon = new H.map.Icon(svgMarkup);

      this.catplantelesSvc.getCatalogoJSON().subscribe(resp => {
        this.catplantelesCat = resp;

        this.catplantelesCat.forEach( (element) => {
          let marker = new H.map.Marker({lat: parseFloat(element.latitud), lng: parseFloat(element.longitud)}
            , {icon: icon,data:""});
            // Add the marker to the map and center the map at the location of the marker:
            map.addObject(marker);
        });

        map.setCenter({lat: 19.5426, lng: -96.9137});//xalapa
      });

    }
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.loginService.remove(this.id); //idModal
      this.elementModal.remove();
  }


  // open modal
  open():  void {

    this.tituloForm="Localización de Planteles";

    // console.log($('#modalTest').html()); poner el id a algun elemento para testear
    this.basicModal.show();
  }

  // close modal
  close(): void {
      this.basicModal.hide();
  }

  onChangeInput(event: Event) {
    const target = <HTMLInputElement> event.target;
    if (target) {
      if (target.name === 'zoom') {
        this.zoom = parseFloat(target.value);
        this.map.setZoom(this.zoom);
      }
      if (target.name === 'lat') {
        this.lat = parseFloat(target.value);
        this.map.setCenter({lat: this.lat, lng: this.lng});
      }
      if (target.name === 'lng') {
        this.lng = parseFloat(target.value);
        this.map.setCenter({lat: this.lat, lng: this.lng});
      }
    }
  }

}
