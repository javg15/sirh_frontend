import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { CategoriasService } from '../services/categorias.service';
import { CategoriassueldosService } from '../services/categoriassueldos.service';
import { ActivatedRoute } from '@angular/router';

import { DataTablesResponse } from '../../../../classes/data-tables-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Categorias, Cattiponomina } from '../../../../_models';
import { CattiponominaService } from '../../cattiponomina/services/cattiponomina.service';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../../src/environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';
import { environment } from '../../../../../../src/environments/environment';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-categorias-form',
  templateUrl: './categorias-form.component.html',
  styleUrls: ['./categorias-form.component.css']
})

export class CategoriasFormComponent implements OnInit, OnDestroy {
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

  private dataTablesParameters={
    draw: 1,  length: 100 , opcionesAdicionales: {},
    order: [{column: 0, dir: "asc"}],
    search: {value: "", regex: false},
    start: 0
  };
  private dtOptionsAdicional = { datosBusqueda: {campo: 0, operador: 0, valor: ''}
    ,raw:0
    ,fkey:'id_categorias'
    ,fkeyvalue:0
    ,modo:2
  };

  NumberOfMembers = 0;
  API_URL = environment.APIS_URL;

  nombreModulo = 'Categoriassueldos';

  headersAdmin: any;

  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;

  private elementModal: any;
  @ViewChild('basicModal') basicModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  record: Categorias;
  cattiponominaCat:Cattiponomina[];
  cattipoCat:any[];

  constructor(private isLoadingService: IsLoadingService,
      private categoriasService: CategoriasService, private el: ElementRef,
    private categoriassueldosService: CategoriassueldosService,
    private cattiponominaSvc: CattiponominaService,
    private route: ActivatedRoute
      ) {
      this.elementModal = el.nativeElement;
      this.cattiponominaSvc.getCatalogo().subscribe(resp => {
        this.cattiponominaCat = resp;
      });
      this.cattipoCat=[{id:'',descripcion:''},{id:1,descripcion:'ADMINISTRATIVO'},{id:2,descripcion:'DOCENTE'},{id:3,descripcion:'DIRECTIVO'}];
  }

  newRecord(): Categorias {
    return {
      id: 0,  clave: '', codigo:'', denominacion: '', nivelsalarial:'',id_tipocategoria:0, id_tiponomina:0,
      state: '', aplicaa:0, created_at: new Date(),  updated_at: new Date(), id_usuarios_r: 0
    };
  }
  ngOnInit(): void {

    this.record =this.newRecord();

    let modal = this;

    // ensure id attribute exists
    if (!modal.id) {//idModal {
        console.error('modal must have an id');
        return;
    }
    // add self (this modal instance) to the modal service so it's accessible from controllers
    modal.categoriasService.add(modal);

      //subtabla datatable
    this.headersAdmin = this.route.snapshot.data.userdataSueldos; // get data from resolver

    this.dtOptions = {
      pagingType: 'full_numbers',
      paging:false,
      //pageLength: 50,
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
      columnDefs:[{"visible": false, "targets": 0}, //state
                {"width": "5%", "targets": 1}]
    };

  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.categoriasService.remove(this.id); //idModal
      this.elementModal.remove();
  }


  async submitAction(form) {

    if(this.actionForm.toUpperCase()!=="VER"){
      this.validSummary.resetErrorMessages(form);

      await this.isLoadingService.add(
      this.categoriasService.setRecord(this.record,this.actionForm).subscribe(resp => {
        if (resp.hasOwnProperty('error')) {
          this.validSummary.generateErrorMessagesFromServer(resp.message);
        }
        else if(resp.message=="success"){
          if(this.actionForm.toUpperCase()==="NUEVO") this.actionForm="editar";
          this.record.id=resp.id;
          this.successModal.show();
          setTimeout(()=>{ this.successModal.hide(); }, 2000)
        }
      }),{ key: 'loading' });
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
      this.categoriasService.getRecord(idItem).subscribe(resp => {
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
        this.redrawEvent.emit(null);
      }
  }

  // log contenido de objeto en formulario
  get diagnosticValidate() { return JSON.stringify(this.record); }


  //Sub formulario
  openModal(id: string, accion: string, idItem: number,idParent:number) {
    this.categoriassueldosService.open(id, accion, idItem,idParent);
  }

  closeModal(id: string) {
    this.categoriassueldosService.close(id);
  }

  reDraw(): void {


    this.dtOptionsAdicional.raw++;
    this.dtOptionsAdicional.fkeyvalue=this.record.id;
    this.dataTablesParameters.opcionesAdicionales = this.dtOptionsAdicional;

    this.categoriassueldosService.getAdmin(this.dataTablesParameters).subscribe(resp => {

        this.ColumnNames = resp.columnNames;
        this.Members = resp.data;
        this.NumberOfMembers = resp.data.length;
        $('.dataTables_length>label>select, .dataTables_filter>label>input').addClass('form-control-sm');
        //$('#tblCategoriassueldos').dataTable({searching: false, paging: false, info: false});
        if (this.NumberOfMembers > 0) {
          $('.dataTables_empty').css('display', 'none');
        }
      }
    );
  }

}
