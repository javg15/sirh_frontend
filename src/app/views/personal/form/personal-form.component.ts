import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { PersonalService } from '../services/personal.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Usuarios } from '../../../_models';
import { ValidationSummaryComponent } from '../../_shared/validation-summary.component';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.css']
})

export class PersonalFormComponent implements OnInit, OnDestroy {
  @Input() id: string;

  private elementModal: any;
  @ViewChild('basicModal') basicModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  record: Usuarios;

  constructor(private personalService: PersonalService, private el: ElementRef) {
      this.elementModal = el.nativeElement;
  }

  ngOnInit(): void {

      this.record ={
        id: 0,  username: '',   pass: '',
  uPassenc: '',  perfil: 0,  nombre: '',   numemp: '',   createdAt: new Date(),  updatedAt: new Date(),
  idPermgrupos: 0, idUsuariosR: 0, state: '',  email: ''
      };

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

    this.personalService.setRecord(this.record).subscribe(resp => {
      if (resp.hasOwnProperty('error')) {
        this.validSummary.generateErrorMessagesFromServer(resp.message);
      }
    });
  }

  // open modal
  open(idItem: string):  void {

      this.personalService.getRecord(idItem).subscribe(resp => {
        this.record = resp;
      });

      // console.log($('#modalTest').html()); poner el id a algun elemento para testear
      this.basicModal.show();
  }

  // close modal
  close(): void {
      this.basicModal.hide();
  }

  // log contenido de objeto en formulario
  get diagnosticValidate() { return JSON.stringify(this.record); }
}
