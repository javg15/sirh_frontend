import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { PlantillasService } from '../services/plantillas.service';
import { ActivatedRoute } from '@angular/router';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Plantillaspersonal, Catplantillas, Catplanteles, Personal } from '../../../../_models';
import { CatplantillasService } from '../../../catalogos/catplantillas/services/catplantillas.service';
import { CatplantelesService } from '../../../catalogos/catplanteles/services/catplanteles.service';
import { ValidationSummaryComponent } from '../../../_shared/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { PersonalService } from '../../personal/services/personal.service';
import { AutocompleteComponent } from 'angular-ng-autocomplete';

import { environment } from '../../../../../environments/environment';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-plantillas-form',
  templateUrl: './plantillas-form.component.html',
  styleUrls: ['./plantillas-form.component.css']
})

export class PlantillasFormComponent implements OnInit, OnDestroy {

  @Input() id: string;
  @Input() botonAccion: string;
  @Output() redrawEvent = new EventEmitter<any>();

  API_URL = environment.APIS_URL;

  nombreModulo = 'Plantillaspersonal';

  actionForm: string;
  tituloForm: string;

  private elementModal: any;
  @ViewChild('id_personal') id_personal:AutocompleteComponent;
  @ViewChild('basicModal') basicModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  record: Plantillaspersonal;
  recordpersonalCat:Personal={id: 0,curp: '', rfc: '',  homoclave: '',
      state: '', nombre: '', apellidopaterno: '', apellidomaterno:'',id_catestadocivil:0,
      fechanacimiento: null, id_catestadosresi: 0, id_catmunicipiosresi: 0, id_catlocalidadesresi: 0,
      telefono: '', email: '', emailoficial:'',observaciones:'',sexo:0,
      created_at: new Date(),  updated_at: new Date(), id_usuarios_r: 0
  };
  catplantillasCat:Catplantillas[];
  catplantelesCat:Catplanteles[];
  catpersonalCat:Personal[];
  keywordSearch = 'full_name';
  isLoadingSearch:boolean;

  constructor(private plantillasService: PlantillasService, private el: ElementRef,
    private catplantillasSvc: CatplantillasService,
    private catplantelesSvc: CatplantelesService,
    private personalSvc: PersonalService,
    private route: ActivatedRoute
      ) {
      this.elementModal = el.nativeElement;
      this.catplantillasSvc.getCatalogo().subscribe(resp => {
        this.catplantillasCat = resp;
      });
      this.catplantelesSvc.getCatalogo().subscribe(resp => {
        this.catplantelesCat = resp;
      });
  }

  newRecord(idCatplanteles:number,idCatplantillas:number): Plantillaspersonal {
    return {
      id: 0,  id_catplanteles: idCatplanteles, id_personal:0, id_catplantillas: idCatplantillas, consecutivo:0,id_usuarios_autoriza:0,
      state: '', created_at: new Date(),  updated_at: new Date(), id_usuarios_r: 0
    };
  }
  ngOnInit(): void {

    this.record =this.newRecord(0,0);

    let modal = this;

    // ensure id attribute exists
    if (!modal.id) {
        console.error('modal must have an id');
        return;
    }
    // add self (this modal instance) to the modal service so it's accessible from controllers
    modal.plantillasService.add(modal);
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.plantillasService.remove(this.id);
      this.elementModal.remove();
  }


  submitAction(form) {

    if(this.actionForm.toUpperCase()!=="VER"){
      //si es nuevo registro y no se tiene seleccionado ningun elemento en personal (autocomplete)
      if(this.id_personal.query=="" && this.actionForm.toUpperCase()=="NUEVO")
        this.record.id_personal=0;

      this.validSummary.resetErrorMessages(form);

      this.plantillasService.setRecord(this.record,this.actionForm).subscribe(resp => {
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
  // open modal
  open(idItem: string, accion: string,idCatplanteles:number,idCatplantillas:number):  void {
    this.actionForm=accion;
    this.botonAccion=actionsButtonSave[accion];
    this.tituloForm=titulosModal[accion] + " registro";

    //limpiar autocomplete
    this.id_personal.clear();this.id_personal.close();

    if(idItem=="0"){
      this.plantillasService.getConsecutivo(idCatplanteles,idCatplantillas).subscribe(resp => {
        this.record =this.newRecord(idCatplanteles,idCatplantillas);
        this.record.consecutivo=resp;
      });

    } else {
      //obtener el registro
      this.plantillasService.getRecord(idItem).subscribe(resp => {
        this.record = resp;
      });
      //obtener el registro del personal relacionado
      this.plantillasService.getRecordPersonal(idItem).subscribe(resp => {
        this.recordpersonalCat = resp;
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


  /*********************
   autocomplete id_personal
   *********************/
  onChangeSearchIdPersonal(val: string) {
    this.isLoadingSearch = true;
    this.personalSvc.getCatalogoSegunBusqueda(val).subscribe(resp => {
      this.catpersonalCat = resp;
      this.isLoadingSearch = false;
    });
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onSelectIdPersonal(val: any) {
    let items=val["full_name"].split(" -- ");
    this.record.id_personal=parseInt(items[2]);
    this.getConsecutivo()
    //obtener el registro del personal relacionado
    this.personalSvc.getRecord(this.record.id_personal).subscribe(resp => {
      this.recordpersonalCat = resp;
    });
  }

  onCatplantelesChange(){
    this.getConsecutivo()
  }
  onCatplanillasChange(){
    this.getConsecutivo()
  }

  getConsecutivo(){
    if(this.record.id_catplanteles>0 && this.record.id_catplantillas>0 && this.record.id_personal>0){
      this.plantillasService.getConsecutivo(this.record.id_catplanteles,this.record.id_catplantillas).subscribe(resp => {
        this.record.consecutivo=resp;
      });
    }
  }
}
