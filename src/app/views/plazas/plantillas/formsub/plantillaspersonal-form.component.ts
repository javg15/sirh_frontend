import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { DataTablesResponse } from '../../../../classes/data-tables-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Plantillaspersonal,Personal } from '../../../../_models';

import { ValidationSummaryComponent } from '../../../_shared/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';

import { PlantillaspersonalService } from '../services/plantillaspersonal.service';
import { PersonalService } from '../../personal/services/personal.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-plantillaspersonal-form',
  templateUrl: './plantillaspersonal-form.component.html',
  styleUrls: ['./plantillaspersonal-form.component.css']
})

export class PlantillaspersonalFormComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() botonAccion: string;
  @Input() varEditarHorPla: string = "1";
  @Output() redrawEvent = new EventEmitter<any>();

  /* El decorador @ViewChild recibe la clase DataTableDirective, para luego poder
  crear el dtElement que represente la tabla que estamos creando. */
  @ViewChild(DataTableDirective)
  @ViewChild('id_personal') id_personal;
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<DataTableDirective> = new Subject();


  actionForm: string;
  tituloForm: string;

  private elementModal: any;
  @ViewChild('basicModal') basicModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  record: Plantillaspersonal;
  catpersonalCat:Personal[];
  recordpersonalCat:Personal;
  keywordSearch = 'full_name';
  isLoadingSearch:boolean;

  constructor(
    private el: ElementRef,
    private plantillaspersonalService: PlantillaspersonalService,
    private personalSvc: PersonalService,
      ) {
      this.elementModal = el.nativeElement;

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
      modal.plantillaspersonalService.add(modal);
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.plantillaspersonalService.remove(this.id);
      this.elementModal.remove();
  }


  submitAction(form) {

    if(this.actionForm.toUpperCase()!=="VER"){
      this.validSummary.resetErrorMessages(form);

      this.plantillaspersonalService.setRecord(this.record,this.actionForm).subscribe(resp => {
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
  open(idItem: string, accion: string,idCatplanteles:number,idCatplantillas:number):  void {
    this.actionForm=accion;
    this.botonAccion=actionsButtonSave[accion];
    this.tituloForm=titulosModal[accion] + " registro";

    if(idItem=="0"){
      this.record =this.newRecord(idCatplanteles,idCatplantillas);
    } else {
      //obtener el registro
      this.plantillaspersonalService.getRecord(idItem).subscribe(resp => {
        this.record = resp;
      });
      //obtener el registro del personal relacionado
      this.plantillaspersonalService.getRecordPersonal(idItem).subscribe(resp => {
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


  /* autocomplete id_personal */
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
    console.log(items[2]);
    this.record.id_personal=parseInt(items[2]);
  }
}
