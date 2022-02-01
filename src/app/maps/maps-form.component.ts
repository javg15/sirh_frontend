import { Component, ElementRef, Input, OnInit, ViewChild, Output, EventEmitter,Renderer2 } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { CatplantelesService } from '../views/catalogos/catplanteles/services/catplanteles.service';
import { CatzonageograficaService } from '../views/catalogos/catzonageografica/services/catzonageografica.service';
import { PersonalService } from '../views/catalogos/personal/services/personal.service';

import { Catplanteles,Catzonageografica,Personal } from '../_models';
import { Observable } from 'rxjs';
import { LoginModalService } from '../views/_shared/login/services/login-modal.service';
import { TokenStorageService } from '../_services/token-storage.service';

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
  private ui?:any;

  @ViewChild('errorModal') public errorModal: ModalDirective;

  isLoggedIn = false;

  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() id: string; //idModal
  tituloForm: string;

  bg_color:any={"email":"white","telefono":"white","dir":[
    {"email_dir":"white","tel_dir":"white","telmov_dir":"white"},
    {"email_dir":"white","tel_dir":"white","telmov_dir":"white"},
    {"email_dir":"white","tel_dir":"white","telmov_dir":"white"},
    {"email_dir":"white","tel_dir":"white","telmov_dir":"white"},
    {"email_dir":"white","tel_dir":"white","telmov_dir":"white"},
  ]}

  errors: string[] = [];

  catzonageograficaCat:Catzonageografica[];
  catplantelesCat:Catplanteles[];
  catplantelesComboCat:Catplanteles[];
  record_id_catzonageografica:number=0;
  record_id_catplanteles:number=0;
  record_plantel:Catplanteles;
  record_personal:Personal;

  params={mostrarInfo:0
    ,record_plantel:{id:0,clave_zona:"",clave_plantel:"",ubicacion:"",tipoplantel:"",aniocreacion:"",municipio:"",clavectse:"",telefono:"",email:"",
      directivos:[{
        id:0,persona:"",telefonomovil:"",email:"",plazacategoria:"",funcion:""
      }]
    }
  };


  zoom: number=7;
  lat: number=17.9613981;
  lng: number=-94.7352529;

  constructor(private el: ElementRef,
      private catplantelesSvc: CatplantelesService,
      private CatzonageograficaSvc: CatzonageograficaService,
      private loginModalSvc: LoginModalService,
      private tokenStorage: TokenStorageService,
      private personalSvc: PersonalService,
      private renderer: Renderer2
      ) {
        this.catplantelesSvc.getCatalogoOpen(0,0).subscribe(resp => {
          this.catplantelesComboCat = resp;
        });
        this.CatzonageograficaSvc.getCatalogoOpen().subscribe(resp => {
          this.catzonageograficaCat = resp;
        });
  }

  openModal(id: string) {
    this.onLogin()
    if(!this.isLoggedIn)
      this.loginModalSvc.open(id);
  }

  closeModal(id: string) {
    this.loginModalSvc.close(id);
  }

  submitPlantel(ctrl:any){

      this.catplantelesSvc.getRecord(this.params.record_plantel.id).subscribe(resp => {
        this.record_plantel=resp
        this.record_plantel.email=this.params.record_plantel.email;
        this.record_plantel.telefono=this.params.record_plantel.telefono;

          let campo="";
          if(ctrl.srcElement.name=="email") campo="email"
          if(ctrl.srcElement.name=="telefono") campo="telefono"

          this.catplantelesSvc.setRecord2(this.record_plantel,campo).subscribe(resp => {
            if (resp.hasOwnProperty('error')) {
              this.bg_color[ctrl.srcElement.name]="#f08080";
                setTimeout(()=>{ this.bg_color[ctrl.srcElement.name]="white"; }, 1000)

                //mostrar el error
                this.errors.length = 0;
                for (var value in resp.message) {
                  //reemplazar el texto del campo [pass] por la etiqueta [Contraseña]
                  this.errors.push(resp.message[value]);
                }
                this.errorModal.show();
                //setTimeout(()=>{ this.errorModal.hide(); }, 2000)

            }
            else if(resp.message=="success"){
                this.bg_color[ctrl.srcElement.name]="lightgreen";
                setTimeout(()=>{ this.bg_color[ctrl.srcElement.name]="white"; }, 1000)
            }
          });

      });

  }

  submitDirectivo(ctrl:any,id:number,idx:number){
      this.personalSvc.getRecord(id).subscribe(resp => {
        this.record_personal = Object.assign({}, resp);

        this.record_personal.emailoficial=this.params.record_plantel.directivos[idx].email;
        this.record_personal.telefonomovil=this.params.record_plantel.directivos[idx].telefonomovil;


          let campo="";
          if(ctrl.srcElement.name=="email_dir") campo="emailoficial"
          if(ctrl.srcElement.name=="telmov_dir") campo="telefonomovil"
          if(ctrl.srcElement.name=="tel_dir") campo="telefono"

          this.personalSvc.setRecord2(this.record_personal,campo).subscribe(resp => {
            if (resp.hasOwnProperty('error')) {
              this.bg_color.dir[idx][ctrl.srcElement.name]="#f08080";
                  setTimeout(()=>{ this.bg_color.dir[idx][ctrl.srcElement.name]="white"; }, 1000)

                //mostrar el error
              this.errors.length = 0;
              for (var value in resp.message) {
                //reemplazar el texto del campo [pass] por la etiqueta [Contraseña]
                this.errors.push(resp.message[value]);
              }
              this.errorModal.show();
              //setTimeout(()=>{ this.errorModal.hide(); }, 2000)
            }
            else if(resp.message=="success"){
                this.bg_color.dir[idx][ctrl.srcElement.name]="lightgreen";
                setTimeout(()=>{ this.bg_color.dir[idx][ctrl.srcElement.name]="white"; }, 1000)
            }
          });

      });

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
      map.getViewPort().setPadding(50, 50, 50, 50)

      // MapEvents enables the event system
      // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
      var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // Create the default UI:
      const ui = H.ui.UI.createDefault(map, layers, 'es-ES');
      this.ui=ui;
      // Move UI elements to the top left of the map
      var mapSettings = this.ui.getControl('mapsettings');
      var zoom = this.ui.getControl('zoom');
      var scalebar = this.ui.getControl('scalebar');

      mapSettings.setAlignment(H.ui.LayoutAlignment.TOP_LEFT);
      zoom.setAlignment(H.ui.LayoutAlignment.TOP_LEFT);
      scalebar.setAlignment(H.ui.LayoutAlignment.TOP_LEFT);


      this.updateData(ui,this.params)

    }
  }

  onSelectRegion(valor:any){
    if(valor==0 || valor==null){
      this.catplantelesComboCat = this.catplantelesCat
      this.record_id_catzonageografica=0;
    }
    else{
      this.catplantelesComboCat = this.catplantelesCat.filter(a=>a.id_catregion==valor);
      this.record_id_catzonageografica=valor;
    }
    this.onClickBuscar()
  }

  onSelectPlantel(valor:any){

    if(valor==null) this.record_id_catplanteles=0
    else this.record_id_catplanteles=valor;

    this.onClickBuscar()
  }

  onClickBuscar(){
    this.map.removeObjects(this.map.getObjects ())
    this.params.mostrarInfo=0;
    this.updateData(this.ui,this.params);
  }

  onLogin(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  updateData(ui,params){
    this.catplantelesSvc.getCatalogoOpen(this.record_id_catzonageografica,this.record_id_catplanteles).subscribe(resp => {
      this.catplantelesCat = resp;

      var group = new H.map.Group();

      this.map.addObject(group);

      // add 'tap' event listener, that opens info bubble, to the group
      group.addEventListener('tap', function (evt) {
        // event target is the marker itself, group is a parent event target
        // for all objects that it contains
        params.mostrarInfo=1;

        /*var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
          // read custom data
          content: evt.target.getData()
        });
        // show info bubble
        ui.addBubble(bubble);*/
        let record= evt.target.getData();
        params.record_plantel=record;
        /*if(record.directivos.find(a=>a.funcion.toLowerCase()=="director")!=typeof undefined)
          params.record_plantel_director=record.directivos.find(a=>a.funcion.toLowerCase()=="director").persona
        if(record.directivos.find(a=>a.funcion.toLowerCase()=="subdirector académico")==typeof undefined)
          params.record_plantel_subdirector1=record.directivos.find(a=>a.funcion.toLowerCase()=="subdirector académico").persona
        if(record.directivos.find(a=>a.funcion.toLowerCase()=="subdirector administrativo")==typeof undefined)
          params.record_plantel_subdirector2=record.directivos.find(a=>a.funcion.toLowerCase()=="subdirector administrativo").persona*/
      }, false);

      this.catplantelesCat.forEach( (element) => {

        /*html='<div style="width: 300px"><span style="font-size:8px;font-weight:bold">' + element.ubicacion + ' - ' + element.tipoplantel +'</span></div>';
        html+='<table style="border: hidden;"><thead><tr><th style="font-size:10px;">Persona</th><th style="font-size:10px;">Función</th></tr></thead>';
          html+='<tbody style="border: hidden">';
        for(let i=0; i<nombramientos.length;i++)//en este caso en 'descripcion' se guardan los nombramientos
          html+='<tr style="border: hidden"><td  style="border: solid 1px;font-size:10px;padding:2px">' + nombramientos[i].persona + '</td><td  style="border: solid 1px;font-size:10px;padding:2px">' + nombramientos[i].funcion + '</td></tr>';
        html+='</tbody></table>';*/

        this.addMarkerToGroup(group, {lat: parseFloat(element.latitud), lng: parseFloat(element.longitud)},element);
      });


      if((this.record_id_catplanteles==0 || this.record_id_catplanteles==null)
        && (this.record_id_catzonageografica==0 || this.record_id_catzonageografica==null)){
        this.map.setCenter({lat: 19.5426, lng: -96.9137});//xalapa
        this.map.setZoom(7);
      }
      else{
        this.map.setCenter({lat:parseFloat(this.catplantelesCat[0].latitud), lng: parseFloat(this.catplantelesCat[0].longitud)});//xalapa
        this.map.setZoom(9);
      }

    });
  }

  /**
 * Creates a new marker and adds it to a group
 * @param {H.map.Group} group       The group holding the new marker
 * @param {H.geo.Point} coordinate  The location of the marker
 * @param {String} html             Data associated with the marker
 */
  addMarkerToGroup(group: H.map.Group, coordinate, record: any) {
    // Define a variable holding SVG mark-up that defines an icon image:
    var svgMarkup="";
    if(record.tipoplantel=="A")
      svgMarkup= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMXSURBVDhPTVPbS1RBGD8zc457ZneP6+6qYCE9CBZJF4pQLKOb3SwQi/APSCjwrYISxHyRHoLoqfCptx58KBN6EAN9kAJDMrUlLdE0g9y11c5ezmVm+h2T6MDst/Od+X6Xb75DtP8epWnkPudVDufXdNu+pHR9j0YIVVIWme9PeZb1KuS6Q722nd4u0f4B9FRUREWx2EHy+W4qRFwytkmUKgjOMyyftxSlFcibUteXRTR6sy+bfY0yxYLiO8mkRW37JS0UboDR9zmfIIRkiBA7qetGRElJQaN0SIRCc9T3DzLHaW+orFwZz+U+kEB2V1lZt7Gx0asMYwlM88R1GyH/BdZcQABmqnleC8CrZCRyi+bzT6HOci2rjdwtL681stkpTSkXBTPU82ogc5RIeQYKqCJEAoNrjA1rvp+DkqMiFrsNxf0g/EbRrE7IMoNi4nl7ha6/gewLKJyGujUAZXBwDIx1OGNC4RIpFA5v1tQ0OInEVQr0k2hYThpGTJaUTDDPuyJDoXGA1qPgJ2T/AuB5j/MxqDtOpXzLisWzdanU4sPl5a8UxQlIlVBSDXkpMOnUcQzYmAT7IezrsQje8aAdQc9gl61u3yDFrwKLBJuDvcQBDcXIyFrkN7DPgmRBz+X2wco01gFhmiteOHz6L4DnLQDdRPIblOxWjH0HaBxrHSARxAwY4zgbwkDNQF0TrDTphUJnoIY1xuNxoF8EqwOvdWDox7VdRrM+IjcowQYlo1QpCoJ25D7DUsIvLZ0dsaxTpIfzHdLzZsFm4QYyTAgOyc8wTi1o2K5tWwwWFyWl79DkFt803+vF4gkRDq+xUd+3R6LRTbCfQwEHgw2Jx8D6BbcxCOAByfk8VCn8b1amOYn3R2DN8GOx64j4DtALPxrtwMw/ht8QFNgAWMXwJOE57IfDacTfmmFw4jjVKBIY90d9uVzXFkDwBA25l0g0ox89UNMYpDBMAn6DqBCN4DoxL/MumBfS6fEBAAWDtPUAST1YXx/Gh9LkJZOBvyfBdGK4UoifcDvPi4lEG+Tv/9HamgmKNU3T/gBqE68Cin/2/gAAAABJRU5ErkJggg==';
    if(record.tipoplantel=="B")
      svgMarkup= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAKeNQKeNQaiORaiPRqiQRaiQR6qRSKmQSaiQSqqSTKqSTaqUTqyVTa2VTqyVT66WT6qTUKmTUquVU6uVVayVUKyVUayVU62WUq6XU6+XVK+ZVK6YV66aWq+aW7CZVLGZVbCZV7CaVrKcXLGdXbKdXrOeXrOeX7SfXrSfX66ea7KdYLKeYbGeY7KfZLGfZrOgZbagYLSgYrShZ7ejZrWiZ7KgabGhbbWia7SibLelb7ilarila7qnbbqnbrunb7OjcrakcbSldLepfrimcLimcbuocLqocr2rdL6rdbmpeLmperiqfL2seL6ter+ue7+ufcCtdsKwe8KxfsCwf7irgrqsgLyugLyugb2ugr6vg7yuhb6wh7+zi7+0k8GxgMKxgcCyhsO0h8CyiMG0i8W2icW2i8S3jce4isa4jse5j8O4lMK4mMW6mcm7ksm8ksm8lsu+lMy9kc2/lcy+lsi9ncu/nM/Bl8/BmM7AmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGyIvn8AAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGnRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xMDD0cqEAAADkSURBVChTNc9lWwJhEIXhHSxcwF5dA7u7WwEBsQVbsRW7a/XXP777Xno+zXV/ODNjoHNdKrXPetLQLf6OgdZ8GfkDr7X1uJi65M4X0JBbfd9wozx5SJGpIM9a6yJml9fBNOa2gSSrKACHUU7djgvfcWaS5pMNoZ6UgpKWBLaz1yP/IO0L2O/7vdL4OcuVgmV/mAmCS866yWDkFeNbptoI8HH0w8xBv3tHTmXkgcLE205F5iVek23wJMVjw2ofrA7Ny5e6dFOs6HhfKBzfnZMV/cttlidYlu5s8sq52+HmTFQ8aYBfiaN+EZ9Msl0AAAAASUVORK5CYII=';
    if(record.tipoplantel=="C")
      svgMarkup= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAAM+MwQ/NApDOAtEOgxFOg1FOw1GOw5HPBFIPRNIPxJKPxVLQRVLQhdMQxhNQxhOQxlORBpORRtPRh1QRhxRRx5RSB1SSB5TSR9TSiJTSiFUSyNVTCdYTydYUClaUSpaUitbUytcUyxdVC5eVS5fVjFgVzFgWDVhWTZjWzZkWzllXTlmXj1nYDxpYD5pYj9sY0FqYkNqY0BsZEFtZUNtZkVtZURvZ0ZvaEZwaEdxaUhwaUlyakhza0t1bUxya052b1B2cFF4cVJ6c1V6c1d7dFZ8dVZ9dlt9d1h+d1l/eFx/eV2Ael6Be2CAemODfWOFfmKGf2SFf2WGgGSHgWeIgWaJg2iKg2qKhGuMhm2Nh22OiG6QinCQi3OTjXeRjXeTjnSUjnaVj3aWkHiXkX2Xk3mYkn6Yk4CcloOcmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD3YhVwAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGnRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xMDD0cqEAAADkSURBVChTNc97NwJhEAbwnSiytdi8pBTaECK5VbpaRBf3bkoubW7f/wM8Zt9Tz19zfjNnzowCmZdFWu3LSsImacZGZIbiI5jWK1/5Qgc9j1eCy/8RbLGXnzGrMkzpZhQp4fMDCah3Cqi8BA2wsIeqvaPpeW+cYL1yQVhGgWEhkoGw6jEaAxk5iM/6NgX/jtBmuNSySCJ8bpkqttJvUIa0b8CLQecbB7c7PIFJkf3B3NlrTTQG6RWngj7Nn3KHU4qn6JcvvSb9JrF7nMvUinQlf+lOOEKB+8M1Nz3aO+w8EMfxBAD/RIB5pVcpiJUAAAAASUVORK5CYII=';
    if(record.tipoplantel=="EMSAD")
      svgMarkup= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAE8GNFAHNVAINVMNOVQOO1UQPFYRPVcUPlkVQFgWQFoYQlsYQ1waQ1waRF0dRF0dRV8eR18fSF4gR18gSF8hSWAfSGAgSWIhSmIiSmMiS2IkS2MkTGQmTWYqUGgsUmktU2ouU2otVGsuVWwxVm0wV200WG40WW43Wm84W3E4XHM7X3E8XnM8X3U/YXc/YnNAYHVBYnZDY3VGZHdHZnhCZHlDZXlEZnlGZntGaHtIaHtIaXtKaXpMaXxIaX1Kan5Ka39LbHxOa3xObIFNboJQcIFTcINXc4RTcoZUc4VYdYZYdoZeeIhYdohaeIpbeYheeohgeYlgeopge4hie4xlfo5kf41mf49ogJFmgpBpgpNohJNqhJJshJJthZVthpZviJdviZpwippyi5x1jp12j5h5jZp4jp14j554kJ94kZ5/lKB5kqB7k52Bk6KCl6KEmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHSIQZkAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGnRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xMDD0cqEAAADpSURBVChTNc/pNwJhFAbwuVo0LWOMZEmFocgSCWUiSxhDmxiyJ6Kx1P//5fHOe/R8uud3z3nOvQJ4nkcp1uIThzhJ6vysl5b+YVAufx0UH9H0+Tm4Jz6m7pmf30ISGbhlfQ47yvA4kIJ4JYCMMQQAC2uo2B13vnYji5nyGWESRQYj03tQrMsF6gOp+1De64sU7m3hgcGptIs0oieW7kVCe4PwTasq/Og8/WCznrTvcIXyv5AKr7Vg41OLuAS0aCjDNizHKznqsktLJF+sL28fatUjMvgvL86BaPh6I+Yh0+6wYxKL4wYA/gDrWXsKMkSIlgAAAABJRU5ErkJggg==';

    // Create an icon, an object holding the latitude and longitude, and a marker:
    var icon = new H.map.Icon(svgMarkup);

    var marker = new H.map.Marker(coordinate,{icon: icon,data:""});
    // add custom data to the marker
    marker.setData(record);
    group.addObject(marker);
  }




}
