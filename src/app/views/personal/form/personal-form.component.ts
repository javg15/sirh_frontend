import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { PersonalService } from '../services/personal.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Usuarios } from '../../../_models';
import { ValidationSummaryComponent } from '../../_shared/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../src/environments/environment';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.css']
})

export class PersonalFormComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() botonAccion: string;
  @Output() redrawEvent = new EventEmitter<any>();
  actionForm: string;
  tituloForm: string;

  private elementModal: any;
  @ViewChild('basicModal') basicModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  record: Usuarios;


  constructor(private personalService: PersonalService, private el: ElementRef) {
      this.elementModal = el.nativeElement;
  }

  newRecord(): Usuarios {
    return {
      id: 0,  username: '',   pass: '',
      uPassenc: '',  perfil: 0,  nombre: '',   numemp: '',   created_at: new Date(),  updated_at: new Date(),
      id_permgrupos: 0, id_usuarios_r: 0, state: '',  email: ''
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
      modal.personalService.add(modal);
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.personalService.remove(this.id);
      this.elementModal.remove();
  }

  submitAction(form) {
    this.validSummary.resetErrorMessages(form);

    this.personalService.setRecord(this.record,this.actionForm).subscribe(resp => {
      if (resp.hasOwnProperty('error')) {
        this.validSummary.generateErrorMessagesFromServer(resp.message);
      }
    });
  }

  // open modal
  open(idItem: string, accion: string):  void {
    this.actionForm=accion;
    this.botonAccion=actionsButtonSave[accion];
    this.tituloForm=titulosModal[accion] + " registro";

    if(idItem=="0"){
      this.record =this.newRecord();
    } else {
    this.personalService.getRecord(idItem).subscribe(resp => {
      this.record = resp;
    });
  }

    // console.log($('#modalTest').html()); poner el id a algun elemento para testear
    this.basicModal.show();
  }

  // close modal
  close(): void {
      this.basicModal.hide();
      if(this.actionForm.toUpperCase()!="EDITAR"){
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
