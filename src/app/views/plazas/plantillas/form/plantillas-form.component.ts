import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { PlantillasService } from '../services/plantillas.service';
import { PlantillaspersonalService } from '../services/plantillaspersonal.service';
import { ActivatedRoute } from '@angular/router';

import { DataTablesResponse } from '../../../../classes/data-tables-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Plantillaspersonal, Catplantillas, Catplanteles } from '../../../../_models';
import { CatplantillasService } from '../../../catalogos/catplantillas/services/catplantillas.service';
import { CatplantelesService } from '../../../catalogos/catplanteles/services/catplanteles.service';
import { ValidationSummaryComponent } from '../../../_shared/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';

import { environment } from '../../../../../environments/environment';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-plantillas-form',
  templateUrl: './plantillas-form.component.html',
  styleUrls: ['./plantillas-form.component.css']
})

export class PlantillasFormComponent implements OnInit, OnDestroy {
  @Input() dtOptions: DataTables.Settings = {};
  @Input() id: string;
  @Input() botonAccion: string;
  @Output() redrawEvent = new EventEmitter<any>();
  /* El decorador @ViewChild recibe la clase DataTableDirective, para luego poder
  crear el dtElement que represente la tabla que estamos creando. */
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<DataTableDirective> = new Subject();

  Members: any[];
  ColumnNames: string[];

  private dataTablesParameters={
    draw: 1,  length: 100 , opcionesAdicionales: {},
    order: [{column: 0, dir: "asc"}],
    search: {value: "", regex: false},
    start: 0
  };
  private dtOptionsAdicional = { datosBusqueda: {campo: 0, operador: 0, valor: ''}
    ,raw:0
    ,fkey:'id_catplanteles,id_catplantillas'
    ,fkeyvalue:[0,0]
    ,modo:22
  };

  NumberOfMembers = 0;
  API_URL = environment.APIS_URL;

  nombreModulo = 'Plantillaspersonal';

  headersAdmin: any;

  actionForm: string;
  tituloForm: string;

  private elementModal: any;
  @ViewChild('basicModal') basicModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  record: Plantillaspersonal;
  catplantillasCat:Catplantillas[];
  catplantelesCat:Catplanteles[];
  cattipoCat:any[];

  constructor(private plantillasService: PlantillasService, private el: ElementRef,
    private plantillaspersonalService: PlantillaspersonalService,
    private catplantillasSvc: CatplantillasService,
    private catplantelesSvc: CatplantelesService,
    private route: ActivatedRoute
      ) {
      this.elementModal = el.nativeElement;
      this.catplantillasSvc.getCatalogo().subscribe(resp => {
        this.catplantillasCat = resp;
      });
      this.catplantelesSvc.getCatalogo().subscribe(resp => {
        this.catplantelesCat = resp;
      });
  }

  newRecord(): Plantillaspersonal {
    return {
      id: 0,  id_catplanteles: 0, id_personal:0, id_catplantillas: 0, consecutivo:0,id_usuarios_autoriza:0,
      state: '', created_at: new Date(),  updated_at: new Date(), id_usuarios_r: 0
    };
  }
  ngOnInit(): void {

    this.record =this.newRecord();

    let modal = this;

    // ensure id attribute exists
    if (!modal.id) {
        console.error('modal must have an id');
        return;
    }
    // add self (this modal instance) to the modal service so it's accessible from controllers
    modal.plantillasService.add(modal);

      //subtabla datatable
    this.headersAdmin = this.route.snapshot.data.userdataPersonal; // get data from resolver

    this.dtOptions = {
      pagingType: 'full_numbers',
      paging:false,
      //pageLength: 10,
      //serverSide: true,
      //processing: true,
      ordering:false,
      destroy : true,
      searching : false,
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
      columnDefs:[{"width": "5%", "targets": 0}]
    };

  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.plantillasService.remove(this.id);
      this.elementModal.remove();
  }


  submitAction(form) {

    if(this.actionForm.toUpperCase()!=="VER"){
      this.validSummary.resetErrorMessages(form);

      this.plantillasService.setRecord(this.record,this.actionForm).subscribe(resp => {
        if (resp.hasOwnProperty('error')) {
          this.validSummary.generateErrorMessagesFromServer(resp.message);
        }
        else if(resp.message=="success"){
          if(this.actionForm.toUpperCase()==="NUEVO") this.actionForm="editar";
          this.record.id=resp.id;
          this.successModal.show();
          setTimeout(()=>{ this.successModal.hide(); }, 2000)
        }
      });
    }
  }

  // open modal
  open(idItem: string, accion: string):  void {
    this.actionForm=accion;
    this.botonAccion=actionsButtonSave[accion];
    this.tituloForm=titulosModal[accion] + " registro";

    if(idItem=="0"){
        this.record =this.newRecord();
        this.reDraw();
    } else {
      this.plantillasService.getRecord(idItem).subscribe(resp => {
        this.record = resp;
        this.reDraw();
      });
    }

    // console.log($('#modalTest').html()); poner el id a algun elemento para testear
    this.basicModal.show();
  }

  // close modal
  close(): void {
      this.basicModal.hide();
      if(this.actionForm.toUpperCase()!="VER"){
        this.redrawEvent.emit({
          campo: 0,
          operador: 0,
          valor: ''
        });
      }
  }

  // log contenido de objeto en formulario
  get diagnosticValidate() { return JSON.stringify(this.record); }


  //Sub formulario
  openModal(id: string, accion: string, idItem: number,idCatplanteles:number,idCatplantillas:number) {
    this.plantillaspersonalService.open(id, accion, idItem,idCatplanteles,idCatplantillas);
  }

  closeModal(id: string) {
    this.plantillaspersonalService.close(id);
  }

  reDraw(): void {


    this.dtOptionsAdicional.raw++;
    this.dtOptionsAdicional.fkeyvalue=[this.record.id_catplanteles,this.record.id_catplantillas];
    this.dataTablesParameters.opcionesAdicionales = this.dtOptionsAdicional;

    this.plantillaspersonalService.getAdmin(this.dataTablesParameters).subscribe(resp => {

        this.ColumnNames = resp.columnNames;
        this.Members = resp.data;
        this.NumberOfMembers = resp.data.length;
        $('.dataTables_length>label>select, .dataTables_filter>label>input').addClass('form-control-sm');
        //$('#tblPlantillaspersonal').dataTable({searching: false, paging: false, info: false});
        if (this.NumberOfMembers > 0) {
          $('.dataTables_empty').css('display', 'none');
        }
      }
    );
  }

}
