import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';

import { HomeService } from '../services/home.service';
import { CatplantelesService } from '../../catalogos/catplanteles/services/catplanteles.service';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Catplanteles } from '../../../_models';
import { titulosModal } from '../../../../environments/environment';
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

  private map?: H.Map;
  @ViewChild('map') mapDiv?: ElementRef;

  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() id: string; //idModal
  tituloForm: string;
  @ViewChild('basicModal') basicModal: ModalDirective;

  private elementModal: any;

  catplantelesCat:Catplanteles[];
  zoom: number=2;
  lat: number=0;
  lng: number=0;

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
      // add self (this modal instance) to the modal service so it's accessible from controllers
      modal.homeService.add(modal);

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

      // Create an info bubble object at a specific geographic location:
      var bubble = new H.ui.InfoBubble({ lng: 13.4, lat: 52.51 }, {
        content: '<b>Hello World!</b>'
      });

      // Add info bubble to the UI:
      ui.addBubble(bubble);
    }
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
