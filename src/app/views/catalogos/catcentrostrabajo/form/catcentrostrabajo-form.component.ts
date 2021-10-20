import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CatcentrostrabajoService } from '../services/catcentrostrabajo.service';
import { CatplantelesService } from '../../catplanteles/services/catplanteles.service';
import { CattipocentrotrabajoService } from '../../cattipocentrotrabajo/services/cattipocentrotrabajo.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Catcentrostrabajo, Cattipocentrotrabajo, Catplanteles } from '../../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../../src/environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-catcentrostrabajo-form',
  templateUrl: './catcentrostrabajo-form.component.html',
  styleUrls: ['./catcentrostrabajo-form.component.css']
})

export class CatcentrostrabajoFormComponent implements OnInit, OnDestroy {
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

  record: Catcentrostrabajo;
  catplantelesCat:Catplanteles[];
  cattipocentrotrabajoCat: Cattipocentrotrabajo[];


  constructor(private isLoadingService: IsLoadingService,
      private catcentrostrabajoService: CatcentrostrabajoService, private el: ElementRef,
      private catplantelesSvc: CatplantelesService,
      private cattipocentrotrabajoSvc: CattipocentrotrabajoService
      ) {
      this.elementModal = el.nativeElement;
      this.catplantelesSvc.getCatalogo().subscribe(resp => {
        this.catplantelesCat = resp;
      });

  }

  newRecord(): Catcentrostrabajo {
    return {
      id: 0,clave: 0,descripcion: '', zona: 0,  id_cattipoct: 0,
      state: '', id_catplanteles: 0, id_qnaini: 0, id_qnafin: 0,
      id_ctant: 0, titular: '', id_categoriaasoc: 0, ficticia: 0,
      id_cattipoctpp: 0, created_at: new Date(),  updated_at: new Date(), id_usuarios_r: 0
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
      modal.catcentrostrabajoService.add(modal);

      //loading
      this.userFormIsPending =this.isLoadingService.isLoading$({ key: 'loading' });
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.catcentrostrabajoService.remove(this.id); //idModal
      this.elementModal.remove();
  }

  onSelectPlantel(select_plantel) {
    let clave=$("#selectPlantel option:selected").text().split("-")[0];
    this.record.id_catplanteles=select_plantel.value;
    this.record.id_cattipoct=0;
    this.cattipocentrotrabajoCat=[];
    if(parseInt(clave)>=1 && parseInt(clave)<=71){
        this.cattipocentrotrabajoCat = [{id:7,descripcion:"Planteles",id_plantelct:0,id_usuarios_r:0
          ,created_at:new Date(),updated_at:new Date(),state:"",habilitado:0}];
    }
    else if(parseInt(clave)>=91 && parseInt(clave)<=98){
      this.cattipocentrotrabajoCat = [{id:1,descripcion:"Coordinación de zonas",id_plantelct:0,id_usuarios_r:0
          ,created_at:new Date(),updated_at:new Date(),state:"",habilitado:0}];
    }
    else if(parseInt(clave)==90){
      this.cattipocentrotrabajoCat = [{id:8,descripcion:"Sindicato",id_plantelct:0,id_usuarios_r:0
          ,created_at:new Date(),updated_at:new Date(),state:"",habilitado:0}];
    }
    else{
      this.cattipocentrotrabajoSvc.getCatalogoAdministrativo().subscribe(resp => {
        this.cattipocentrotrabajoCat = resp;
      });
    }
  }

  async submitAction(form) {

    if(this.actionForm.toUpperCase()!=="VER"){
      this.validSummary.resetErrorMessages(form);

      await this.isLoadingService.add(
      this.catcentrostrabajoService.setRecord(this.record,this.actionForm).subscribe(resp => {
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
    this.tituloForm="Centros de trabajo - " +titulosModal[accion] + " registro";

    if(idItem=="0"){
      this.record =this.newRecord();
    } else {
      this.cattipocentrotrabajoSvc.getCatalogoAdministrativoTipos().subscribe(resp => {
        this.cattipocentrotrabajoCat = resp;
        this.catcentrostrabajoService.getRecord(idItem).subscribe(resp => {
          this.record = resp;
        });
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
