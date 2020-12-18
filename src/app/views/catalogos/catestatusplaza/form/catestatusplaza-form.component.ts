import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { CatestatusplazaService } from '../services/catestatusplaza.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Catestatusplaza } from '../../../../_models';
import { CattiponominaService } from '../../cattiponomina/services/cattiponomina.service';
import { Cattiponomina } from '../../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../../src/environments/environment';


declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-catestatusplaza-form',
  templateUrl: './catestatusplaza-form.component.html',
  styleUrls: ['./catestatusplaza-form.component.css']
})

export class CatestatusplazaFormComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() botonAccion: string;
  @Output() redrawEvent = new EventEmitter<any>();
  actionForm: string;
  tituloForm: string;

  private elementModal: any;
  @ViewChild('basicModal') basicModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  record: Catestatusplaza;
  cattipoocupacionCat:Cattiponomina[];
  cattipoCat:any[];

  constructor(private catestatusplazaService: CatestatusplazaService, private el: ElementRef,
    private cattiponominaSvc: CattiponominaService,
      ) {
      this.elementModal = el.nativeElement;
      this.cattiponominaSvc.getCatalogo().subscribe(resp => {
        this.cattipoocupacionCat = resp;
      });
      this.cattipoCat=[{id:'',descripcion:''},{id:'AD',descripcion:'ADMINISTRATIVO'},{id:'DO',descripcion:'DOCENTE'},{id:'DI',descripcion:'DIRECTIVO'}];
  }

  newRecord(): Catestatusplaza {
    return {
      id: 0,  descripcion: '', id_estatussig:'',strid_nombramiento:'', tipoocupplaza:'',
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
      modal.catestatusplazaService.add(modal);
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.catestatusplazaService.remove(this.id);
      this.elementModal.remove();
  }


  submitAction(form) {

    if(this.actionForm.toUpperCase()!=="VER"){
      this.validSummary.resetErrorMessages(form);

      this.catestatusplazaService.setRecord(this.record,this.actionForm).subscribe(resp => {
        if (resp.hasOwnProperty('error')) {
          this.validSummary.generateErrorMessagesFromServer(resp.message);
        }
        else if(resp.message=="success"){
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
    } else {
    this.catestatusplazaService.getRecord(idItem).subscribe(resp => {
      this.record = resp;
    });
  }

    // console.log($('#modalTest').html()); poner el id a algun elemento para testear
    this.basicModal.show();
  }

  // close modal
  close(): void {
      this.basicModal.hide();
      if(this.actionForm.toUpperCase()=="NUEVO"){
        this.redrawEvent.emit({
          campo: 0,
          operador: 0,
          valor: ''
        });
      }
  }

  // log contenido de objeto en formulario
  get diagnosticValidate() { return JSON.stringify(this.record); }
}
