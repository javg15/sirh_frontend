import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { SemestreService } from '../services/semestre.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Semestre } from '../../../../_models';
import { CatquincenaService } from '../../catquincena/services/catquincena.service';
import { Catquincena } from '../../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../../src/environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';
import * as moment from 'moment';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-semestre-form',
  templateUrl: './semestre-form.component.html',
  styleUrls: ['./semestre-form.component.css']
})

export class SemestreFormComponent implements OnInit, OnDestroy {
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

  record: Semestre;
  catquincenaCat:Catquincena[];
  anioCat:any[]=[];


  constructor(private isLoadingService: IsLoadingService,
      private semestreService: SemestreService, private el: ElementRef,
    private catquincenaSvc: CatquincenaService,
      ) {
      this.elementModal = el.nativeElement;
      this.catquincenaSvc.getCatalogo().subscribe(resp => {
        this.catquincenaCat = resp;
      });
      for(let i=moment().year(); i>=2000;i--)
        this.anioCat.push({anio:i})
  }

  newRecord(): Semestre {
    return {
      id: 0,  tipo: '', anio: 0, quincena: 0, qnainiciosemestre: '',  qnafinsemestre: '',
      actual: 0, id_catquincena_ini: 0,  id_catquincena_fin: 0, id_catquincena_fininterinas: 0,
      permitemodificacion: 0, permitecargadeplantillas: 0,
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
      modal.semestreService.add(modal);

      //loading
      this.userFormIsPending =this.isLoadingService.isLoading$({ key: 'loading' });
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.semestreService.remove(this.id); //idModal
      this.elementModal.remove();
  }


  async submitAction(form) {

    if(this.actionForm.toUpperCase()!=="VER"){
      this.validSummary.resetErrorMessages(form);

      await this.isLoadingService.add(
      this.semestreService.setRecord(this.record,this.actionForm).subscribe(resp => {
        if (resp.hasOwnProperty('error')) {
          this.validSummary.generateErrorMessagesFromServer(resp.message);
        }
        else if(resp.message=="success"){
          if(this.actionForm.toUpperCase()=="NUEVO") this.actionForm="editar";
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
    this.tituloForm="Semestre - " +titulosModal[accion] + " registro";

    if(idItem=="0"){
      this.record =this.newRecord();
    } else {
    this.semestreService.getRecord(idItem).subscribe(resp => {
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

  // log contenido de objeto en formulario
  get diagnosticValidate() { return JSON.stringify(this.record); }

  onSelectTipo(valor){

    if(this.record.anio>0 && valor!="-"){
      if(valor=="A"){
        this.record.id_catquincena_ini=this.catquincenaCat.find(a=>a.anio==this.record.anio && a.quincena==3).id;
        this.record.id_catquincena_fin=this.catquincenaCat.find(a=>a.anio==this.record.anio && a.quincena==14).id;
        this.record.id_catquincena_fininterinas=this.catquincenaCat.find(a=>a.anio==this.record.anio && a.quincena==13).id;
      }
      else if(valor=="B"){
        let aniomas=parseInt(this.record.anio.toString())+1;
        this.record.id_catquincena_ini=this.catquincenaCat.find(a=>a.anio==this.record.anio && a.quincena==15).id;
        this.record.id_catquincena_fin=this.catquincenaCat.find(a=>a.anio==aniomas && a.quincena==2).id;
        this.record.id_catquincena_fininterinas=this.catquincenaCat.find(a=>a.anio==aniomas && a.quincena==1).id;
      }
      else{
        this.record.id_catquincena_ini=0;this.record.id_catquincena_fin=0;this.record.id_catquincena_fininterinas=0;
      }
    }
    else{
      this.record.id_catquincena_ini=0;this.record.id_catquincena_fin=0;this.record.id_catquincena_fininterinas=0;
    }
  }
}
