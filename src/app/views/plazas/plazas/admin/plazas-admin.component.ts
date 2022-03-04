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

import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';

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

  private dtOptionsAdicional = { 
    state:'AD',
    datosBusqueda: {campo: 0, operador: 0, valor: ''},raw:0};

  nombreModulo = 'Plazas';
  tituloBotonReporte='Listado';

  headersAdmin: any;
  loadingService:boolean=false;

  catplantelesCat:Catplanteles[];
  cattiponominaCat:Cattiponomina[];
  categoriasCat:Categorias[];
  catestatusplazaCat:Catestatusplaza[];

  param_id_catplanteles:number;
  param_id_cattiponomina:number;
  param_id_categorias:number;
  param_id_catestatusplaza:number;
  verBotonExcel:boolean=false;

  /* En el constructor creamos el objeto plazasService,
  de la clase HttpConnectService, que contiene el servicio mencionado,
  y estará disponible en toda la clase de este componente.
  El objeto es private, porque no se usará fuera de este componente. */
  constructor(private isLoadingService: IsLoadingService,
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
    this.headersAdmin = JSON.parse(this.route.snapshot.data.userdata.cabeceras); // get data from resolver
    this.verBotonExcel=this.route.snapshot.data.userdata.excel=="1";

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
        columnDefs:[{"visible": false, "searchable": false, "targets": [0,1,2]}
                  ,{"width":"5%", "targets": 3}]
      };

  }
  openModal(id: string, accion: string, idItem: number,id_plantillasdocsnombramiento_actual: number,id_estatus: number) {
    this.plazasService.open(id, accion, idItem,id_plantillasdocsnombramiento_actual,id_estatus);
  }

  closeModal(id: string) {
    this.plazasService.close(id);
  }

  MostrarReporte(){
    this.plazasService.getListado('/reportes/plazas_listado',this.param_id_catplanteles,this.param_id_cattiponomina,this.param_id_categorias,this.param_id_catestatusplaza);
  }

  exportExcel() {
    this.loadingService=true;

      this.plazasService.http
      .post<DataTablesResponse>(
        // this.API_URL + '/a6b_apis/read_records_dt.php',
        this.API_URL + '/plazas/getAdmin',
        {
          columns:this.dtOptions.columns,
          length: 10000,
          opcionesAdicionales: this.dtOptionsAdicional,
          order: [{column: 0, dir: "asc"}],
          search: {value: "", regex: false},
          start: 0
        }, {}
      ).subscribe(resp => {
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet('PlazasSheet');
        worksheet.addTable({
          name: "MyTable",
          ref: "A1",
          headerRow: true,
          totalsRow: false,
          style: {
            theme: null,
            showRowStripes: true,
            showColumnStripes: true,
          },
          columns: [
            { name: "-" },//inicializar
          ],
          rows: [],
        });


        const table = worksheet.getTable("MyTable");
        this.headersAdmin.forEach(e => {
          table.addColumn({
              name: e.title,
            },[],e.index);

        });

        for(let e of resp.data) {
          let row=[""];

          for(let i=0;i<this.headersAdmin.length;i++){
            row[i+1]=e[this.headersAdmin[i].data] //agregar dato de campo
          }
          table.addRow(row)
        }
        table.commit();

        this.loadingService=false;

        workbook.xlsx.writeBuffer().then((data) => {
          let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          fs.saveAs(blob, 'Plazas.xlsx');
        })
      })
      
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

export interface product {
  id: number
  name: string
  brand: string
  color: string
  price: number
}