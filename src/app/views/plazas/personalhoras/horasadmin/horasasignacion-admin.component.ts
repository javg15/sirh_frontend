import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataTablesResponse } from '../../../../classes/data-tables-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import {Semestre,Catestatushora} from '../../../../_models';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';
import { PersonalhorasService } from '../../personalhoras/services/personalhoras.service';
import { HorasasignacionAdminService } from '../services/horasasignacionadmin.service';
import { HorasasignacionFormService } from '../services/horasasignacionform.service';
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

  private dataTablesParameters = {
    draw: 1, length: 100, opcionesAdicionales: {},
    order: [{ column: 0, dir: "asc" }],
    search: { value: "", regex: false },
    start: 0
  };
  private dtOptionsAdicional = {
    datosBusqueda: { campo: 0, operador: 0, valor: '' }
    , raw: 0
    , fkey: 'id_personal,id_semestre,id_catplanteles'
    , fkeyvalue: [0, 0, 0]
    , modo: 22
    , state:"A"
  };

  NumberOfMembers = 0;
  API_URL = environment.APIS_URL;

  nombreModulo = 'HorasasignacionAdmin';

  headersAdmin: any;

  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;

  semestreCat: Semestre[];


  record_id_personal: number=0;
  record_id_semestre: number=0;
  record_id_catplanteles: number=0;
  esSemestreDesdeParametro:boolean=false;

  private elementModal: any;
  @ViewChild('basicModalDocs') basicModalDocs: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  cattipoCat: any[];

  constructor(private personalhorasService: PersonalhorasService,
    private horasasignacionadminService: HorasasignacionAdminService,
    private horasasignacionformSvc: HorasasignacionFormService,
    private semestreSvc: SemestreService,
    private el: ElementRef,
    private route: ActivatedRoute
  ) {
    this.elementModal = el.nativeElement;

    this.semestreSvc.getCatalogo().subscribe(resp => {
      this.semestreCat = resp;
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
    this.headersAdmin = this.route.snapshot.data.userdataHoras; // get data from resolver

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
      columnDefs: [{ "visible": false, "targets": [0, 1] },
      { "width": "20%", "targets": [4] }]//ID, tipo
    };

  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.personalhorasService.remove(this.id); //idModal
    this.elementModal.remove();
  }


  // open modal
  open(id_personal: number, accion: string,id_catplanteles:number,id_semestre:number): void {
    this.actionForm = accion;
    this.botonAccion = actionsButtonSave[accion];
    this.record_id_personal = id_personal;
    this.record_id_semestre=id_semestre;
    this.record_id_catplanteles=id_catplanteles;
    this.dtOptionsAdicional.state="A";

    this.esSemestreDesdeParametro=(id_catplanteles>0);
    if(id_catplanteles==0){
      if(this.semestreCat.length>0){
        this.record_id_semestre=this.semestreCat[this.semestreCat.length-1].id;
      }
    }
    this.reDraw();
    // console.log($('#modalTest').html()); poner el id a algun elemento para testear
    this.basicModalDocs.show();

  }

  // close modal
  close(): void {
    this.basicModalDocs.hide();
    if (this.actionForm.toUpperCase() != "VER") {
      this.redrawEvent.emit(null);
    }
  }



  //Sub formulario
  openModal(tipo: string, id: string, accion: string, idItem: number, idPersonal: number, idSemestre: number, idPlantel: number) {

    if(this.record_id_semestre>0){
      switch (tipo.toLowerCase()) {
        case "01":
          this.horasasignacionformSvc.open(id, accion, idItem, idPersonal, idSemestre, idPlantel);
          break;
        default:
          this.horasasignacionformSvc.open(id, accion, idItem, idPersonal, idSemestre, idPlantel);
          break
      }
    }
    else{
      this.validSummary.generateErrorMessagesFromServer({record_id_semestre: "Para continuar debe elgegir un 'semestre' a trabajar"});
    }
  }

  closeModal(id: string) {
    this.horasasignacionadminService.close(id);
  }

  reDraw(): void {


    this.dtOptionsAdicional.raw++;
    this.dtOptionsAdicional.fkeyvalue = [this.record_id_personal, this.record_id_semestre, this.record_id_catplanteles];
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
    }
    );
  }

  onSemestreChange(valor: any) {
    this.record_id_semestre = parseInt(valor);
    this.reDraw();
  }

  onCatestatusChange(state:any){
    this.dtOptionsAdicional.state = state;
    this.reDraw();
  }
}