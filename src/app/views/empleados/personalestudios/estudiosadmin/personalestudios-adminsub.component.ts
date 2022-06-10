import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
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
import { PersonalEstudiosService } from '../services/personalestudios.service';
import { PersonalEstudiosAdminService } from '../services/personalestudiosadmin.service';
import { PlantillasService } from '../../plantillas/services/plantillas.service';

import { environment } from '../../../../../environments/environment';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-personalestudios-adminsub',
  templateUrl: './personalestudios-adminsub.component.html',
  styleUrls: ['./personalestudios-adminsub.component.css']
})

export class PersonalEstudiosAdminSubComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor


  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción
  @Output() redrawEvent = new EventEmitter<any>();
  

  /* El decorador @ViewChild recibe la clase DataTableDirective, para luego poder
  crear el dtElement que represente la tabla que estamos creando. */
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<DataTableDirective> = new Subject();

  API_URL = environment.APIS_URL;

  nombreModulo = 'Personalestudios';

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
    , fkey: 'id_personal'
    , fkeyvalue: [0]
    , modo: 22
  };
  headersAdmin: any;
  Members: any[];
  NumberOfMembers = 0;
  ColumnNames: string[];

  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;

  record_id_personal: number;
  record_numeemp: string;

  private elementModal: any;
  @ViewChild('basicModalDocs') basicModalDocs: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  cattipoCat: any[];

  constructor(
    private personalestudiosService: PersonalEstudiosService,
    private personalestudiosadminService: PersonalEstudiosAdminService,
    private personalSvc: PersonalService,
    private plantillapersonalSvc: PlantillasService,
    private el: ElementRef,
    private route: ActivatedRoute
  ) {
    this.elementModal = el.nativeElement;
  }


  ngOnInit(): void {

    let modal = this;

    // ensure id attribute exists
    if (!modal.id) {//idModal {
      console.error('modal must have an id');
      return;
    }
    // add self (this modal instance) to the modal service so it's accessible from controllers
    modal.personalestudiosService.add(modal);

    //subtabla datatable
    this.headersAdmin = JSON.parse(this.route.snapshot.data.userdataSub.cabeceras); // get data from resolver
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
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.personalestudiosService.remove(this.id); //idModal
    this.elementModal.remove();
  }

  // open modal
  open(idItem: string, accion: string): void {
    this.actionForm = accion;
    this.botonAccion = actionsButtonSave[accion];

      this.record_id_personal = parseInt(idItem);

      this.personalSvc.getRecord(idItem).subscribe(resp => {
        this.record_numeemp = resp.numeemp;
        this.tituloForm = "Estudios - " + resp.numeemp + " - " + (resp.apellidopaterno + " " + resp.apellidomaterno + " " + resp.nombre);

        this.reDraw(null);

        this.basicModalDocs.show();
      })

  }

  // close modal
  close(): void {
    this.basicModalDocs.hide();
    if (this.actionForm.toUpperCase() != "VER") {
      this.redrawEvent.emit(null);
    }
  }

  //Sub formulario
  openModal(id:string, accion: string, idItem: number, idPersonal: number) {
    
        this.personalestudiosadminService.open(id, accion, idItem, idPersonal);
    
  }

  closeModal(id: string) {
    this.personalestudiosService.close(id);
  }

  reDraw(parametro: any): void {
    
      this.dtOptionsAdicional.raw++;
      this.dtOptionsAdicional.fkeyvalue = [this.record_id_personal];
      //this.dtOptionsAdicional.fkeyvalue=this.record_id_personal;
      this.dataTablesParameters.opcionesAdicionales = this.dtOptionsAdicional;

      this.personalestudiosadminService.getAdmin(this.dataTablesParameters).subscribe(resp => {
        this.ColumnNames = resp.columnNames;
        this.Members = resp.data;
        this.NumberOfMembers = resp.data.length;
        $('.dataTables_length>label>select, .dataTables_filter>label>input').addClass('form-control-sm');
        //$('#tblPersonaldocs').dataTable({searching: false, paging: false, info: false});
        if (this.NumberOfMembers > 0) {
          $('.dataTables_empty').css('display', 'none');
        }
      }
      );
    
  }

}
