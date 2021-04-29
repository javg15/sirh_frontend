import { Component, OnInit, Input, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataTablesResponse } from '../../../../classes/data-tables-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { PlazasService } from '../services/plazas.service';

import { Catplanteles, Cattiponomina, Categorias, Catestatusplaza } from '../../../../_models';
import { CatplantelesService } from '../../../catalogos/catplanteles/services/catplanteles.service';
import { CattiponominaService } from '../../../catalogos/cattiponomina/services/cattiponomina.service';
import { CategoriasService } from '../../../catalogos/categorias/services/categorias.service';
import { CatestatusplazaService } from '../../../catalogos/catestatusplaza/services/catestatusplaza.service';

import { environment } from '../../../../../environments/environment';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-plazas-admin',
  templateUrl: './plazas-admin.component.html',

})


export class PlazasAdminComponent implements OnInit {
  @Input() dtOptions: DataTables.Settings = {};
  /* El decorador @ViewChild recibe la clase DataTableDirective, para luego poder
  crear el dtElement que represente la tabla que estamos creando. */
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<DataTableDirective> = new Subject();

  Members: any[];
  ColumnNames: string[];

  NumberOfMembers = 0;
  API_URL = environment.APIS_URL;

  private dtOptionsAdicional = { datosBusqueda: {campo: 0, operador: 0, valor: ''},raw:0};

  nombreModulo = 'Horasclase';
  tituloBotonReporte='Listado';

  headersAdmin: any;

  catplantelesCat:Catplanteles[];
  cattiponominaCat:Cattiponomina[];
  categoriasCat:Categorias[];
  catestatusplazaCat:Catestatusplaza[];

  param_id_catplanteles:number;
  param_id_cattiponomina:number;
  param_id_categorias:number;
  param_id_catestatusplaza:number;

  /* En el constructor creamos el objeto plazasService,
  de la clase HttpConnectService, que contiene el servicio mencionado,
  y estará disponible en toda la clase de este componente.
  El objeto es private, porque no se usará fuera de este componente. */
  constructor(
    private plazasService: PlazasService,private route: ActivatedRoute,
    private catplantelesSvc: CatplantelesService,private cattiponominaSvc: CattiponominaService,
    private categoriasSvc: CategoriasService,private CatestatusplazaSvc: CatestatusplazaService,
  ) {
    this.catplantelesSvc.getCatalogo().subscribe(resp => {
      this.catplantelesCat = resp;
    });
    this.cattiponominaSvc.getCatalogo().subscribe(resp => {
      this.cattiponominaCat = resp;
    });
    this.categoriasSvc.getCatalogo().subscribe(resp => {
      this.categoriasCat = resp;
    });
    this.CatestatusplazaSvc.getCatalogo().subscribe(resp => {
      this.catestatusplazaCat = resp;
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
        // Use this attribute to enable the responsive extension
        responsive: true,
        ajax: (dataTablesParameters: any, callback) => {
          this.dtOptionsAdicional.raw++;
          dataTablesParameters.opcionesAdicionales = this.dtOptionsAdicional;

          this.plazasService.http
            .post<DataTablesResponse>(
              // this.API_URL + '/a6b_apis/read_records_dt.php',
              this.API_URL + '/plazas/getAdmin',
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
        columnDefs:[{"visible": false, "searchable": false, "targets": 0}
                  ,{"width":"5%", "targets": 1}]
      };

  }
  openModal(id: string, accion: string, idItem: number) {
    this.plazasService.open(id, accion, idItem);
  }

  closeModal(id: string) {
    this.plazasService.close(id);
  }

  MostrarReporte(){
    this.plazasService.getListado('/reportes/plazas_listado',this.param_id_catplanteles,this.param_id_cattiponomina,this.param_id_categorias,this.param_id_catestatusplaza);
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
}
