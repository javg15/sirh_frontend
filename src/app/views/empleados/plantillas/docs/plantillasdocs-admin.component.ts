import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { PlantillasService } from '../services/plantillas.service';
import { ActivatedRoute } from '@angular/router';

import { DataTablesResponse } from '../../../../classes/data-tables-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';
import { PersonalService } from '../../../catalogos/personal/services/personal.service';
import { PlazasService } from '../../../plazas/plazas/services/plazas.service';
import { PlantillasdocsService } from '../services/plantillasdocs.service';
import { PlantillasdocsProfesionalService } from '../services/plantillasdocsprofesional.service';
import { PlantillasdocsNombramientoService } from '../services/plantillasdocsnombramiento.service';
import { PlantillasdocsBajaService } from '../services/plantillasdocsbaja.service';
import { PlantillasdocsFamiliaresService } from '../services/plantillasdocsfamiliares.service';
import { PlantillasdocsLicenciasService } from '../services/plantillasdocslicencias.service';
import { PlantillasdocsSindicatoService } from '../services/plantillasdocssindicato.service';
import { CatquincenaService } from '../../../catalogos/catquincena/services/catquincena.service';
import { CatbajamotivoService } from '../../../catalogos/catbajamotivo/services/catbajamotivo.service';
import { environment } from '../../../../../environments/environment';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-plantillasdocs-admin',
  templateUrl: './plantillasdocs-admin.component.html',
  styleUrls: ['./plantillasdocs-admin.component.css']
})

export class PlantillasDocsAdminComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor


  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción
  @Output() redrawEvent = new EventEmitter<any>();
  @Output() openCadenaEvent = new EventEmitter<any>();

  /* El decorador @ViewChild recibe la clase DataTableDirective, para luego poder
  crear el dtElement que represente la tabla que estamos creando. */
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<DataTableDirective> = new Subject();

  API_URL = environment.APIS_URL;

  nombreModulo = 'Plantillasdocs';
  tipoVentana: string = "plantillasdocsnombramiento";
  subTipoVentana: string = "plantillasdocsnombramiento";

  @Input() dtOptions: DataTables.Settings = {};
  private dataTablesParameters = {
    draw: 1, length: 100, opcionesAdicionales: {},
    order: [{ column: 0, dir: "asc" }],
    search: { value: "", regex: false },
    start: 0
  };
  private dtOptionsAdicional = {
    datosBusqueda: { campo: 0, operador: 0, valor: '' }
    , raw: 0
    , fkey: 'id,tipodocumento'
    , fkeyvalue: [0, 0]
    , modo: 0
  };
  headersAdmin: any;
  Members: any[];
  NumberOfMembers = 0;
  ColumnNames: string[];


  @Input() dtOptionsPreparacion: DataTables.Settings = {};
  private dataTablesParametersPreparacion = {
    draw: 1, length: 100, opcionesAdicionales: {},
    order: [{ column: 0, dir: "asc" }],
    search: { value: "", regex: false },
    start: 0
  };
  private dtOptionsAdicionalPreparacion = {
    datosBusqueda: { campo: 0, operador: 0, valor: '' }
    , raw: 0
    , fkey: 'id_personal'
    , fkeyvalue: [0]
    , modo: 33
  };

  headersAdminPreparacion: any;
  MembersPreparacion: any[];
  ColumnNamesPreparacion: string[];
  NumberOfMembersPreparacion = 0;

  //familiares
  @Input() dtOptionsFamiliares: DataTables.Settings = {};
  private dataTablesParametersFamiliares = {
    draw: 1, length: 100, opcionesAdicionales: {},
    order: [{ column: 0, dir: "asc" }],
    search: { value: "", regex: false },
    start: 0
  };
  private dtOptionsAdicionalFamiliares = {
    datosBusqueda: { campo: 0, operador: 0, valor: '' }
    , raw: 0
    , fkey: 'id_personal'
    , fkeyvalue: [0]
    , modo: 22
  };

  headersAdminFamiliares: any;
  MembersFamiliares: any[];
  ColumnNamesFamiliares: string[];
  NumberOfMembersFamiliares = 0;

  //sindicato
  @Input() dtOptionsSindicato: DataTables.Settings = {};
  private dataTablesParametersSindicato = {
    draw: 1, length: 100, opcionesAdicionales: {},
    order: [{ column: 0, dir: "asc" }],
    search: { value: "", regex: false },
    start: 0
  };
  private dtOptionsAdicionalSindicato = {
    datosBusqueda: { campo: 0, operador: 0, valor: '' }
    , raw: 0
    , fkey: 'id_personal'
    , fkeyvalue: [0]
    , modo: 22
  };

  headersAdminSindicato: any;
  MembersSindicato: any[];
  ColumnNamesSindicato: string[];
  NumberOfMembersSindicato = 0;

  //licencias
  @Input() dtOptionsLicencias: DataTables.Settings = {};
  private dataTablesParametersLicencias = {
    draw: 1, length: 100, opcionesAdicionales: {},
    order: [{ column: 0, dir: "asc" }],
    search: { value: "", regex: false },
    start: 0
  };
  private dtOptionsAdicionalLicencias = {
    datosBusqueda: { campo: 0, operador: 0, valor: '' }
    , raw: 0
    , fkey: 'id_plantillaspersonal'
    , fkeyvalue: [0]
    , modo: 22
  };

  headersAdminLicencias: any;
  MembersLicencias: any[];
  ColumnNamesLicencias: string[];
  NumberOfMembersLicencias = 0;


  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;

  record_id_plantillaspersonal: number;
  record_id_personal: number;
  record_id_catplanteles: number;
  record_tipodoc: number;
  record_numeemp: string;
  record_plazaSeleccionada: number;
  record_quincena_activa: string;
  tblNombramientos: [];
  tblNombramientosBase:[];
  plantillapersonalCat: any = [];
  param_id_plantillapersonal: number;
  param_personalTitular: string;

  private elementModal: any;
  @ViewChild('basicModalDocs') basicModalDocs: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild('cadenaModal') public cadenaModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  cattipoCat: any[];

  constructor(private plantillasService: PlantillasService,
    private plantillasdocsService: PlantillasdocsService,
    private plantillasdocsprofesionalSvc: PlantillasdocsProfesionalService,
    private plantillasdocsnombramientoSvc: PlantillasdocsNombramientoService,
    private plantillasdocsfamiliaresSvc: PlantillasdocsFamiliaresService,
    private plantillasdocslicenciasSvc: PlantillasdocsLicenciasService,
    private plantillasdocssindicatoSvc: PlantillasdocsSindicatoService,
    private plantillasdocsbajaSvc: PlantillasdocsBajaService,
    private catquincenaSvc: CatquincenaService,
    private personalSvc: PersonalService,
    private plazasSvc: PlazasService,
    private catbajamotivoSvc: CatbajamotivoService,
    
    private el: ElementRef,
    private route: ActivatedRoute
  ) {
    this.elementModal = el.nativeElement;
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
    modal.plantillasService.add(modal);

    //subtabla datatable
    this.headersAdmin = JSON.parse(this.route.snapshot.data.userdataDocs.cabeceras); // get data from resolver
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
      columnDefs: [{ "visible": false, "targets": [0, 1, 2, 3] },
      { "width": "20%", "targets": [5] }]//ID, tipo
    };


    //preparacion profesional
    this.headersAdminPreparacion = this.route.snapshot.data.userdataDocsPreparacion; // get data from resolver
    //console.log("this.headersAdminPreparacion=>",this.headersAdminPreparacion)
    this.dtOptionsPreparacion = {
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
      columns: this.headersAdminPreparacion,
      columnDefs: [{ "visible": false, "targets": [0] },
      ]//ID, tipo
    };


    //familiares
    this.headersAdminFamiliares = this.route.snapshot.data.userdataDocsFamiliares; // get data from resolver
    //console.log("this.headersAdminFamiliares=>",this.headersAdminFamiliares)
    this.dtOptionsFamiliares = {
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
      columns: this.headersAdminFamiliares,
      columnDefs: [{ "visible": false, "targets": [0] },
      ]//ID, tipo
    };

    //sindicato
    this.headersAdminSindicato = this.route.snapshot.data.userdataDocsSindicato; // get data from resolver
    //console.log("this.headersAdminSindicato=>",this.headersAdminSindicato)
    this.dtOptionsSindicato = {
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
      columns: this.headersAdminSindicato,
      columnDefs: [{ "visible": false, "targets": [0] },
      ]//ID, tipo
    };

    //licencias
    this.headersAdminLicencias = this.route.snapshot.data.userdataDocsLicencias; // get data from resolver
    //console.log("this.headersAdminLicencias=>",this.headersAdminLicencias)
    this.dtOptionsLicencias = {
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
      columns: this.headersAdminLicencias,
      columnDefs: [{ "visible": false, "targets": [0] },
      ]//ID, tipo
    };
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.plantillasService.remove(this.id); //idModal
    this.elementModal.remove();
  }

  actualizarfin(id_plantillasdocsnombramiento) {
    this.plantillasdocsService.setActualizarFin(id_plantillasdocsnombramiento).subscribe(resp => {
      this.reDraw(null);
    });
  }

  imprimirNombramiento(id_plantillasdocsnombramiento) {
    this.plantillasdocsService.getPrintNombramiento('/reportes/plantilla_nombramiento', id_plantillasdocsnombramiento);
  }

  // open modal
  open(idItem: string, accion: string, idCatplanteles: string, idCatplantillas: string, tipoDocumento: string): void {
    this.actionForm = accion;
    this.botonAccion = actionsButtonSave[accion];
    this.record_id_catplanteles = parseInt(idCatplanteles);
    this.tipoVentana = "plantillasdocsnombramiento";

    this.plantillasService.getRecord(idItem).subscribe(resp => {
      this.record_id_personal = resp.id_personal;

      this.personalSvc.getRecord(resp.id_personal).subscribe(resp => {
        this.record_numeemp = resp.numeemp;
        this.tituloForm = "Documentación - " + resp.numeemp + " - " + (resp.apellidopaterno + " " + resp.apellidomaterno + " " + resp.nombre);
        this.record_id_plantillaspersonal = parseInt(idItem);

        this.record_tipodoc = parseInt(tipoDocumento);
        this.plazasSvc.getNombramientosVigentes(this.record_id_personal, 0).subscribe(resp => {
          this.tblNombramientos = resp;
        });
        this.plazasSvc.getNombramientosBase(this.record_id_personal, 0).subscribe(resp => {
          this.tblNombramientosBase = resp;
        });

        this.reDraw(null);


        this.basicModalDocs.show();
      });
    })


  }

  // close modal
  close(): void {
    this.basicModalDocs.hide();
    if (this.actionForm.toUpperCase() != "VER") {
      this.redrawEvent.emit(null);
    }
  }

  mostrarModalCadena(tablaJson: string) {
    this.plantillapersonalCat = JSON.parse(tablaJson);
    this.param_id_plantillapersonal = this.plantillapersonalCat[0].id_pp;
    this.param_personalTitular = this.plantillapersonalCat[0].personal;
    if (this.plantillapersonalCat.length > 1)//si tiene mas de una plantilla el titular de la cadena
      this.cadenaModal.show();
    else
      this.mostrarCadena();
  }

  mostrarCadena(): void {
    this.cadenaModal.hide();
    this.basicModalDocs.hide();
    this.openCadenaEvent.emit(this.param_id_plantillapersonal);
  }

  onSelectTipoVentana(valor) {
    this.tipoVentana = valor;
    this.reDraw(null);
  }

  openPrevioModal(subTipoVentana: string, accion: string, idItem: number, idPlantillaPersonal: number, idPersonal: number, tipoBaja:string) {
    this.subTipoVentana = subTipoVentana;
    this.openModal(accion, idItem, idPlantillaPersonal, idPersonal,tipoBaja)
  }
  //Sub formulario
  openModal(accion: string, idItem: number, idPlantillaPersonal: number, idPersonal: number,tipoBaja:string) {
    switch (this.tipoVentana.toLowerCase()) {
      case "plantillasdocsprofesional":
        this.plantillasdocsprofesionalSvc.open('custom-plantillasdocsprofesional', accion, idItem, idPersonal);
        break;
      case "plantillasdocsnombramiento":
        if (this.subTipoVentana == "plantillasdocsnombramiento")
          this.plantillasdocsnombramientoSvc.open('custom-plantillasdocsnombramiento', accion, idItem, idPlantillaPersonal, 1);
        else if (this.subTipoVentana == "plantillasdocsbaja"){

          if(!tipoBaja){//viene de la edición, si tipoBaja no tiene valor (undefined)
            this.plantillasdocsnombramientoSvc.getRecord(idItem).subscribe(resp => {
              this.catbajamotivoSvc.getRecord(resp.id_catbajamotivo).subscribe(resp => {
                tipoBaja=resp.tipobaja;
                this.plantillasdocsbajaSvc.open('custom-plantillasdocsbaja', accion, idItem, idPlantillaPersonal,tipoBaja);
              });
            });
          }
          else
            this.plantillasdocsbajaSvc.open('custom-plantillasdocsbaja', accion, idItem, idPlantillaPersonal,tipoBaja);
        }
        else if (this.subTipoVentana == "plantillasdocslicenciasadmin") {
          this.plantillasdocsnombramientoSvc.open('custom-plantillasdocsnombramiento', accion, idItem, idPlantillaPersonal, 2);
        }
        break;
      case "plantillasdocssindicato":
        this.plantillasdocssindicatoSvc.open('custom-plantillasdocssindicato', accion, idItem, idPersonal);
        break;
      case "plantillasdocsfamiliares":
        this.plantillasdocsfamiliaresSvc.open('custom-plantillasdocsfamiliares', accion, idItem, idPersonal);
        break;
      case "plantillasdocslicencias":
        this.plantillasdocslicenciasSvc.open('custom-plantillasdocslicencias', accion, idItem, idPlantillaPersonal);
        break;
      default:
        this.plantillasdocsService.open("", accion, idItem, idPlantillaPersonal);

    }
  }

  closeModal(id: string) {
    this.plantillasdocsService.close(id);
  }

  reDraw(parametro: any): void {
    if (this.tipoVentana == "plantillasdocsnombramiento" || this.tipoVentana == "plantillasdocsbaja" || this.tipoVentana == "plantillasdocslicenciasadmin") {
      this.dtOptionsAdicional.raw++;
      this.dtOptionsAdicional.fkeyvalue = [this.record_id_plantillaspersonal, this.record_tipodoc];
      //this.dtOptionsAdicional.fkeyvalue=this.record_id_plantillaspersonal;
      this.dataTablesParameters.opcionesAdicionales = this.dtOptionsAdicional;

      this.plantillasdocsService.getAdmin(this.dataTablesParameters).subscribe(resp => {
        this.ColumnNames = resp.columnNames;
        this.Members = resp.data;
        this.NumberOfMembers = resp.data.length;
        $('.dataTables_length>label>select, .dataTables_filter>label>input').addClass('form-control-sm');
        //$('#tblPlantillasdocs').dataTable({searching: false, paging: false, info: false});
        if (this.NumberOfMembers > 0) {
          $('.dataTables_empty').css('display', 'none');
        }
      }
      );
      //nombramientos
      this.plazasSvc.getNombramientosVigentes(this.record_id_personal, 0).subscribe(resp => {
        this.tblNombramientos = resp;
      });
      this.plazasSvc.getNombramientosBase(this.record_id_personal, 0).subscribe(resp => {
        this.tblNombramientosBase = resp;
      });
    }
    else if (this.tipoVentana == "plantillasdocsprofesional") {
      this.dtOptionsAdicionalPreparacion.raw++;
      this.dtOptionsAdicionalPreparacion.fkeyvalue = [this.record_id_personal];

      this.dataTablesParametersPreparacion.opcionesAdicionales = this.dtOptionsAdicionalPreparacion;

      this.plantillasdocsprofesionalSvc.getAdmin(this.dataTablesParametersPreparacion).subscribe(resp => {
        this.ColumnNamesPreparacion = resp.columnNames;
        this.MembersPreparacion = resp.data;
        this.NumberOfMembersPreparacion = resp.data.length;
        $('.dataTables_length>label>select, .dataTables_filter>label>input').addClass('form-control-sm');
        //$('#tblPlantillasdocs').dataTable({searching: false, paging: false, info: false});
        if (this.NumberOfMembersPreparacion > 0) {
          $('.dataTables_empty').css('display', 'none');
        }
      }
      );
    }
    else if (this.tipoVentana == "plantillasdocsfamiliares") {
      this.dtOptionsAdicionalFamiliares.raw++;
      this.dtOptionsAdicionalFamiliares.fkeyvalue = [this.record_id_personal];

      this.dataTablesParametersFamiliares.opcionesAdicionales = this.dtOptionsAdicionalFamiliares;

      this.plantillasdocsfamiliaresSvc.getAdmin(this.dataTablesParametersFamiliares).subscribe(resp => {
        this.ColumnNamesFamiliares = resp.columnNames;
        this.MembersFamiliares = resp.data;
        this.NumberOfMembersFamiliares = resp.data.length;
        $('.dataTables_length>label>select, .dataTables_filter>label>input').addClass('form-control-sm');
        //$('#tblPlantillasdocs').dataTable({searching: false, paging: false, info: false});
        if (this.NumberOfMembersFamiliares > 0) {
          $('.dataTables_empty').css('display', 'none');
        }
      }
      );
    }
    else if (this.tipoVentana == "plantillasdocssindicato") {
      this.dtOptionsAdicionalSindicato.raw++;
      this.dtOptionsAdicionalSindicato.fkeyvalue = [this.record_id_personal];

      this.dataTablesParametersSindicato.opcionesAdicionales = this.dtOptionsAdicionalSindicato;

      this.plantillasdocssindicatoSvc.getAdmin(this.dataTablesParametersSindicato).subscribe(resp => {
        this.ColumnNamesSindicato = resp.columnNames;
        this.MembersSindicato = resp.data;
        this.NumberOfMembersSindicato = resp.data.length;
        $('.dataTables_length>label>select, .dataTables_filter>label>input').addClass('form-control-sm');
        //$('#tblPlantillasdocs').dataTable({searching: false, paging: false, info: false});
        if (this.NumberOfMembersSindicato > 0) {
          $('.dataTables_empty').css('display', 'none');
        }
      }
      );
    }
    else if (this.tipoVentana == "plantillasdocslicencias") {
      this.dtOptionsAdicionalLicencias.raw++;
      this.dtOptionsAdicionalLicencias.fkeyvalue = [this.record_id_plantillaspersonal];

      this.dataTablesParametersLicencias.opcionesAdicionales = this.dtOptionsAdicionalLicencias;

      this.plantillasdocslicenciasSvc.getAdmin(this.dataTablesParametersLicencias).subscribe(resp => {
        this.ColumnNamesLicencias = resp.columnNames;
        this.MembersLicencias = resp.data;
        this.NumberOfMembersLicencias = resp.data.length;
        $('.dataTables_length>label>select, .dataTables_filter>label>input').addClass('form-control-sm');
        //$('#tblPlantillasdocs').dataTable({searching: false, paging: false, info: false});
        if (this.NumberOfMembersLicencias > 0) {
          $('.dataTables_empty').css('display', 'none');
        }
      }
      );
    }
  }

}
