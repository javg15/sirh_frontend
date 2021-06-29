import { Component, OnInit, Input, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataTablesResponse } from '../../../../classes/data-tables-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { PlantillasService } from '../services/plantillas.service';
import { Plantillaspersonal, Catplantillas, Catplanteles,Personal,Categorias } from '../../../../_models';
import { CatplantillasService } from '../../../catalogos/catplantillas/services/catplantillas.service';
import { CatplantelesService } from '../../../catalogos/catplanteles/services/catplanteles.service';
import { PersonalService } from '../../personal/services/personal.service';
import { CategoriasService } from '../../../catalogos/categorias/services/categorias.service';
import { AutocompleteComponent } from 'angular-ng-autocomplete';


import { environment } from '../../../../../environments/environment';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-plantillas-admin',
  templateUrl: './plantillas-admin.component.html',

})


export class PlantillasAdminComponent implements OnInit {
  @Input() dtOptions: DataTables.Settings = {};
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

  private dtOptionsAdicional = {
    datosBusqueda: {campo: 0, operador: 0, valor: ''},
    raw:0
    ,fkey:'id_catplanteles,id_catplantillas,id_personal,tipoDocumento,id_categoria'
    ,fkeyvalue:[0,0,0,0,0]
    ,modo:22
  };

  nombreModulo = 'Plantillas';

  headersAdmin: any;
  tipoDocumento:number=0;
  id_categoria:number=0;
  record:Plantillaspersonal={
      id: 0,  id_catplanteles: 0, id_personal:0, id_catplantillas: 0, consecutivo:'',id_usuarios_autoriza:0,
      fechaingreso:null, state: '', created_at: new Date(),  updated_at: new Date(), id_usuarios_r: 0
    }
  ;
  catplantillasCat:Catplantillas[];
  catplantelesCat:Catplanteles[];
  catpersonalCat:Personal[];
  categoriasCat:Categorias[];
  keywordSearch = 'full_name';
  isLoadingSearch:boolean;
  esInicio:boolean=true;
  /* En el constructor creamos el objeto plazasService,
  de la clase HttpConnectService, que contiene el servicio mencionado,
  y estará disponible en toda la clase de este componente.
  El objeto es private, porque no se usará fuera de este componente. */
  constructor(
    private plantillasService: PlantillasService,private route: ActivatedRoute,
    private catplantillasSvc: CatplantillasService,
    private catplantelesSvc: CatplantelesService,
    private personalSvc: PersonalService,
    private categoriasSvc: CategoriasService
  ) {
    this.catplantillasSvc.getCatalogo().subscribe(resp => {
      this.catplantillasCat = resp;
      this.esInicio=false; //si ya se cargó el catalogo, entonces, ya paso la carga inicial
    });
    this.catplantelesSvc.getCatalogo().subscribe(resp => {
      this.catplantelesCat = resp;
    });
    this.categoriasSvc.getCatalogo().subscribe(resp => {
      this.categoriasCat = resp;
    });
  }

  ngOnInit(): void {
    this.headersAdmin = this.route.snapshot.data.userdata; // get data from resolver

      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 50,
        serverSide: true,
        processing: true,
        //destroy : true,
        searching : false,
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
        ajax: (dataTablesParameters: any, callback) => {
          this.dtOptionsAdicional.raw++;
          dataTablesParameters.opcionesAdicionales = this.dtOptionsAdicional;

          this.plantillasService.http
            .post<DataTablesResponse>(
              // this.API_URL + '/a6b_apis/read_records_dt.php',
              this.API_URL + '/plantillaspersonal/getAdmin',
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

        columns: this.headersAdmin,
        columnDefs:[{"visible": false, "targets": 0}, //state
                {"width": "5%", "targets": [1]},
                {"width": "10%", "targets": [this.headersAdmin-1]}
              ]
      };

  }
  openModal(id: string, accion: string, idItem: number,idCatplanteles:number,idCatplantillas:number,tipoDocumento:number) {
    this.plantillasService.open(id, accion, idItem,idCatplanteles,idCatplantillas,tipoDocumento);
  }

  closeModal(id: string) {
    this.plantillasService.close(id);
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
      if(datosBusqueda!=null){
        this.dtOptionsAdicional.datosBusqueda = datosBusqueda;
        // Destruimos la tabla
        dtInstance.destroy();
        // dtTrigger la reconstruye
        this.dtTrigger.next();
      }
      else{
        dtInstance.clear().draw(false); // viene de form, solo actualiza la vista actual (current page)
      }
    });
  }

  onClickBuscar() {
    if(this.id_personal.query=="") this.record.id_personal=0;

    this.dtOptionsAdicional.fkeyvalue=[
      (this.record.id_catplanteles==null?0:this.record.id_catplanteles),
      (this.record.id_catplantillas==null?0:this.record.id_catplantillas),
      this.record.id_personal,
      (this.tipoDocumento==null?0:this.tipoDocumento),
      (this.id_categoria==null?0:this.id_categoria),
    ];

    //si no es la carga inicial
    if(!(this.esInicio && this.dtOptionsAdicional.fkeyvalue[0]==0
      && this.dtOptionsAdicional.fkeyvalue[1]==0
      && this.dtOptionsAdicional.fkeyvalue[2]==0
      && this.dtOptionsAdicional.fkeyvalue[3]==0
      && this.dtOptionsAdicional.fkeyvalue[4]==0))
      {
        this.reDraw();
      }
  }

  onSelectPlantel(select_plantel){
    this.record.id_catplanteles=select_plantel;
    if(select_plantel!=0)
      this.onClickBuscar();
  }
  onSelectPlantilla(select_plantilla){
    this.record.id_catplantillas=select_plantilla;
    if(select_plantilla!=0)
      this.onClickBuscar();
  }
  onSelectCategorias(val){
    this.id_categoria = val;
    if(val!=0)
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
    this.record.id_personal=0;
    this.onClickBuscar();
  }

  onSelectIdPersonal(val: any) {
    let items=val["full_name"].split(" -- ");
    this.record.id_personal=parseInt(items[2]);
    if(this.record.id_personal!=0)
      this.onClickBuscar();
  }

  onSelectDocumentos(val: any){
    this.tipoDocumento = val;
    if(this.tipoDocumento!=0)
      this.onClickBuscar();
  }
}
