import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { DataTablesResponse } from '../../../../classes/data-tables-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Categoriasdetalle, Catzonaeconomica, Catquincena } from '../../../../_models';
import { CatquincenaService } from '../../catquincena/services/catquincena.service';
import { CatzonaeconomicaService } from '../../catzonaeconomica/services/catzonaeconomica.service';
import { ActivatedRoute } from '@angular/router';

import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';
import { environment } from '../../../../../../src/environments/environment';

import { CategoriasdetalleService } from '../services/categoriasdetalle.service';
import { CategoriaspercepcionesService } from '../services/categoriaspercepciones.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-categoriasdetalle-form',
  templateUrl: './categoriasdetalle-form.component.html',
  styleUrls: ['./categoriasdetalle-form.component.css']
})

export class CategoriasdetalleFormComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() dtOptions: DataTables.Settings = {};
  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción
  @Input() varEditarHorPla: string = "1";
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
    ,fkey:'id_categoriasdetalle'
    ,fkeyvalue:0
    ,modo:2
  };

  NumberOfMembers = 0;
  API_URL = environment.APIS_URL;

  nombreModulo = 'Categoriasdetalle';

  headersAdmin: any;

  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;

  private elementModal: any;
  @ViewChild('basicModal') basicModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  record: Categoriasdetalle;
  catquincenaCat:Catquincena[];
  catzonaeconomicaCat:Catzonaeconomica[];
  record_codigo:String;

  public customPatterns = { '0': { pattern: new RegExp('\[0-9a-zA-Z\\u00C0-\\u00FF \]')} };

  constructor(private isLoadingService: IsLoadingService,
    private el: ElementRef,
    private catzonaeconomicaSvc: CatzonaeconomicaService,
    private catquincenaSvc: CatquincenaService,
    private categoriasdetalleService: CategoriasdetalleService,
    private categoriaspercepcionesService: CategoriaspercepcionesService,
    private route: ActivatedRoute
      ) {
      this.elementModal = el.nativeElement;
      this.catzonaeconomicaSvc.getCatalogo().subscribe(resp => {
        this.catzonaeconomicaCat = resp;
      });
      this.catquincenaSvc.getCatalogo().subscribe(resp => {
        this.catquincenaCat = resp;
      });
  }

  newRecord(idParent:number): Categoriasdetalle {
    return {
      id: 0,  codigo: '', id_categorias:idParent,
      totalplazaaut:0, totalhorasaut:0, id_catzonaeconomica:0,
      state: '', created_at: new Date(),  updated_at: new Date(), id_usuarios_r: 0
    };
  }
  ngOnInit(): void {

      this.record =this.newRecord(0);

      let modal = this;

      // ensure id attribute exists
      if (!modal.id) {//idModal {
          console.error('modal must have an id');
          return;
      }
      // add self (this modal instance) to the modal service so it's accessible from controllers
      modal.categoriasdetalleService.add(modal);

      //subtabla datatable
      this.headersAdmin = JSON.parse(this.route.snapshot.data.userdataPercepciones.cabeceras); // get data from resolver

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

      //loading
      this.userFormIsPending =this.isLoadingService.isLoading$({ key: 'loading' });
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.categoriasdetalleService.remove(this.id); //idModal
      this.elementModal.remove();
  }


  async submitAction(form) {

    if(this.actionForm.toUpperCase()!=="VER"){
      this.validSummary.resetErrorMessages(form);

      await this.isLoadingService.add(
      this.categoriasdetalleService.setRecord(this.record,this.actionForm).subscribe(resp => {
        if (resp.hasOwnProperty('error')) {
          this.validSummary.generateErrorMessagesFromServer(resp.message);
        }
        else if(resp.message=="success"){
          if(this.actionForm.toUpperCase()=="NUEVO") this.actionForm="editar";
          this.record.id=resp.id;
          this.successModal.show();
          setTimeout(()=>{ this.successModal.hide(); this.close();}, 2000)
        }
      }),{ key: 'loading' });
    }
  }

  changeCmdEditarHorPla(value){
    this.varEditarHorPla=value;
    this.HideShowEditarHorPla();

  }

  HideShowEditarHorPla(){
    if(this.varEditarHorPla=="1")
      this.record.totalhorasaut=0;
    else
      this.record.totalplazaaut=0;
  }
  // open de este form
  open(idItem: string, accion: string,idParent:number):  void {
    this.actionForm=accion;
    this.botonAccion=actionsButtonSave[accion];
    this.tituloForm="Detalle de categoría - " + titulosModal[accion] + " registro";

    if(idItem=="0"){
      this.record =this.newRecord(idParent);
      this.reDraw();
    } else {
      this.categoriasdetalleService.getRecord(idItem).subscribe(resp => {
        this.record = resp;
        this.varEditarHorPla=this.record.totalhorasaut==0 ? "1" : "2";
        this.HideShowEditarHorPla();
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
    this.categoriaspercepcionesService.open(id, accion, idItem,idParent);
  }

  closeModal(id: string) {
    this.categoriaspercepcionesService.close(id);
  }

  reDraw(): void {


    this.dtOptionsAdicional.raw++;

    this.dtOptionsAdicional.fkeyvalue=this.record.id;
    this.dataTablesParameters.opcionesAdicionales = this.dtOptionsAdicional;

    this.categoriaspercepcionesService.getAdmin(this.dataTablesParameters).subscribe(resp => {

        this.ColumnNames = resp.columnNames;
        this.Members = resp.data;
        this.NumberOfMembers = resp.data.length;
        $('.dataTables_length>label>select, .dataTables_filter>label>input').addClass('form-control-sm');
        //$('#tblCategoriasdetalle').dataTable({searching: false, paging: false, info: false});
        if (this.NumberOfMembers > 0) {
          $('.dataTables_empty').css('display', 'none');
        }
      }
    );
  }

}
