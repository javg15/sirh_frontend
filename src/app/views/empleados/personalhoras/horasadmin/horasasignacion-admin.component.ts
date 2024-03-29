import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataTablesResponse } from '../../../../classes/data-tables-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Semestre, Catestatushora } from '../../../../_models';
import { PersonalService } from '../../../catalogos/personal/services/personal.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';
import { PersonalhorasService } from '../services/personalhoras.service';
import { PlazasService } from '../../../plazas/plazas/services/plazas.service';
import { HorasasignacionAdminService } from '../services/horasasignacionadmin.service';
import { HorasasignacionFormService } from '../services/horasasignacionform.service';
import { CatquincenaService } from '../../../catalogos/catquincena/services/catquincena.service';
import { environment } from '../../../../../environments/environment';
import { SemestreService } from '../../../catalogos/semestre/services/semestre.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-horasasignacion-admin',
  templateUrl: './horasasignacion-admin.component.html',
  styleUrls: ['./horasasignacion-admin.component.css']
})

export class HorasasignacionAdminComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor

  @Input() dtOptions: DataTables.Settings = {};
  @Input() dtOptionsDescarga: DataTables.Settings = {};
  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción
  @Output() redrawEvent = new EventEmitter<any>();

  /* El decorador @ViewChild recibe la clase DataTableDirective, para luego poder
  crear el dtElement que represente la tabla que estamos creando. */
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<DataTableDirective> = new Subject();

  Members: any[];
  ColumnNames: string[];
  NumberOfMembers = 0;
  headersAdmin: any;

  private dataTablesParameters = {
    draw: 1, length: 100, opcionesAdicionales: {},
    order: [{ column: 0, dir: "asc" }],
    search: { value: "", regex: false },
    start: 0
  };
  private dtOptionsAdicional = {
    state: 'AD',
    datosBusqueda: { campo: 0, operador: 0, valor: '' }
    , raw: 0
    , fkey: 'id_personal,id_semestre,id_catplanteles,id_catestatushora,id_plazas,id_personalhoras_descarga'
    , fkeyvalue: [0, 0, 0, '1', 0, 0]
    , modo: 22
  };

  //Descarga
  private dataTablesParametersDescarga = {
    draw: 1, length: 100, opcionesAdicionales: {},
    order: [{ column: 0, dir: "asc" }],
    search: { value: "", regex: false },
    start: 0
  };
  private dtOptionsAdicionalDescarga = {
    state: 'AD',
    datosBusqueda: { campo: 0, operador: 0, valor: '' }
    , raw: 0
    , fkey: 'id_personal,id_semestre,id_catplanteles,id_catestatushora,id_plazas,id_personalhoras_descarga'
    , fkeyvalue: [0, 0, 0, '1', 0, 1]
    , modo: 22
  };
  MembersDescarga: any[];
  ColumnNamesDescarga: string[];
  NumberOfMembersDescarga = 0;
  headersAdminDescarga: any;

  API_URL = environment.APIS_URL;

  nombreModulo = 'HorasasignacionAdmin';

  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;

  semestreCat: Semestre[];


  record_id_personal: number = 0;
  record_id_semestre: number = 0;
  record_id_catplanteles: number = 0;
  record_estatus: string = '1';
  record_id_plaza: any = 0;
  record_id_catplanteles_aplicacion: number = 0;
  record_esInterina: number = 0;
  record_numeemp: string;
  esSemestreDesdeParametro: boolean = false;
  tblResumenRows: any = [];
  tblResumenRowsEstatus: any = [];
  tblNombramientos: [];
  record_quincena_activa: string;
  record_estatusregistro: string="1";
  permiteAgregar:boolean=false;

  private elementModal: any;

  @ViewChild('basicModalDocs') basicModalDocs: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  cattipoCat: any[];

  constructor(private personalhorasService: PersonalhorasService,
    private horasasignacionadminService: HorasasignacionAdminService,
    private horasasignacionformSvc: HorasasignacionFormService,
    private semestreSvc: SemestreService,
    private plazasSvc: PlazasService,
    private personalSvc: PersonalService,
    private catquincenaSvc: CatquincenaService,
    private el: ElementRef,
    private route: ActivatedRoute
  ) {
    this.elementModal = el.nativeElement;

    this.semestreSvc.getCatalogo().subscribe(resp => {
      this.semestreCat = resp;
    });
    this.catquincenaSvc.getQuincenaActiva().subscribe(async resp => {
      //quincena activa
      this.record_quincena_activa = resp.anio + resp.quincena.toString().padStart(2, '0');
    });
  }


  ngOnInit(): void {

    let modal = this;

    // ensure id attribute exists
    if (!modal.id) {//idModal {
      console.error('modal must have an id');
      return;
    }
    // add self (this modal instance) to the modal service so it's accessible from controllers
    modal.personalhorasService.add(modal);

    //subtabla datatable
    this.headersAdmin = JSON.parse(this.route.snapshot.data.userdataHoras.cabeceras); // get data from resolver
    this.headersAdminDescarga = JSON.parse(this.route.snapshot.data.userdataHoras.cabeceras); // get data from resolver

    this.dtOptions = {
      pagingType: 'full_numbers',
      paging: false,
      //pageLength: 50,
      //serverSide: true,
      //processing: true,
      ordering: false,
      destroy: true,
      searching: false,
      info: false,
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
      columns: this.headersAdmin,
      columnDefs: [{ "visible": false, "targets": [1, 2, 3, 4, 5, 6, 7, 18] },//17=id_descarga
      { "width": "20%", "targets": [8, 10], } // no ejecuta la alineación, entonces, se fuerza en el css
      ]//ID, tipo
    };

    //Descarga
    this.dtOptionsDescarga = {
      pagingType: 'full_numbers',
      paging: false,
      //pageLength: 50,
      //serverSide: true,
      //processing: true,
      ordering: false,
      destroy: true,
      searching: false,
      info: false,
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
      columns: this.headersAdminDescarga,
      columnDefs: [{ "visible": false, "targets": [1, 2, 3, 4, 5, 6,7] },
      { "width": "20%", "targets": [8, 10], } // no ejecuta la alineación, entonces, se fuerza en el css
      ]//ID, tipo
    };

  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.personalhorasService.remove(this.id); //idModal
    this.elementModal.remove();
  }



  // open modal
  open(id_personal: number, accion: string, id_catplanteles: number, id_semestre: number, id_catplanteles_aplicacion: number): void {
    this.actionForm = accion;
    this.record_estatusregistro="1";
    this.botonAccion = actionsButtonSave[accion];
    this.record_id_personal = id_personal;
    this.record_id_semestre = id_semestre;
    this.record_id_catplanteles = id_catplanteles;
    this.record_estatus = '1';

    this.personalSvc.getRecord(id_personal).subscribe(resp => {
      this.tituloForm = "Carga horaria - " + resp.numeemp + " - " + (resp.apellidopaterno + " " + resp.apellidomaterno + " " + resp.nombre);
      this.record_numeemp = resp.numeemp;
    });

    this.esSemestreDesdeParametro = (id_catplanteles > 0);
    if (id_catplanteles == 0) {
      if (this.semestreCat.length > 0) {
        this.record_id_semestre = this.semestreCat[this.semestreCat.length - 1].id;
      }
    }

    this.plazasSvc.getNombramientosVigentes(id_personal, id_semestre).subscribe(resp => {
      this.tblNombramientos = resp;

      if(resp.length>0)
        this.visualizarAgregar(resp[0]["id_plaza"])

      this.record_id_plaza = resp[0].id_plaza;
      this.record_esInterina = resp[0].esinterina;
      this.record_id_catplanteles_aplicacion = resp[0].id_catplanteles_aplicacion;

      this.reDraw(null);
    });



    this.basicModalDocs.show();

  }

  // close modal
  close(): void {
    this.basicModalDocs.hide();
    if (this.actionForm.toUpperCase() != "VER") {
      this.redrawEvent.emit({datosBusqueda:null,drawSingleRow:true});
    }
  }



  //Sub formulario
  openModal(tipo: string, id: string, accion: string, idItem: number, idPersonal: number, idSemestre: number, idPlantel: number, idPlaza: number, esInterina: number, idPlantelAplicacion: number) {

    if (this.record_id_semestre > 0) {
      switch (tipo.toLowerCase()) {
        case "01":
          this.horasasignacionformSvc.open(id, accion, idItem, idPersonal, idSemestre, idPlantel, idPlaza, esInterina, idPlantelAplicacion, parseInt(tipo));
          break;
        default:
          this.horasasignacionformSvc.open(id, accion, idItem, idPersonal, idSemestre, idPlantel, idPlaza, esInterina, idPlantelAplicacion, parseInt(tipo));
          break
      }
    }
    else {
      this.validSummary.generateErrorMessagesFromServer({ record_id_semestre: "Para continuar debe elgegir un 'semestre' a trabajar" });
    }
  }

  closeModal(id: string) {
    this.horasasignacionadminService.close(id);
  }

  reDraw(parametro: any): void {


    this.dtOptionsAdicional.raw++;
    this.dtOptionsAdicional.fkeyvalue = [this.record_id_personal, this.record_id_semestre, this.record_id_catplanteles, this.record_estatus, this.record_id_plaza, 0];
    //this.dtOptionsAdicional.fkeyvalue=this.record_id_personal;
    this.dataTablesParameters.opcionesAdicionales = this.dtOptionsAdicional;

    this.horasasignacionadminService.getAdmin(this.dataTablesParameters).subscribe(resp => {

      this.ColumnNames = resp.columnNames;
      this.Members = resp.data;
      this.NumberOfMembers = resp.data.length;
      $('.dataTables_length>label>select, .dataTables_filter>label>input').addClass('form-control-sm');
      //$('#tblHorasasignacionAdmin').dataTable({searching: false, paging: false, info: false});
      if (this.NumberOfMembers > 0) {
        $('.dataTables_empty').css('display', 'none');
      }

      //tabla resumen
      this.horasasignacionadminService.getAdminResumen(this.record_id_personal, this.record_id_semestre, this.record_id_plaza).subscribe(resp => {
        this.tblResumenRows = []; this.tblResumenRowsEstatus = [];
        if (resp.length > 0) {
          this.tblResumenRows = resp[0].fn_horas_cuenta_resumen.Total;
          this.tblResumenRowsEstatus = resp[0].fn_horas_cuenta_resumen.Estatus;
        }
      });
    });

    //descarga
    this.dtOptionsAdicionalDescarga.raw++;
    this.dtOptionsAdicionalDescarga.fkeyvalue = [this.record_id_personal, this.record_id_semestre, this.record_id_catplanteles, this.record_estatus, this.record_id_plaza, 1];
    //this.dtOptionsAdicional.fkeyvalue=this.record_id_personal;
    this.dataTablesParametersDescarga.opcionesAdicionales = this.dtOptionsAdicionalDescarga;

    this.horasasignacionadminService.getAdmin(this.dataTablesParametersDescarga).subscribe(resp => {

      this.ColumnNamesDescarga = resp.columnNames;
      this.MembersDescarga = resp.data;
      this.NumberOfMembersDescarga = resp.data.length;
      $('.dataTables_length>label>select, .dataTables_filter>label>input').addClass('form-control-sm');
      //$('#tblHorasasignacionAdmin').dataTable({searching: false, paging: false, info: false});
      if (this.NumberOfMembersDescarga > 0) {
        $('.dataTables_empty').css('display', 'none');
      }
    });
  }

  onSemestreChange(valor: any) {
    this.record_id_semestre = parseInt(valor);
    this.reDraw(null);
  }

  onCatestatusChange(estatus: any) {
    this.record_estatus = estatus;
    this.reDraw(null);
  }

  onPlazaChange(valor: any) {
    this.record_id_plaza = parseInt(valor);//0 es el indice
    
    //si la quincena activa esta en el rango de quincena inicial y final de la plaza seleccionada
    this.visualizarAgregar(valor)

    this.reDraw(null);
  }

  visualizarAgregar(id_plaza){
    //si la quincena activa esta en el rango de quincena inicial y final de la plaza seleccionada
    let quinini=this.tblNombramientos.find(a=>a["id_plaza"]==id_plaza)["quinini"]
    let quinfin=this.tblNombramientos.find(a=>a["id_plaza"]==id_plaza)["quinfin"]
    
    console.log("quincena=>",parseInt(this.record_quincena_activa)>=parseInt(quinini) 
      && parseInt(this.record_quincena_activa)<=parseInt(quinfin))

    if(parseInt(this.record_quincena_activa)>=parseInt(quinini) 
        && parseInt(this.record_quincena_activa)<=parseInt(quinfin))
      this.permiteAgregar = true
    else
      this.permiteAgregar = false
  }
}
