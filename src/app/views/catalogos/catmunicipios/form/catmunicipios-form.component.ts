import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CatmunicipiosService } from '../services/catmunicipios.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Catmunicipios } from '../../../../_models';
import { CatestadosService } from '../../catestados/services/catestados.service';
import { Catestados } from '../../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';


declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-catmunicipios-form',
  templateUrl: './catmunicipios-form.component.html',
  styleUrls: ['./catmunicipios-form.component.css']
})

export class CatmunicipiosFormComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() botonAccion: string;
  @Output() redrawEvent = new EventEmitter<any>();
  actionForm: string;
  tituloForm: string;

  private elementModal: any;
  @ViewChild('basicModal') basicModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  record: Catmunicipios;
  catmunicipiosCat:Catmunicipios[];
  catestadosCat:Catestados[];

  constructor(private catmunicipiosService: CatmunicipiosService, private el: ElementRef,
    private catestadosSvc: CatestadosService,
      ) {
      this.elementModal = el.nativeElement;
      this.catestadosSvc.getCatalogo().subscribe(resp => {
        this.catestadosCat = resp;
      });
  }

  newRecord(): Catmunicipios {
    return {
      id: 0,  clave: 0, descripcion: '', state: '', created_at: new Date(),  updated_at: new Date(),
      id_usuarios_r: 0,siglas: '', id_catregiones: 0,id_catestados: 0
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
      modal.catmunicipiosService.add(modal);
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.catmunicipiosService.remove(this.id);
      this.elementModal.remove();
  }


  submitAction(form) {

    if(this.actionForm.toUpperCase()!=="VER"){
      this.validSummary.resetErrorMessages(form);

      this.catmunicipiosService.setRecord(this.record,this.actionForm).subscribe(resp => {
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
    this.catmunicipiosService.getRecord(idItem).subscribe(resp => {
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
