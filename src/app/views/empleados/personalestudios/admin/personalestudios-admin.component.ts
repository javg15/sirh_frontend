import { Component, OnInit, Input, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../../../../_services/token-storage.service';
import { DataTablesResponse } from '../../../../classes/data-tables-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { PersonalEstudiosService } from '../services/personalestudios.service';
import { Catplantillas, Catplanteles,Personal } from '../../../../_models';
import { CatplantillasService } from '../../../catalogos/catplantillas/services/catplantillas.service';
import { CatplantelesService } from '../../../catalogos/catplanteles/services/catplanteles.service';
import { PersonalService } from '../../../catalogos/personal/services/personal.service';
import { AutocompleteComponent } from 'angular-ng-autocomplete';

import { environment } from '../../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-personalestudios-admin',
  templateUrl: './personalestudios-admin.component.html',

})


export class PersonalEstudiosAdminComponent implements OnInit {
  @Input() dtOptions: DataTables.Settings = {};
  usuario:any=this.tokenStorage.getUser();
  /* El decorador @ViewChild recibe la clase DataTableDirective, para luego poder
  crear el dtElement que represente la tabla que estamos creando. */
  @ViewChild('id_personal') id_personal:AutocompleteComponent;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<DataTableDirective> = new Subject();

  Members: any[];
  ColumnNames: string[];

  NumberOfMembers = 0;
  API_URL = environment.APIS_URL;

  private dtOptionsAdicional = { datosBusqueda: { campo: 0, operador: 0, valor: '' }
    , raw: 0 
    ,fkey:'id_catplanteles,id_catplantillas,id_personal'
    ,fkeyvalue:[0,0,0]
    ,modo:22
  };

  nombreModulo = 'Personal';

  headersAdmin: any;

  catplantillasCat:Catplantillas[];
  catplantelesCat:Catplanteles[];
  catpersonalCat:Personal[];
  keywordSearch = 'full_name';
  isLoadingSearch:boolean;
  esInicio:boolean=true;

  record_id_personal:number=0;
  record_id_catplantillas:number=0;
  record_id_catplanteles:number=0;
  /* En el constructor creamos el objeto personalService,
  de la clase HttpConnectService, que contiene el servicio mencionado,
  y estará disponible en toda la clase de este componente.
  El objeto es private, porque no se usará fuera de este componente. */
  constructor(
    private tokenStorage: TokenStorageService,
    private personalestudiosService: PersonalEstudiosService, private route: ActivatedRoute,
    private catplantillasSvc: CatplantillasService,
    private catplantelesSvc: CatplantelesService,
    private personalSvc: PersonalService,
    private _sanitizer: DomSanitizer
  ) {
    this.catplantillasSvc.getCatalogo().subscribe(resp => {
      this.catplantillasCat = resp;
      this.esInicio=false; //si ya se cargó el catalogo, entonces, ya paso la carga inicial
    });
    this.catplantelesSvc.getCatalogo(this.usuario.id).subscribe(resp => {
      this.catplantelesCat = resp;
    });
  }

  ngOnInit(): void {
    this.headersAdmin = JSON.parse(this.route.snapshot.data.userdata.cabeceras);

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      displayStart: 0,
      serverSide: true,
      processing: true,
      //destroy : true,
      searching: false,
      info: true,
      language: {
        emptyTable: '',
        zeroRecords: 'No hay coincidencias',
        lengthMenu: 'Mostrar _MENU_ elementos',
        search: 'Buscar:',
        info: 'De _START_ a _END_ de _TOTAL_ elementos',
        infoEmpty: 'De 0 a 0 de 0 elementos',
        infoFiltered: '(filtrados de _MAX_ elementos totales)',
        paginate: {
          first: 'Prim.',
          last: 'Últ.',
          next: 'Sig.',
          previous: 'Ant.'
        },
      },
      // Use this attribute to enable the responsive extension
      responsive: true,
      ajax: (dataTablesParameters: any, callback) => {

        this.dtOptionsAdicional.raw++;
        dataTablesParameters.opcionesAdicionales = this.dtOptionsAdicional;

        this.personalestudiosService.http
          .post<DataTablesResponse>(
            // this.API_URL + '/a6b_apis/read_records_dt.php',
            this.API_URL + '/personalestudios/getAdmin',
            dataTablesParameters, {}
          ).subscribe(resp => {

            this.ColumnNames = resp.columnNames;
            this.Members = resp.data;
            this.NumberOfMembers = resp.data.length;
            $('.dataTables_length>label>select, .dataTables_filter>label>input').addClass('form-control-sm');
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
            if (this.NumberOfMembers > 0) {
              $('.dataTables_empty').css('display', 'none');
            }
          }
          );
      },
      //order: [[ 3, "desc" ]],
      columns: this.headersAdmin,
      columnDefs: [{ "visible": false, "searchable": false, "targets": [0] }
        , { "width": "5%", "targets": 1 }]
    };

  }

  openModal(id: string, accion: string, idItem: number,idCatplanteles:number,idCatplantillas:number) {
    this.personalestudiosService.open(id, accion, idItem,idCatplanteles,idCatplantillas);
  }

  closeModal(id: string) {
    this.personalestudiosService.close(id);
  }


  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Hay que dessuscribirse del evento dtTrigger, para poder recrear la tabla.
    this.dtTrigger.unsubscribe();
  }

  reDraw(datosBusqueda: any = null): void {

    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      if (datosBusqueda != null) {
        this.dtOptionsAdicional.datosBusqueda = datosBusqueda;
        // Destruimos la tabla
        dtInstance.destroy();
        // dtTrigger la reconstruye
        this.dtTrigger.next();
      }
      else {
        dtInstance.clear().draw(false); // viene de form, solo actualiza la vista actual (current page)
      }
    });
  }

  onClickBuscar() {
    if(this.id_personal.query=="") this.record_id_personal=0;

    this.dtOptionsAdicional.fkeyvalue=[
      (this.record_id_catplanteles==null?0:this.record_id_catplanteles),
      (this.record_id_catplantillas==null?0:this.record_id_catplantillas),
      this.record_id_personal,
    ];

    //si no es la carga inicial
    if(!(this.esInicio && this.dtOptionsAdicional.fkeyvalue[0]==0
      && this.dtOptionsAdicional.fkeyvalue[1]==0
      && this.dtOptionsAdicional.fkeyvalue[2]==0))
      {
        this.reDraw();
      }
  }

  onSelectPlantel(select_plantel){
    this.record_id_catplanteles=select_plantel;
    if(select_plantel!=0)
      this.onClickBuscar();
  }
  onSelectPlantilla(select_plantilla){
    this.record_id_catplantillas=select_plantilla;
    if(select_plantilla!=0)
      this.onClickBuscar();
  }
  
  /*********************
   autocomplete id_personal
   *********************/
  onChangeSearchIdPersonal(val: string) {
    this.isLoadingSearch = true;
    this.personalSvc.getCatalogoSegunBusqueda(val).subscribe(resp => {
      this.catpersonalCat = resp;
      this.isLoadingSearch = false;
    });
  }

  onCleared(){
    this.record_id_personal=0;
    this.onClickBuscar();
  }

  onSelectIdPersonal(val: any) {
    let items=val["full_name"].split(" -- ");
    this.record_id_personal=parseInt(items[2]);
    if(this.record_id_personal!=0)
      this.onClickBuscar();
  }

  
  //Call this method in the image source, it will sanitize it.
  transform(image) {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + image);
  }
}
