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
  catplantelesMapaCat:Catplanteles[];//para mapa
  catplantelesComboCat:Catplanteles[];//listado completo para combo
  catplantelesComboFilteredCat:Catplanteles[];//listado para combo filtrados
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
      this.catplantelesComboFilteredCat = this.catplantelesComboCat
      this.record_id_catzonageografica=0;
    }
    else{
      this.catplantelesComboFilteredCat = this.catplantelesComboCat.filter(a=>a.id_catzonageografica==valor);
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
      this.catplantelesMapaCat = resp;

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

      if((this.record_id_catplanteles==0 || this.record_id_catplanteles==null)
        && (this.record_id_catzonageografica==0 || this.record_id_catzonageografica==null)){
        this.map.setCenter({lat: 19.5426, lng: -96.9137});//xalapa
        this.zoom=7;
      }
      else{
        this.map.setCenter({lat:parseFloat(this.catplantelesMapaCat[0].latitud), lng: parseFloat(this.catplantelesMapaCat[0].longitud)});//xalapa
        this.zoom=9;
      }

      this.catplantelesMapaCat.forEach( (element) => {

        /*html='<div style="width: 300px"><span style="font-size:8px;font-weight:bold">' + element.ubicacion + ' - ' + element.tipoplantel +'</span></div>';
        html+='<table style="border: hidden;"><thead><tr><th style="font-size:10px;">Persona</th><th style="font-size:10px;">Función</th></tr></thead>';
          html+='<tbody style="border: hidden">';
        for(let i=0; i<nombramientos.length;i++)//en este caso en 'descripcion' se guardan los nombramientos
          html+='<tr style="border: hidden"><td  style="border: solid 1px;font-size:10px;padding:2px">' + nombramientos[i].persona + '</td><td  style="border: solid 1px;font-size:10px;padding:2px">' + nombramientos[i].funcion + '</td></tr>';
        html+='</tbody></table>';*/

        this.addMarkerToGroup(group, {lat: parseFloat(element.latitud), lng: parseFloat(element.longitud)},element);
      });

      this.map.setZoom(this.zoom);
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
    if(this.zoom==7){
      if(record.tipoplantel=="A")
        svgMarkup= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMXSURBVDhPTVPbS1RBGD8zc457ZneP6+6qYCE9CBZJF4pQLKOb3SwQi/APSCjwrYISxHyRHoLoqfCptx58KBN6EAN9kAJDMrUlLdE0g9y11c5ezmVm+h2T6MDst/Od+X6Xb75DtP8epWnkPudVDufXdNu+pHR9j0YIVVIWme9PeZb1KuS6Q722nd4u0f4B9FRUREWx2EHy+W4qRFwytkmUKgjOMyyftxSlFcibUteXRTR6sy+bfY0yxYLiO8mkRW37JS0UboDR9zmfIIRkiBA7qetGRElJQaN0SIRCc9T3DzLHaW+orFwZz+U+kEB2V1lZt7Gx0asMYwlM88R1GyH/BdZcQABmqnleC8CrZCRyi+bzT6HOci2rjdwtL681stkpTSkXBTPU82ogc5RIeQYKqCJEAoNrjA1rvp+DkqMiFrsNxf0g/EbRrE7IMoNi4nl7ha6/gewLKJyGujUAZXBwDIx1OGNC4RIpFA5v1tQ0OInEVQr0k2hYThpGTJaUTDDPuyJDoXGA1qPgJ2T/AuB5j/MxqDtOpXzLisWzdanU4sPl5a8UxQlIlVBSDXkpMOnUcQzYmAT7IezrsQje8aAdQc9gl61u3yDFrwKLBJuDvcQBDcXIyFrkN7DPgmRBz+X2wco01gFhmiteOHz6L4DnLQDdRPIblOxWjH0HaBxrHSARxAwY4zgbwkDNQF0TrDTphUJnoIY1xuNxoF8EqwOvdWDox7VdRrM+IjcowQYlo1QpCoJ25D7DUsIvLZ0dsaxTpIfzHdLzZsFm4QYyTAgOyc8wTi1o2K5tWwwWFyWl79DkFt803+vF4gkRDq+xUd+3R6LRTbCfQwEHgw2Jx8D6BbcxCOAByfk8VCn8b1amOYn3R2DN8GOx64j4DtALPxrtwMw/ht8QFNgAWMXwJOE57IfDacTfmmFw4jjVKBIY90d9uVzXFkDwBA25l0g0ox89UNMYpDBMAn6DqBCN4DoxL/MumBfS6fEBAAWDtPUAST1YXx/Gh9LkJZOBvyfBdGK4UoifcDvPi4lEG+Tv/9HamgmKNU3T/gBqE68Cin/2/gAAAABJRU5ErkJggg==';
      if(record.tipoplantel=="B")
        svgMarkup= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAKeNQKeNQaiORaiPRqiQRaiQR6qRSKmQSaiQSqqSTKqSTaqUTqyVTa2VTqyVT66WT6qTUKmTUquVU6uVVayVUKyVUayVU62WUq6XU6+XVK+ZVK6YV66aWq+aW7CZVLGZVbCZV7CaVrKcXLGdXbKdXrOeXrOeX7SfXrSfX66ea7KdYLKeYbGeY7KfZLGfZrOgZbagYLSgYrShZ7ejZrWiZ7KgabGhbbWia7SibLelb7ilarila7qnbbqnbrunb7OjcrakcbSldLepfrimcLimcbuocLqocr2rdL6rdbmpeLmperiqfL2seL6ter+ue7+ufcCtdsKwe8KxfsCwf7irgrqsgLyugLyugb2ugr6vg7yuhb6wh7+zi7+0k8GxgMKxgcCyhsO0h8CyiMG0i8W2icW2i8S3jce4isa4jse5j8O4lMK4mMW6mcm7ksm8ksm8lsu+lMy9kc2/lcy+lsi9ncu/nM/Bl8/BmM7AmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGyIvn8AAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGnRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xMDD0cqEAAADkSURBVChTNc9lWwJhEIXhHSxcwF5dA7u7WwEBsQVbsRW7a/XXP777Xno+zXV/ODNjoHNdKrXPetLQLf6OgdZ8GfkDr7X1uJi65M4X0JBbfd9wozx5SJGpIM9a6yJml9fBNOa2gSSrKACHUU7djgvfcWaS5pMNoZ6UgpKWBLaz1yP/IO0L2O/7vdL4OcuVgmV/mAmCS866yWDkFeNbptoI8HH0w8xBv3tHTmXkgcLE205F5iVek23wJMVjw2ofrA7Ny5e6dFOs6HhfKBzfnZMV/cttlidYlu5s8sq52+HmTFQ8aYBfiaN+EZ9Msl0AAAAASUVORK5CYII=';
      if(record.tipoplantel=="C")
        svgMarkup= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAAM+MwQ/NApDOAtEOgxFOg1FOw1GOw5HPBFIPRNIPxJKPxVLQRVLQhdMQxhNQxhOQxlORBpORRtPRh1QRhxRRx5RSB1SSB5TSR9TSiJTSiFUSyNVTCdYTydYUClaUSpaUitbUytcUyxdVC5eVS5fVjFgVzFgWDVhWTZjWzZkWzllXTlmXj1nYDxpYD5pYj9sY0FqYkNqY0BsZEFtZUNtZkVtZURvZ0ZvaEZwaEdxaUhwaUlyakhza0t1bUxya052b1B2cFF4cVJ6c1V6c1d7dFZ8dVZ9dlt9d1h+d1l/eFx/eV2Ael6Be2CAemODfWOFfmKGf2SFf2WGgGSHgWeIgWaJg2iKg2qKhGuMhm2Nh22OiG6QinCQi3OTjXeRjXeTjnSUjnaVj3aWkHiXkX2Xk3mYkn6Yk4CcloOcmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD3YhVwAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGnRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xMDD0cqEAAADkSURBVChTNc97NwJhEAbwnSiytdi8pBTaECK5VbpaRBf3bkoubW7f/wM8Zt9Tz19zfjNnzowCmZdFWu3LSsImacZGZIbiI5jWK1/5Qgc9j1eCy/8RbLGXnzGrMkzpZhQp4fMDCah3Cqi8BA2wsIeqvaPpeW+cYL1yQVhGgWEhkoGw6jEaAxk5iM/6NgX/jtBmuNSySCJ8bpkqttJvUIa0b8CLQecbB7c7PIFJkf3B3NlrTTQG6RWngj7Nn3KHU4qn6JcvvSb9JrF7nMvUinQlf+lOOEKB+8M1Nz3aO+w8EMfxBAD/RIB5pVcpiJUAAAAASUVORK5CYII=';
      if(record.tipoplantel=="EMSAD")
        svgMarkup= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAE8GNFAHNVAINVMNOVQOO1UQPFYRPVcUPlkVQFgWQFoYQlsYQ1waQ1waRF0dRF0dRV8eR18fSF4gR18gSF8hSWAfSGAgSWIhSmIiSmMiS2IkS2MkTGQmTWYqUGgsUmktU2ouU2otVGsuVWwxVm0wV200WG40WW43Wm84W3E4XHM7X3E8XnM8X3U/YXc/YnNAYHVBYnZDY3VGZHdHZnhCZHlDZXlEZnlGZntGaHtIaHtIaXtKaXpMaXxIaX1Kan5Ka39LbHxOa3xObIFNboJQcIFTcINXc4RTcoZUc4VYdYZYdoZeeIhYdohaeIpbeYheeohgeYlgeopge4hie4xlfo5kf41mf49ogJFmgpBpgpNohJNqhJJshJJthZVthpZviJdviZpwippyi5x1jp12j5h5jZp4jp14j554kJ94kZ5/lKB5kqB7k52Bk6KCl6KEmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHSIQZkAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGnRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xMDD0cqEAAADpSURBVChTNc/pNwJhFAbwuVo0LWOMZEmFocgSCWUiSxhDmxiyJ6Kx1P//5fHOe/R8uud3z3nOvQJ4nkcp1uIThzhJ6vysl5b+YVAufx0UH9H0+Tm4Jz6m7pmf30ISGbhlfQ47yvA4kIJ4JYCMMQQAC2uo2B13vnYji5nyGWESRQYj03tQrMsF6gOp+1De64sU7m3hgcGptIs0oieW7kVCe4PwTasq/Og8/WCznrTvcIXyv5AKr7Vg41OLuAS0aCjDNizHKznqsktLJF+sL28fatUjMvgvL86BaPh6I+Yh0+6wYxKL4wYA/gDrWXsKMkSIlgAAAABJRU5ErkJggg==';
    }
    else if(this.zoom==9){
      if(record.tipoplantel=="A")
        svgMarkup= 'data:image/png;base64,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';
      if(record.tipoplantel=="B")
        svgMarkup= 'data:image/png;base64,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';
      if(record.tipoplantel=="C")
        svgMarkup= 'data:image/png;base64,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';
      if(record.tipoplantel=="EMSAD")
        svgMarkup= 'data:image/png;base64,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';
    }

    // Create an icon, an object holding the latitude and longitude, and a marker:
    var icon = new H.map.Icon(svgMarkup);

    var marker = new H.map.Marker(coordinate,{icon: icon,data:""});
    // add custom data to the marker
    marker.setData(record);
    group.addObject(marker);
  }




}
