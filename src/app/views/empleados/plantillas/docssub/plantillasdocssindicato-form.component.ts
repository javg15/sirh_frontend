import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Personalsindicato,Catsindicato } from '../../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';

import { PlantillasdocsSindicatoService } from '../services/plantillasdocssindicato.service';
import { CatsindicatoService } from '../../../catalogos/catsindicato/services/catsindicato.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-plantillasdocssindicato-form',
  templateUrl: './plantillasdocssindicato-form.component.html',
  styleUrls: ['./plantillasdocs-form.component.css']
})

export class PlantillasDocsSindicatoFormComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción
  @Output() redrawEvent = new EventEmitter<any>();

  nombreModulo = 'Plantillaspersonaldocs';

  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;

  private elementModal: any;

  @ViewChild('basicModalDocsSindicato') basicModalDocsSindicato: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  record: Personalsindicato;
  keywordSearch = 'full_name';
  isLoadingSearch:boolean;
  catsindicatoCat:Catsindicato[];
  //recordJsonTipodoc1:any={UltimoGradodeEstudios:0,AreadeCarrera:0,Carrera:0,Estatus:0};

  constructor(private isLoadingService: IsLoadingService,
      private plantillasdocssindicatoService: PlantillasdocsSindicatoService,
      private catsindicatoSvc:CatsindicatoService,
    private el: ElementRef,
      ) {
        this.elementModal = el.nativeElement;

        this.catsindicatoSvc.getCatalogo().subscribe(resp => {
          this.catsindicatoCat = resp;
        });
  }

  newRecord(idParent:number): Personalsindicato {
    return {
      id: 0,  id_personal: idParent, id_archivos:0,
      id_catsindicato:0,fechainscripcion:null,
      state: '', created_at: new Date(),  updated_at: new Date(), id_usuarios_r: 0
    };
  }
  ngOnInit(): void {

    this.record =this.newRecord(0);

    let modal = this;

    // ensure id attribute exists
    if (!modal.id) {//idModal {
        console.error('modal must have an id');
        return;
    }
    // add self (this modal instance) to the modal service so it's accessible from controllers
    modal.plantillasdocssindicatoService.add(modal);

      //loading
      this.userFormIsPending =this.isLoadingService.isLoading$({ key: 'loading' });
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.plantillasdocssindicatoService.remove(this.id); //idModal
      this.elementModal.remove();
  }


  async submitAction(admin) {

    if(this.actionForm.toUpperCase()!=="VER"){

      this.validSummary.resetErrorMessages(admin);

      await this.isLoadingService.add(
      this.plantillasdocssindicatoService.setRecord(this.record,this.actionForm).subscribe(async resp => {
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

  // open modal
  open(idItem: string, accion: string,idParent:number):  void {
    this.actionForm=accion;
    this.botonAccion=actionsButtonSave[accion];
    this.tituloForm="Datos Sindicato - " + titulosModal[accion] + " registro";

    if(idItem=="0"){
        this.record =this.newRecord(idParent);
    } else {
      //obtener el registro
      this.plantillasdocssindicatoService.getRecord(idItem).subscribe(resp => {
        this.record = resp;
      });
    }


    this.basicModalDocsSindicato.show();
  }

  //Archivo cargado
  onLoadedFile(idFile:number){
    this.record.id_archivos=idFile;
  }

  // close modal
  close(): void {
      this.basicModalDocsSindicato.hide();
      if(this.actionForm.toUpperCase()!="VER"){
        this.redrawEvent.emit("plantillasdocssindicato");
      }
  }

  // log contenido de objeto en adminulario
  get diagnosticValidate() { return JSON.stringify(this.record); }


}
