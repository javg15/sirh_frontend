import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../../../../_services/token-storage.service';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Personalexpediente, Catdocumentos } from '../../../../_models';
import { Archivos } from '../../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';

import { ArchivosService } from '../../../catalogos/archivos/services/archivos.service';
import { PersonalexpedienteFormService } from '../services/personalexpedienteform.service';
import { CatdocumentosService } from '../../../catalogos/catdocumentos/services/catdocumentos.service';
import { ListUploadFisicoComponent } from '../../../_shared/upload_fisico/list-uploadFisico.component';
import { FormUploadFisicoComponent } from '../../../_shared/upload_fisico/form-uploadFisico.component';
import { relativeTimeThreshold } from 'moment';


declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-personalexpediente-form',
  templateUrl: './personalexpediente-form.component.html',
  styleUrls: ['./personalexpediente-form.component.css']
})

export class PersonalexpedienteFormComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción
  @Output() redrawEvent = new EventEmitter<any>();

  nombreModulo = 'Personalexpediente';

  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;
  
  private elementModal: any;

  @ViewChild('basicModalPersonalexpediente') basicModalPersonalexpediente: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;
  @ViewChild(ListUploadFisicoComponent) listUpload: ListUploadFisicoComponent;
  @ViewChild(FormUploadFisicoComponent) formUpload: FormUploadFisicoComponent;


  record: Personalexpediente;
  recordFile:Archivos;
  catdocumentosCat: Catdocumentos[];
  keywordSearch = 'full_name';
  isLoadingSearch: boolean;
  esinterina: boolean=false;


  //recordJsonTipodoc1:any={UltimoGradodeEstudios:0,AreadeCarrera:0,Carrera:0,Estatus:0};

  constructor(
    private tokenStorage: TokenStorageService,
    private isLoadingService: IsLoadingService,
    private personalexpedienteformService: PersonalexpedienteFormService,
    private catdocumentosSvc: CatdocumentosService,
    private el: ElementRef,
    private archivosSvc:ArchivosService,
    private route: ActivatedRoute
  ) {
    this.elementModal = el.nativeElement;

    this.catdocumentosSvc.getCatalogo().subscribe(resp => {
      this.catdocumentosCat = resp;
    });
  }

  newRecord(idParent: number, idSemestre: number): Personalexpediente {
    return {
      id: 0, id_personal: idParent, id_catdocumentos: 0, id_archivos: 0,
      observaciones:"",
      state: '', created_at: new Date(), updated_at: new Date(), id_usuarios_r: 0
    };
  }
  ngOnInit(): void {

    this.record = this.newRecord(0, 0);

    let modal = this;

    // ensure id attribute exists
    if (!modal.id) {//idModal {
      console.error('modal must have an id');
      return;
    }
    // add self (this modal instance) to the modal service so it's accessible from controllers
    modal.personalexpedienteformService.add(modal);

    //loading
    this.userFormIsPending = this.isLoadingService.isLoading$({ key: 'loading' });

    //quincena activa
    //this.record_quincena_activa = this.route.snapshot.data.dataHoraAsignacion;
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.personalexpedienteformService.remove(this.id); //idModal
    this.elementModal.remove();
  }


  async submitAction(admin) {

    if (this.actionForm.toUpperCase() !== "VER") {

      this.validSummary.resetErrorMessages(admin);

      
        await this.isLoadingService.add(
          this.personalexpedienteformService.setRecord(this.record, this.actionForm).subscribe(async resp => {
            if (resp.hasOwnProperty('error')) {
              this.validSummary.generateErrorMessagesFromServer(resp.message);
            }
            else if (resp.message == "success") {
              if (this.actionForm.toUpperCase() == "NUEVO") this.actionForm = "editar";
              this.record.id = resp.id;

              //actualizar el registro de la tabla archivos
              //id_archivos ya tomó el valor desde el evento onLoadedFile
              if(this.record.id_archivos>0){
                this.recordFile={id:this.record.id_archivos,
                    tabla:"personalexpediente",
                    id_tabla:this.record.id,ruta:"personal/expediente",
                    tipo: null,  nombre:  null,  datos: null,  id_usuarios_r: 0,
                    state: '',  created_at: null,   updated_at: null
                  };

                await this.isLoadingService.add(
                this.archivosSvc.setRecordReferencia(this.recordFile,this.actionForm).subscribe(resp => {
                  this.successModal.show();
                  setTimeout(()=>{ this.successModal.hide(); this.close();}, 2000)
                }),{ key: 'loading' });
              }
              else{
                this.successModal.show();
                setTimeout(()=>{ this.successModal.hide(); this.close();}, 2000)
              }
            }
          }), { key: 'loading' });
        
    }
  }

  //Archivo cargado
  onLoadedFile(idFile:number){
    this.record.id_archivos=idFile;
    this.listUpload.showFiles(this.record.id_archivos);
  }

  // open modal
  open(idItem: string, accion: string, idPersonal: number, idSemestre: number, idPlantel:number): void {
    this.actionForm = accion;
    this.botonAccion = actionsButtonSave[accion];
    this.tituloForm = "Expediente de personal - " + titulosModal[accion] + " registro";

    if (idItem == "0") {
      this.record = this.newRecord(idPersonal, idSemestre);
    } else {
      //obtener el registro
        this.personalexpedienteformService.getRecord(idItem).subscribe(async resp => {
          this.record = resp;
          this.listUpload.showFiles(this.record.id_archivos);
      });
    }

    // console.log($('#modalTest').html()); poner el id a algun elemento para testear
    this.basicModalPersonalexpediente.show();
  }

  // close modal
  close(): void {
    this.basicModalPersonalexpediente.hide();
    if (this.actionForm.toUpperCase() != "VER") {
      this.redrawEvent.emit(null);
    }
  }

  // log contenido de objeto en adminulario
  get diagnosticValidate() { return JSON.stringify(this.record); }



}
