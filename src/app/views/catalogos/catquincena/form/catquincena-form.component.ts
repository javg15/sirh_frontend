import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { CatquincenaService } from '../services/catquincena.service';
import { CatestatusquincenaService } from '../../catestatusquincena/services/catestatusquincena.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Catquincena } from '../../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../../src/environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';
import * as moment from 'moment';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-catquincena-form',
  templateUrl: './catquincena-form.component.html',
  styleUrls: ['./catquincena-form.component.css']
})

export class CatquincenaFormComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción
  @Output() redrawEvent = new EventEmitter<any>();
  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;

  private elementModal: any;
  @ViewChild('basicModal') basicModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  record: Catquincena;
  quincenaCat:any[]=[];
  anioCat:any[]=[];
  catestatusquincenaCat:any[]=[];

  modo_copiar:boolean=false;

  constructor(private isLoadingService: IsLoadingService,
      private catquincenaService: CatquincenaService,
      private catestatusquincenaSvc: CatestatusquincenaService,
      private el: ElementRef,
      ) {
      this.elementModal = el.nativeElement;
      for(let i=moment().year(); i>=2000;i--)
        this.anioCat.push({anio:i})
      for(let i=1; i<=24;i++)
        this.quincenaCat.push({quincena:i})

      this.catestatusquincenaSvc.getCatalogo().subscribe(resp => {
        this.catestatusquincenaCat = resp;
      });
  }

  newRecord(): Catquincena {
    return {
      id: 0,  anio: 0, quincena: 0, fechainicio: new Date(), fechafin: new Date(),
      adicional: 0, id_catestatusquincena: 0, periodovacacional: '', fechadepago: new Date(),
      observaciones: '', fechacierre: new Date(), observaciones2: '', bimestre: 0, aplicarajusteispt: 0,
      pagoderetroactividad: 0, liberadaparaportaladmvo: '', permiteabcderecibos: '',
      state: '', created_at: new Date(),  updated_at: new Date(), id_usuarios_r: 0
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
      modal.catquincenaService.add(modal);

      //loading
      this.userFormIsPending =this.isLoadingService.isLoading$({ key: 'loading' });
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.catquincenaService.remove(this.id); //idModal
      this.elementModal.remove();
  }


  async submitAction(form) {

    if(this.actionForm.toUpperCase()!=="VER"){
      this.validSummary.resetErrorMessages(form);

      await this.isLoadingService.add(
      this.catquincenaService.setRecord(this.record,this.actionForm).subscribe(resp => {
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

  // open de este form
  open(idItem: string, accion: string):  void {
    this.actionForm=accion;
    this.botonAccion=actionsButtonSave[accion];
    this.tituloForm="Quincena - " +titulosModal[accion] + " registro";
    this.modo_copiar=false;

    if(idItem=="0"){
      this.record =this.newRecord();
    } else {
      this.catquincenaService.getRecord(idItem).subscribe(resp => {
        this.record = resp;

        if (this.actionForm.toUpperCase() == "COPIAR") {
          this.actionForm = "NUEVO";
          this.record.id = 0;
          this.record.fechacierre=null;
          this.record.fechadepago=null;
          this.record.observaciones="";
          this.record.id_catestatusquincena=5; //adicional

          this.catquincenaService.getMaxAdicional(this.record.anio, this.record.quincena).subscribe(resp => {
            this.record.adicional = resp.adicional+1;
            this.modo_copiar=true;
          });
        }
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
}
