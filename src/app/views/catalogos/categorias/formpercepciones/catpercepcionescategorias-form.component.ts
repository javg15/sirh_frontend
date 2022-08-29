import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { DataTablesResponse } from '../../../../classes/data-tables-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Catpercepcionescategorias, Catquincena, Catpercepciones } from '../../../../_models';
import { CatquincenaService } from '../../catquincena/services/catquincena.service';
import { CatpercepcionesService } from '../../catpercepciones/services/catpercepciones.service';
import { CatzonaeconomicaService } from '../../catzonaeconomica/services/catzonaeconomica.service';

import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';

import { CatpercepcionescategoriasService } from '../services/catpercepcionescategorias.service';
import * as moment from 'moment';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-catpercepcionescategorias-form',
  templateUrl: './catpercepcionescategorias-form.component.html',
  styleUrls: ['./catpercepcionescategorias-form.component.css']
})

export class CatpercepcionescategoriasFormComponent implements OnInit, OnDestroy {
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


  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;
  successModalTimeOut: null | ReturnType<typeof setTimeout> = null;

  private elementModal: any;
  @ViewChild('basicModal') basicModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  record: Catpercepcionescategorias;
  catquincenaCat:Catquincena[];
  catpercepcionesCat: Catpercepciones[];

  public customPatterns = { '0': { pattern: new RegExp('\[0-9a-zA-Z\\u00C0-\\u00FF \]')} };

  constructor(private isLoadingService: IsLoadingService,
    private el: ElementRef,
    private catpercepcionesSvc: CatpercepcionesService,
    private catquincenaSvc: CatquincenaService,
    private catpercepcionescategoriasService: CatpercepcionescategoriasService
      ) {
      this.elementModal = el.nativeElement;
      this.catquincenaSvc.getCatalogoSegunAnio(moment().format('YYYY')).subscribe(resp => {
        this.catquincenaCat = resp;
      });
      this.catpercepcionesSvc.getCatalogo().subscribe(resp => {
        this.catpercepcionesCat = resp;
      });
  }

  newRecord(idParent:number): Catpercepcionescategorias {
    return {
      id: 0,  id_categoriasdetalle:idParent, fecha_inicio:null, fecha_fin:null,
      id_catquincena_ini: 0, id_catquincena_fin: 0, importe:0,id_catpercepciones:0,
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
      modal.catpercepcionescategoriasService.add(modal);

      //loading
      this.userFormIsPending =this.isLoadingService.isLoading$({ key: 'loading' });
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.catpercepcionescategoriasService.remove(this.id); //idModal
      this.elementModal.remove();
  }


  async submitAction(form) {

    if(this.actionForm.toUpperCase()!=="VER"){
      this.validSummary.resetErrorMessages(form);

      await this.isLoadingService.add(
      this.catpercepcionescategoriasService.setRecord(this.record,this.actionForm).subscribe(resp => {
        if (resp.hasOwnProperty('error')) {
          this.validSummary.generateErrorMessagesFromServer(resp.message);
        }
        else if(resp.message=="success"){
          if(this.actionForm.toUpperCase()=="NUEVO") this.actionForm="editar";
          this.record.id=resp.id;
          this.successModal.show();
          this.successModalTimeOut=setTimeout(()=>{ this.successModal.hide(); this.close();}, 2000)
        }
      }),{ key: 'loading' });
    }
  }


  // open de este form
  open(idItem: string, accion: string,idParent:number):  void {
    this.actionForm=accion;
    this.botonAccion=actionsButtonSave[accion];
    this.tituloForm="Percepciones de categoría - " + titulosModal[accion] + " registro";

    if(idItem=="0"){
      this.record =this.newRecord(idParent);
    } else {
    this.catpercepcionescategoriasService.getRecord(idItem).subscribe(resp => {
      this.record = resp;
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

  continuarEditando(){
    if(this.successModalTimeOut) {
      clearTimeout(this.successModalTimeOut);
      this.successModal.hide();
    }
  }
  // log contenido de objeto en formulario
  get diagnosticValidate() { return JSON.stringify(this.record); }
}
