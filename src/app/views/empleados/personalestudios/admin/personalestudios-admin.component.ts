import { Component, OnInit, Input, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataTablesResponse } from '../../../../classes/data-tables-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { PersonalEstudiosService } from '../services/personalestudios.service';

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

  private dtOptionsAdicional = { datosBusqueda: { campo: 0, operador: 0, valor: '' }, raw: 0 };

  nombreModulo = 'Personal';

  headersAdmin: any;

  /* En el constructor creamos el objeto personalService,
  de la clase HttpConnectService, que contiene el servicio mencionado,
  y estará disponible en toda la clase de este componente.
  El objeto es private, porque no se usará fuera de este componente. */
  constructor(
    private personalestudiosService: PersonalEstudiosService, 
    private route: ActivatedRoute,
    private _sanitizer: DomSanitizer
  ) {

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
            this.API_URL + '/personal/getAdmin',
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
      columnDefs: [{ "visible": false, "searchable": false, "targets": 0 }
        , { "width": "5%", "targets": 1 }]
    };

  }
  openModal(id: string, accion: string, idItem: number) {
    this.personalestudiosService.open(id, accion, idItem);
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

  //Call this method in the image source, it will sanitize it.
  transform(image) {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + image);
  }
}
