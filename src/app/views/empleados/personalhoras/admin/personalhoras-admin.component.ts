import { Component, OnInit, Input, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../../../../_services/token-storage.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataTablesResponse } from '../../../../classes/data-tables-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { PersonalhorasService } from '../services/personalhoras.service';
import { Personalhoras, Semestre, Catplanteles,Personal } from '../../../../_models';
import { SemestreService } from '../../../catalogos/semestre/services/semestre.service';
import { CatplantelesService } from '../../../catalogos/catplanteles/services/catplanteles.service';
import { PersonalService } from '../../../catalogos/personal/services/personal.service';
import { AutocompleteComponent } from 'angular-ng-autocomplete';

import { environment } from '../../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';


declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-personalhoras-admin',
  templateUrl: './personalhoras-admin.component.html',
  styleUrls: ['./personalhoras-admin.component.css']
})


export class PersonalhorasAdminComponent implements OnInit {
  @Input() dtOptions: DataTables.Settings = {};
  usuario:any=this.tokenStorage.getUser();
  /* El decorador @ViewChild recibe la clase DataTableDirective, para luego poder
  crear el dtElement que represente la tabla que estamos creando. */
  @ViewChild('id_personal') id_personal:AutocompleteComponent;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<DataTableDirective> = new Subject();

  @ViewChild('reporteModal') reporteModal: ModalDirective;
  
  Members: any[];
  ColumnNames: string[];

  NumberOfMembers = 0;
  API_URL = environment.APIS_URL;

  private dtOptionsAdicional = {
    datosBusqueda: {campo: 0, operador: 0, valor: ''},
    raw:0
    ,fkey:'id_catplanteles,id_semestre,id_personal'
    ,fkeyvalue:[0,0,0]
    ,modo:22
    ,id:0
  };
  rowSelected:any={idx:0,id:0};

  nombreModulo = 'Personalhoras';
  tituloBotonReporte='Plantilla';
  tituloBotonReporte2='Plantilla con carga horaria';
  param_id_catplanteles:number;
  param_id_semestre:number;
  param_plantel:string;

  record:Personalhoras={
    id: 0, id_personal: 0, cantidad: 0, id_catplanteles: 0, id_catplanteles_aplicacion:0, id_gruposclase: 0,id_materiasclase: 0,id_horasclase:0,
      id_cattipohorasmateria: 1, id_catnombramientos: 0, id_semestre: 0,frenteagrupo:0,id_plazas:0,
      id_catestatushora: 0, id_catquincena_ini: 0, id_catquincena_fin: 0, horassueltas:0, id_cattipohorasdocente:0,
      state: '', created_at: new Date(), updated_at: new Date(), id_usuarios_r: 0, descargada:0, id_personalhoras_descarga:0,
      id_personal_titular:0
  };
  semestreCat:Semestre[];
  catplantelesCat:Catplanteles[];
  catpersonalCat:Personal[];
  keywordSearch = 'full_name';
  esInicio:boolean=true;
  isLoadingSearch:boolean;
  headersAdmin: any;

  tipoReporte:number;

  /* En el constructor creamos el objeto personalhorasService,
  de la clase HttpConnectService, que contiene el servicio mencionado,
  y estará disponible en toda la clase de este componente.
  El objeto es private, porque no se usará fuera de este componente. */
  constructor(
    private tokenStorage: TokenStorageService,
    private personalhorasService: PersonalhorasService, private route: ActivatedRoute,
    private semestreSvc: SemestreService,
    private catplantelesSvc: CatplantelesService,
    private personalSvc: PersonalService,
    private _sanitizer: DomSanitizer
  ) {
    this.semestreSvc.getCatalogo().subscribe(resp => {
      this.semestreCat = resp.sort((a,b) => b.text.localeCompare(a.text));//orden descendente
      if(this.semestreCat.length>0){
        this.param_id_semestre=this.record.id_semestre=this.semestreCat[0].id;
      }
      this.esInicio=false; //si ya se cargó el catalogo, entonces, ya paso la carga inicial
      this.onClickBuscar();
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

          this.personalhorasService.http
            .post<DataTablesResponse>(
              // this.API_URL + '/a6b_apis/read_records_dt.php',
              this.API_URL + '/personalhoras/getAdmin',
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
      columnDefs: [{ "visible": false, "searchable": false, "targets": [0,1,2] }
        //, { "width": "5%", "targets": 1 }
      ]
    };

  }
  openModal(idx:number,id: string, accion: string, id_personal: number,id_catplanteles:number,id_semestre:number) {
    this.rowSelected.idx=idx;
    this.rowSelected.id=id_personal;
    this.personalhorasService.open(id, accion, id_personal, id_catplanteles,id_semestre);
  }

  closeModal(id: string) {
    this.personalhorasService.close(id);
  }


  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Hay que dessuscribirse del evento dtTrigger, para poder recrear la tabla.
    this.dtTrigger.unsubscribe();
  }

  reDraw(params: any = null,drawSingleRow:boolean=false): void {
    const that=this;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      if(params && params.datosBusqueda!=null){
        this.dtOptionsAdicional.datosBusqueda = params.datosBusqueda;
        // Destruimos la tabla
        dtInstance.destroy();
        // dtTrigger la reconstruye
        this.dtTrigger.next();
      }
      else if(params && params.drawSingleRow){
        that.dtOptionsAdicional.modo=1;
        that.dtOptionsAdicional.id=this.rowSelected.id;
        this.personalhorasService.getAdmin(that.dtOptionsAdicional).subscribe(resp => {
          if(that.dtOptions.columnDefs[0].visible==false){
            for(let i=0,j=0;i < that.dtOptions.columns.length; i++){
              if(that.ColumnNames[i]!='id' 
                  && that.ColumnNames[i]!='id_personal' 
                  && that.ColumnNames[i]!='id_catplanteles'
                  && that.ColumnNames[i]!='foto' 
                  && that.ColumnNames[i]!='acciones' )
                that.dtElement["el"].nativeElement.rows[this.rowSelected.idx+1]
                  .cells[j++].innerText=resp.data[0][that.ColumnNames[i]];
            }
          }
          this.dtOptionsAdicional.modo=22;//reset el modo, para que no afecte en la paginación
        });
      }
      else{
        this.dtOptionsAdicional.modo=22
        dtInstance.clear().draw(false); // viene de form, solo actualiza la vista actual (current page)
        
      }
    });
  }

  //Call this method in the image source, it will sanitize it.
  transform(image) {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + image);
  }

  MostrarModal(tipo){
    this.tipoReporte=tipo;
    this.reporteModal.show()
  }

  onClickBuscar() {
    if(this.id_personal.query=="") this.record.id_personal=0;

    this.dtOptionsAdicional.fkeyvalue=[
      (this.record.id_catplanteles==null?0:this.record.id_catplanteles),
      (this.record.id_semestre==null?0:this.record.id_semestre),
      this.record.id_personal,
    ];

    //si no es la carga inicial
    if(this.esInicio==false && !(this.dtOptionsAdicional.fkeyvalue[0]==0
      && this.dtOptionsAdicional.fkeyvalue[1]==0
      && this.dtOptionsAdicional.fkeyvalue[2]==0))
      {
        this.reDraw();
      }
  }

  onSelectPlantel(select_plantel){
    this.record.id_catplanteles=select_plantel;
    if(select_plantel!=0)
      this.onClickBuscar();
  }
  onSelectSemestre(select_semestre){
    this.record.id_semestre=select_semestre;
    if(select_semestre!=0)
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
}
