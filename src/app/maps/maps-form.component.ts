import { Component, ElementRef, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

import { MapsService } from './services/maps.service';
import { CatplantelesService } from '../views/catalogos/catplanteles/services/catplanteles.service';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Catplanteles } from '../_models';
import { titulosModal } from '../../environments/environment';
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

export class MapsFormComponent implements OnInit {

  private map?: H.Map;
  @ViewChild('map') mapDiv?: ElementRef;

  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() id: string; //idModal
  tituloForm: string;
  
  catplantelesCat:Catplanteles[];
  zoom: number=7;
  lat: number=17.9613981;
  lng: number=-94.7352529;

  constructor(private el: ElementRef,
      private mapsService: MapsService,
      private catplantelesSvc: CatplantelesService,

      ) {
  }

  ngOnInit(): void {


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
          let html="";
          let nombramientos:any=element.descripcion;
          
          html='<div style="width: 300px"><span style="font-size:8px;font-weight:bold">' + element.ubicacion + ' - ' + element.tipoplantel +'</span></div>';
          html+='<table style="border: hidden;"><thead><tr><th style="font-size:10px;">Persona</th><th style="font-size:10px;">Función</th></tr></thead>';
            html+='<tbody style="border: hidden">';
          for(let i=0; i<nombramientos.length;i++)//en este caso en 'descripcion' se guardan los nombramientos
            html+='<tr style="border: hidden"><td  style="border: solid 1px;font-size:10px;padding:2px">' + nombramientos[i].persona + '</td><td  style="border: solid 1px;font-size:10px;padding:2px">' + nombramientos[i].funcion + '</td></tr>';
          html+='</tbody></table>';

          this.addMarkerToGroup(group, {lat: parseFloat(element.latitud), lng: parseFloat(element.longitud)},
            html,element.tipoplantel);
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
  addMarkerToGroup(group: H.map.Group, coordinate, html: string, tipo:string) {
    // Define a variable holding SVG mark-up that defines an icon image:
    var svgMarkup="";
    if(tipo=="A")
      svgMarkup= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMXSURBVDhPTVPbS1RBGD8zc457ZneP6+6qYCE9CBZJF4pQLKOb3SwQi/APSCjwrYISxHyRHoLoqfCptx58KBN6EAN9kAJDMrUlLdE0g9y11c5ezmVm+h2T6MDst/Od+X6Xb75DtP8epWnkPudVDufXdNu+pHR9j0YIVVIWme9PeZb1KuS6Q722nd4u0f4B9FRUREWx2EHy+W4qRFwytkmUKgjOMyyftxSlFcibUteXRTR6sy+bfY0yxYLiO8mkRW37JS0UboDR9zmfIIRkiBA7qetGRElJQaN0SIRCc9T3DzLHaW+orFwZz+U+kEB2V1lZt7Gx0asMYwlM88R1GyH/BdZcQABmqnleC8CrZCRyi+bzT6HOci2rjdwtL681stkpTSkXBTPU82ogc5RIeQYKqCJEAoNrjA1rvp+DkqMiFrsNxf0g/EbRrE7IMoNi4nl7ha6/gewLKJyGujUAZXBwDIx1OGNC4RIpFA5v1tQ0OInEVQr0k2hYThpGTJaUTDDPuyJDoXGA1qPgJ2T/AuB5j/MxqDtOpXzLisWzdanU4sPl5a8UxQlIlVBSDXkpMOnUcQzYmAT7IezrsQje8aAdQc9gl61u3yDFrwKLBJuDvcQBDcXIyFrkN7DPgmRBz+X2wco01gFhmiteOHz6L4DnLQDdRPIblOxWjH0HaBxrHSARxAwY4zgbwkDNQF0TrDTphUJnoIY1xuNxoF8EqwOvdWDox7VdRrM+IjcowQYlo1QpCoJ25D7DUsIvLZ0dsaxTpIfzHdLzZsFm4QYyTAgOyc8wTi1o2K5tWwwWFyWl79DkFt803+vF4gkRDq+xUd+3R6LRTbCfQwEHgw2Jx8D6BbcxCOAByfk8VCn8b1amOYn3R2DN8GOx64j4DtALPxrtwMw/ht8QFNgAWMXwJOE57IfDacTfmmFw4jjVKBIY90d9uVzXFkDwBA25l0g0ox89UNMYpDBMAn6DqBCN4DoxL/MumBfS6fEBAAWDtPUAST1YXx/Gh9LkJZOBvyfBdGK4UoifcDvPi4lEG+Tv/9HamgmKNU3T/gBqE68Cin/2/gAAAABJRU5ErkJggg==';
    if(tipo=="B")
      svgMarkup= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAKeNQKeNQaiORaiPRqiQRaiQR6qRSKmQSaiQSqqSTKqSTaqUTqyVTa2VTqyVT66WT6qTUKmTUquVU6uVVayVUKyVUayVU62WUq6XU6+XVK+ZVK6YV66aWq+aW7CZVLGZVbCZV7CaVrKcXLGdXbKdXrOeXrOeX7SfXrSfX66ea7KdYLKeYbGeY7KfZLGfZrOgZbagYLSgYrShZ7ejZrWiZ7KgabGhbbWia7SibLelb7ilarila7qnbbqnbrunb7OjcrakcbSldLepfrimcLimcbuocLqocr2rdL6rdbmpeLmperiqfL2seL6ter+ue7+ufcCtdsKwe8KxfsCwf7irgrqsgLyugLyugb2ugr6vg7yuhb6wh7+zi7+0k8GxgMKxgcCyhsO0h8CyiMG0i8W2icW2i8S3jce4isa4jse5j8O4lMK4mMW6mcm7ksm8ksm8lsu+lMy9kc2/lcy+lsi9ncu/nM/Bl8/BmM7AmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGyIvn8AAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGnRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xMDD0cqEAAADkSURBVChTNc9lWwJhEIXhHSxcwF5dA7u7WwEBsQVbsRW7a/XXP777Xno+zXV/ODNjoHNdKrXPetLQLf6OgdZ8GfkDr7X1uJi65M4X0JBbfd9wozx5SJGpIM9a6yJml9fBNOa2gSSrKACHUU7djgvfcWaS5pMNoZ6UgpKWBLaz1yP/IO0L2O/7vdL4OcuVgmV/mAmCS866yWDkFeNbptoI8HH0w8xBv3tHTmXkgcLE205F5iVek23wJMVjw2ofrA7Ny5e6dFOs6HhfKBzfnZMV/cttlidYlu5s8sq52+HmTFQ8aYBfiaN+EZ9Msl0AAAAASUVORK5CYII=';
    if(tipo=="C")
      svgMarkup= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAAM+MwQ/NApDOAtEOgxFOg1FOw1GOw5HPBFIPRNIPxJKPxVLQRVLQhdMQxhNQxhOQxlORBpORRtPRh1QRhxRRx5RSB1SSB5TSR9TSiJTSiFUSyNVTCdYTydYUClaUSpaUitbUytcUyxdVC5eVS5fVjFgVzFgWDVhWTZjWzZkWzllXTlmXj1nYDxpYD5pYj9sY0FqYkNqY0BsZEFtZUNtZkVtZURvZ0ZvaEZwaEdxaUhwaUlyakhza0t1bUxya052b1B2cFF4cVJ6c1V6c1d7dFZ8dVZ9dlt9d1h+d1l/eFx/eV2Ael6Be2CAemODfWOFfmKGf2SFf2WGgGSHgWeIgWaJg2iKg2qKhGuMhm2Nh22OiG6QinCQi3OTjXeRjXeTjnSUjnaVj3aWkHiXkX2Xk3mYkn6Yk4CcloOcmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD3YhVwAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGnRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xMDD0cqEAAADkSURBVChTNc97NwJhEAbwnSiytdi8pBTaECK5VbpaRBf3bkoubW7f/wM8Zt9Tz19zfjNnzowCmZdFWu3LSsImacZGZIbiI5jWK1/5Qgc9j1eCy/8RbLGXnzGrMkzpZhQp4fMDCah3Cqi8BA2wsIeqvaPpeW+cYL1yQVhGgWEhkoGw6jEaAxk5iM/6NgX/jtBmuNSySCJ8bpkqttJvUIa0b8CLQecbB7c7PIFJkf3B3NlrTTQG6RWngj7Nn3KHU4qn6JcvvSb9JrF7nMvUinQlf+lOOEKB+8M1Nz3aO+w8EMfxBAD/RIB5pVcpiJUAAAAASUVORK5CYII=';

    // Create an icon, an object holding the latitude and longitude, and a marker:
    var icon = new H.map.Icon(svgMarkup);

    var marker = new H.map.Marker(coordinate,{icon: icon,data:""});
    // add custom data to the marker
    marker.setData(html);
    group.addObject(marker);
  }



}
