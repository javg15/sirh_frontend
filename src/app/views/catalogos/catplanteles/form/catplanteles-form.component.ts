import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CatplantelesService } from '../services/catplanteles.service';
import { CatzonaeconomicaService } from '../../catzonaeconomica/services/catzonaeconomica.service';
import { CatzonageograficaService } from '../../catzonageografica/services/catzonageografica.service';
import { CatregionesService } from '../../catregiones/services/catregiones.service';
import { CatmunicipiosService } from '../../catmunicipios/services/catmunicipios.service';
import { CatlocalidadesService } from '../../catlocalidades/services/catlocalidades.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Catplanteles } from '../../../../_models';
import { Catzonaeconomica } from '../../../../_models';
import { Catzonageografica } from '../../../../_models';
import { Catregiones } from '../../../../_models';
import { Catmunicipios } from '../../../../_models';
import { Catlocalidades } from '../../../../_models';
import { Catturnos } from '../../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../../src/environments/environment';


declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-catplanteles-form',
  templateUrl: './catplanteles-form.component.html',
  styleUrls: ['./catplanteles-form.component.css']
})

export class CatplantelesFormComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() botonAccion: string;
  @Output() redrawEvent = new EventEmitter<any>();
  actionForm: string;
  tituloForm: string;

  private elementModal: any;
  @ViewChild('basicModal') basicModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  record: Catplanteles;
  catzonaeconomicaCat:Catzonaeconomica[];
  catzonageograficaCat:Catzonageografica[];
  catregionesCat:Catregiones[];
  catmunicipiosCat:Catmunicipios[];
  catlocalidadesCat:Catlocalidades[];


  constructor(private catplantelesService: CatplantelesService, private el: ElementRef,
      private catzonaeconomicaSvc: CatzonaeconomicaService,
      private catzonageograficaSvc: CatzonageograficaService,
      private catregionesSvc: CatregionesService,
      private catmunicipiosSvc: CatmunicipiosService,
    private catlocalidadesSvc: CatlocalidadesService
      ) {
      this.elementModal = el.nativeElement;
      this.catzonaeconomicaSvc.getCatalogo().subscribe(resp => {
        this.catzonaeconomicaCat = resp;
      });
      this.catzonageograficaSvc.getCatalogo().subscribe(resp => {
        this.catzonageograficaCat = resp;
      });
      this.catregionesSvc.getCatalogo().subscribe(resp => {
        this.catregionesCat = resp;
      });

  }

  newRecord(): Catplanteles {
    return {
      id: 0,  id_catcentrostrabajo: 0, clave: 0, descripcion: '', ubicacion: '', id_catzonaeconomica: 0,
      id_catzonageografica: 0, adscrip: '', aniocreacion: 0, id_catzonaeconomica2: 0,
      id_catregion: 0, id_catplantelesasociado: 0, tipoplantel: '', clavectse: '', id_turno: 0,
      telefono: '', email: '', domicilio: '', latitud: '', longitud: '',
      emsad: 0, state: '', id_catlocalidades: 0, id_catmunicipios: 0, created_at: new Date(),  updated_at: new Date(),
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
      modal.catplantelesService.add(modal);
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.catplantelesService.remove(this.id);
      this.elementModal.remove();
  }

  onSelectRegion(id_region) {
    this.record.id_catregion=id_region;
    this.record.id_catmunicipios=0;
    this.catlocalidadesCat=[];
    //console.log(this.catmunicipiosCat);
    this.catmunicipiosSvc.getCatalogo(id_region).subscribe(resp => {
      this.catmunicipiosCat = resp;
    });
  }

  onSelectMunicipio(id_municipio) {
    this.record.id_catmunicipios=id_municipio;
    this.record.id_catlocalidades=0;
    this.catlocalidadesSvc.getCatalogo(id_municipio).subscribe(resp => {
      this.catlocalidadesCat = resp;
    });
  }

  submitAction(form) {

    if(this.actionForm.toUpperCase()!=="VER"){
      this.validSummary.resetErrorMessages(form);

      this.catplantelesService.setRecord(this.record,this.actionForm).subscribe(resp => {
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
    this.catplantelesService.getRecord(idItem).subscribe(resp => {
      this.record = resp;
      this.catmunicipiosSvc.getCatalogo(this.record.id_catregion).subscribe(resp => {
        this.catmunicipiosCat = resp;
        this.catlocalidadesSvc.getCatalogo(this.record.id_catmunicipios).subscribe(resp => {
          this.catlocalidadesCat = resp;
          /*this.catplantelesService.getRecord(idItem).subscribe(resp => {
            this.record = resp;
          });*/
        });
      });
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
