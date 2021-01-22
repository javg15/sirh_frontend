import { Component, OnInit, Input, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataTablesResponse } from '../../../../classes/data-tables-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { PlantillasService } from '../services/plantillas.service';
import { Plantillaspersonal, Catplantillas, Catplanteles,Personal } from '../../../../_models';
import { CatplantillasService } from '../../../catalogos/catplantillas/services/catplantillas.service';
import { CatplantelesService } from '../../../catalogos/catplanteles/services/catplanteles.service';
import { PersonalService } from '../../personal/services/personal.service';
import { AutocompleteComponent } from 'angular-ng-autocomplete';

import { environment } from '../../../../../environments/environment';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-plantillas-admin',
  templateUrl: './plantillas-admin.component.html',
  styleUrls: ['./plantillas-admin.component.css', '../../../_shared/shared.css']
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
    ,fkey:'id_catplanteles,id_catplantillas,id_personal'
    ,fkeyvalue:[0,0,0]
    ,modo:22
  };

  nombreModulo = 'Plantillas';
  tituloBotonReporte='Reporte';
  headersAdmin: any;
  record:Plantillaspersonal={
      id: 0,  id_catplanteles: 0, id_personal:0, id_catplantillas: 0, consecutivo:0,id_usuarios_autoriza:0,
      state: '', created_at: new Date(),  updated_at: new Date(), id_usuarios_r: 0
    }
  ;
  catplantillasCat:Catplantillas[];
  catplantelesCat:Catplanteles[];
  catpersonalCat:Personal[];
  keywordSearch = 'full_name';
  isLoadingSearch:boolean;


  /* En el constructor creamos el objeto plantillasService,
  de la clase HttpConnectService, que contiene el servicio mencionado,
  y estará disponible en toda la clase de este componente.
  El objeto es private, porque no se usará fuera de este componente. */
  constructor(
    private plantillasService: PlantillasService,private route: ActivatedRoute,
    private catplantillasSvc: CatplantillasService,
    private catplantelesSvc: CatplantelesService,
    private personalSvc: PersonalService,
  ) {
    this.catplantillasSvc.getCatalogo().subscribe(resp => {
      this.catplantillasCat = resp;
    });
    this.catplantelesSvc.getCatalogo().subscribe(resp => {
      this.catplantelesCat = resp;
    });
  }

  ngOnInit(): void {
    this.headersAdmin = this.route.snapshot.data.userdata; // get data from resolver

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
        columnDefs:[{"visible": false, "searchable": false, "targets": 0}
                  ,{"width":"5%", "targets": 1}]
      };

  }
  openModal(id: string, accion: string, idItem: number,idCatplanteles:number,idCatplantillas:number) {
    this.plantillasService.open(id, accion, idItem,idCatplanteles,idCatplantillas);
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

  onClickBuscar() {
    if(this.id_personal.query=="") this.record.id_personal=0;

    this.dtOptionsAdicional.fkeyvalue=[
      this.record.id_catplanteles,
      this.record.id_catplantillas,
      this.record.id_personal
    ]
    this.reDraw();
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
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onSelectIdPersonal(val: any) {
    let items=val["full_name"].split(" -- ");
    console.log(items[2]);
    this.record.id_personal=parseInt(items[2]);
  }
}
