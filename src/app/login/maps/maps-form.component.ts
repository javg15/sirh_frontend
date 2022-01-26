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
            '<div style="width: 150px"><span style="font-size:8px;font-weight:bold">' + element.ubicacion + '</span></div>' +
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
    var svgMarkup = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMXSURBVDhPTVPbS1RBGD8zc457ZneP6+6qYCE9CBZJF4pQLKOb3SwQi/APSCjwrYISxHyRHoLoqfCptx58KBN6EAN9kAJDMrUlLdE0g9y11c5ezmVm+h2T6MDst/Od+X6Xb75DtP8epWnkPudVDufXdNu+pHR9j0YIVVIWme9PeZb1KuS6Q722nd4u0f4B9FRUREWx2EHy+W4qRFwytkmUKgjOMyyftxSlFcibUteXRTR6sy+bfY0yxYLiO8mkRW37JS0UboDR9zmfIIRkiBA7qetGRElJQaN0SIRCc9T3DzLHaW+orFwZz+U+kEB2V1lZt7Gx0asMYwlM88R1GyH/BdZcQABmqnleC8CrZCRyi+bzT6HOci2rjdwtL681stkpTSkXBTPU82ogc5RIeQYKqCJEAoNrjA1rvp+DkqMiFrsNxf0g/EbRrE7IMoNi4nl7ha6/gewLKJyGujUAZXBwDIx1OGNC4RIpFA5v1tQ0OInEVQr0k2hYThpGTJaUTDDPuyJDoXGA1qPgJ2T/AuB5j/MxqDtOpXzLisWzdanU4sPl5a8UxQlIlVBSDXkpMOnUcQzYmAT7IezrsQje8aAdQc9gl61u3yDFrwKLBJuDvcQBDcXIyFrkN7DPgmRBz+X2wco01gFhmiteOHz6L4DnLQDdRPIblOxWjH0HaBxrHSARxAwY4zgbwkDNQF0TrDTphUJnoIY1xuNxoF8EqwOvdWDox7VdRrM+IjcowQYlo1QpCoJ25D7DUsIvLZ0dsaxTpIfzHdLzZsFm4QYyTAgOyc8wTi1o2K5tWwwWFyWl79DkFt803+vF4gkRDq+xUd+3R6LRTbCfQwEHgw2Jx8D6BbcxCOAByfk8VCn8b1amOYn3R2DN8GOx64j4DtALPxrtwMw/ht8QFNgAWMXwJOE57IfDacTfmmFw4jjVKBIY90d9uVzXFkDwBA25l0g0ox89UNMYpDBMAn6DqBCN4DoxL/MumBfS6fEBAAWDtPUAST1YXx/Gh9LkJZOBvyfBdGK4UoifcDvPi4lEG+Tv/9HamgmKNU3T/gBqE68Cin/2/gAAAABJRU5ErkJggg==';

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
