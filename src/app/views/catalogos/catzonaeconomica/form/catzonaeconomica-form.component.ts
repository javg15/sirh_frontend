import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CatzonaeconomicaService } from '../services/catzonaeconomica.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Catzonaeconomica } from '../../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../../src/environments/environment';


declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-catzonaeconomica-form',
  templateUrl: './catzonaeconomica-form.component.html',
  styleUrls: ['./catzonaeconomica-form.component.css']
})

export class CatzonaeconomicaFormComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() botonAccion: string;
  @Output() redrawEvent = new EventEmitter<any>();
  actionForm: string;
  tituloForm: string;

  private elementModal: any;
  @ViewChild('basicModal') basicModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  record: Catzonaeconomica;
  catzonaeconomicaCat:Catzonaeconomica[];

  constructor(private catzonaeconomicaService: CatzonaeconomicaService, private el: ElementRef

      ) {
      this.elementModal = el.nativeElement;
  }

  newRecord(): Catzonaeconomica {
    return {
      id: 0,  clave: 0, descripcion: '', porcentaje:0, state: '', created_at: new Date(),  updated_at: new Date(),
      id_usuarios_r: 0,
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
      modal.catzonaeconomicaService.add(modal);
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.catzonaeconomicaService.remove(this.id);
      this.elementModal.remove();
  }


  submitAction(form) {

    if(this.actionForm.toUpperCase()!=="VER"){
      this.validSummary.resetErrorMessages(form);

      this.catzonaeconomicaService.setRecord(this.record,this.actionForm).subscribe(resp => {
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
    } else {
    this.catzonaeconomicaService.getRecord(idItem).subscribe(resp => {
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
