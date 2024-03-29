import { Component, OnInit, Input, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataTablesResponse } from '../../../../classes/data-tables-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { HorasclaseService } from '../services/horasclase.service';

import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';

import { environment } from '../../../../../../src/environments/environment';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-horasclase-admin',
  templateUrl: './horasclase-admin.component.html',

})


export class HorasclaseAdminComponent implements OnInit {
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
  tituloBotonReporte='Reporte';
  headersAdmin: any;
  loadingService:boolean=false;
  verBotonExcel:boolean=false;

  /* En el constructor creamos el objeto horasclaseService,
  de la clase HttpConnectService, que contiene el servicio mencionado,
  y estará disponible en toda la clase de este componente.
  El objeto es private, porque no se usará fuera de este componente. */
  constructor(private isLoadingService: IsLoadingService,
    private horasclaseService: HorasclaseService,private route: ActivatedRoute,

  ) {

  }

  ngOnInit(): void {
    this.headersAdmin = JSON.parse(this.route.snapshot.data.userdata.cabeceras);
    this.verBotonExcel=this.route.snapshot.data.userdata.excel=="1";

      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
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

          this.horasclaseService.http
            .post<DataTablesResponse>(
              // this.API_URL + '/a6b_apis/read_records_dt.php',
              this.API_URL + '/horasclase/getAdmin',
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
        columnDefs:[{"visible": false, "targets": [0]}, //state
                //{"width": "5%", "targets": 1}
              ]
      };

  }
  openModal(id: string, accion: string, idItem: number) {
    this.horasclaseService.open(id, accion, idItem);
  }

  closeModal(id: string) {
    this.horasclaseService.close(id);
  }


  MostrarReporte(param_id_catzonaeconomica){
    this.horasclaseService.getReporte('/reportes/horasclase',$(param_id_catzonaeconomica).val());
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

  exportExcel() {
    this.loadingService=true;

      this.horasclaseService.http
      .post<DataTablesResponse>(
        // this.API_URL + '/a6b_apis/read_records_dt.php',
        this.API_URL + '/horasclase/getAdmin',
        {
          columns:this.dtOptions.columns,
          length: 100000,
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
            theme: 'TableStyleLight1',
            showRowStripes: true,
            showColumnStripes: false,
          },
          columns: [
            { name: "-" },//inicializar
          ],
          rows: [],
        });


        const table = worksheet.getTable("MyTable");
        this.headersAdmin.forEach(e => {
          if(e.title.toUpperCase()!="ACCIONES" 
            && e.title.toLowerCase()!="id"
            && e.title.toLowerCase()!="id plantillasdocsnombramiento actual"
            && e.title.toLowerCase()!="id estatus"
            )
            table.addColumn({
                name: e.title,
              },[],e.index);

        });

        for(let e of resp.data) {
          let row=[""];

          for(let i=0,j=0;i<this.headersAdmin.length;i++){ //=1 para quitar ID, -1 para quitar acciones
            if(this.headersAdmin[i].title.toUpperCase()!="ACCIONES" 
              && this.headersAdmin[i].title.toLowerCase()!="id"
              && this.headersAdmin[i].title.toLowerCase()!="id plantillasdocsnombramiento actual"
              && this.headersAdmin[i].title.toLowerCase()!="id estatus"
              )
              row[++j]=e[this.headersAdmin[i].data] //agregar dato de campo
          }
          table.addRow(row)
        }
        table.commit();

        this.loadingService=false;

        workbook.xlsx.writeBuffer().then((data) => {
          let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          fs.saveAs(blob, 'Horas docente.xlsx');
        })
      })
      
  }
}
