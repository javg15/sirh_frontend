import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';

import { LoginService } from '../services/login.service';
import { CatplantelesService } from '../../views/catalogos/catplanteles/services/catplanteles.service';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Catplanteles } from '../../_models';
import { titulosModal } from '../../../environments/environment';
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

      // Move UI elements to the top left of the map
      var mapSettings = ui.getControl('mapsettings');
      var zoom = ui.getControl('zoom');
      var scalebar = ui.getControl('scalebar');

      mapSettings.setAlignment(H.ui.LayoutAlignment.TOP_LEFT);
      zoom.setAlignment(H.ui.LayoutAlignment.TOP_LEFT);
      scalebar.setAlignment(H.ui.LayoutAlignment.TOP_LEFT);

      this.catplantelesSvc.getCatalogoJSON().subscribe(resp => {
        this.catplantelesCat = resp;

        var group = new H.map.Group();

        map.addObject(group);

        // add 'tap' event listener, that opens info bubble, to the group
        group.addEventListener('tap', function (evt) {
          // event target is the marker itself, group is a parent event target
          // for all objects that it contains
          var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
            // read custom data
            content: evt.target.getData()
          });
          // show info bubble
          ui.addBubble(bubble);
        }, false);

        this.catplantelesCat.forEach( (element) => {
          this.addMarkerToGroup(group, {lat: parseFloat(element.latitud), lng: parseFloat(element.longitud)},
            '<div style="width: 300px"><span style="font-size:8px;font-weight:bold">' + element.ubicacion + '</span></div>' +
            '<div><span style="font-size:8px;">' + element.domicilio + '</span></div>');
        });

        map.setCenter({lat: 19.5426, lng: -96.9137});//xalapa
      });

    }
  }

  /**
 * Creates a new marker and adds it to a group
 * @param {H.map.Group} group       The group holding the new marker
 * @param {H.geo.Point} coordinate  The location of the marker
 * @param {String} html             Data associated with the marker
 */
  addMarkerToGroup(group: H.map.Group, coordinate, html: string) {
    // Define a variable holding SVG mark-up that defines an icon image:
    var svgMarkup = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAALNSURBVDhPXZNLSFRRGMfPOXd0HmUTRplREgihQi4SkmgRQQ+tcFHYwrKZGDSQzCh7QI9BcGEL3UwyIDpmSQshiGhXEBEZhQ2MGiX02FgZFr1MmGnuOf3OXRR04Mz3+v//3/fde0eK/05ra2soa8x2I0QDYaU0xsEuGCkzSojbRYHA80QikfXAnL8CjY2NTiAcrldS9hBWGWM+CSnn8OcBrSUuxV/GfaS1Pj6aSk3jC6su4vG4byGXuwzwqpRSQ+zGPqMUsh0gP+cmlVITxAewkeqamvRkOv3Wm+BILHYY0jDBC4Aj+EelUik3n7/v+Hx5ZUxYC9FGrdAo1a+0HmMlP022ylgsVvxbqSlPScoE7Q6ydwfPoItMOcAc1k++ExuAtAdsL/UHCN5TeaX2klhjRwQUFVqf0lKmvImkvELO2hOQz3EXuVmX7mB2UosrfnZxP1t1SNcYsZsRLxJ30qUM8VWID7PSWeqntTE3WWnfjYGBJ9eHhiZ5M2I9QCtQIbV+jC1zlVoC8SF+PSscww/TJIAtEUr9AB+i5h0rwJuTBnV+xE/299FB89BCdP4KSZG3YuXYcVbcgv/yUHu7faVe8T23GOIcGlX4s4i5ELdhZ4lPgnuFWKdxnF66NRFXq2y2zRNgt3HGWwn4m31VjHTJPhw6RbFvEK5F7J3junUqn+9B6Cn5zT5jJppjsUoZjUbX6YKCScTsFzdDx9eQphE8T26KZebZuxTSRiYcxQZ4LkvB7qb+C6yRkZaWCwRdANIIfARUgO13qDH2oiUxkQuxBeIitphcHdOeIRYiEokETGHhIEEThQ+Qb+FXUFrOJPZbztHoC5PY8ffTqAY75leq2fsvZDKZ/Iby8rs+v99PuANALV2KoM4QT1kRcpuIG7AliPWFg8GOZDKZI/fvMMlqJxgMu65rvzr7d17hFTiQvmPuQOgbGRzM2JQQQvwB9vhOSHRIxbkAAAAASUVORK5CYII=';

    // Create an icon, an object holding the latitude and longitude, and a marker:
    var icon = new H.map.Icon(svgMarkup);

    var marker = new H.map.Marker(coordinate,{icon: icon,data:""});
    // add custom data to the marker
    marker.setData(html);
    group.addObject(marker);
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


}
