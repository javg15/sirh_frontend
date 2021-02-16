import { Component, OnInit, Input, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataTablesResponse } from '../../../../classes/data-tables-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { CatcentrostrabajoService } from '../services/catcentrostrabajo.service';

import { environment } from '../../../../../../src/environments/environment';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-catcentrostrabajo-admin',
  templateUrl: './catcentrostrabajo-admin.component.html',

})


export class CatcentrostrabajoAdminComponent implements OnInit {
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

  nombreModulo = 'Catcentrostrabajo';

  headersAdmin: any;

  /* En el constructor creamos el objeto catcentrostrabajoService,
  de la clase HttpConnectService, que contiene el servicio mencionado,
  y estará disponible en toda la clase de este componente.
  El objeto es private, porque no se usará fuera de este componente. */
  constructor(
    private catcentrostrabajoService: CatcentrostrabajoService,private route: ActivatedRoute
  ) {

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

          this.catcentrostrabajoService.http
            .post<DataTablesResponse>(
              // this.API_URL + '/a6b_apis/read_records_dt.php',
              this.API_URL + '/catcentrostrabajo/getAdmin',
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
    this.catcentrostrabajoService.open(id, accion, idItem);
  }

  closeModal(id: string) {
    this.catcentrostrabajoService.close(id);
  }


  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Hay que dessuscribirse del evento dtTrigger, para poder recrear la tabla.
    this.dtTrigger.unsubscribe();
  }

  reDraw(datosBusqueda: any = [{campo: 0, operador: 0, valor: ''}]): void {

    this.dtOptionsAdicional.datosBusqueda = datosBusqueda;

    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      //dtInstance.clear().draw(); // Add this  line to clear all rows..
      // Destruimos la tabla
      dtInstance.destroy();
      // dtTrigger la reconstruye
      this.dtTrigger.next();
    });
  }
}
