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
import { UploadFisicoFileService } from '../../../_shared/upload_fisico/uploadFisico-file.service';
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
    private uploadFileSvc:UploadFisicoFileService,
    private route: ActivatedRoute
  ) {
    this.elementModal = el.nativeElement;

    this.catdocumentosSvc.getCatalogo().subscribe(resp => {
      this.catdocumentosCat = resp;
    });
  }

  newRecord(idParent: number): Personalexpediente {
    return {
      id: 0, id_personal: idParent, id_catdocumentos: 0, id_archivos: 0,
      observaciones:"",
      state: '', created_at: new Date(), updated_at: new Date(), id_usuarios_r: 0
    };
  }
  ngOnInit(): void {

    this.record = this.newRecord(0);

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


  submitAction(admin) {

    if (this.actionForm.toUpperCase() !== "VER") {

      this.validSummary.resetErrorMessages(admin);
      if(this.record.id_catdocumentos<=0)
        this.validSummary.generateErrorMessagesFromServer({id_catdocumentos: "Seleccione el tipo de documento a cargar"});
      else{
        if(this.actionForm.toUpperCase()==="NUEVO"){
          //primero cargar el archivo
          this.formUpload.ruta="personal/expediente/" +
            this.record.id_personal.toString().padStart(5 , "0")+ "/" +
            this.record.id_catdocumentos.toString().padStart(2 , "0");
          //el metodo .upload, emitirá el evento que cachará el metodo  onLoadedFile de este archivo
          this.formUpload.upload()
        }
        else if(this.actionForm.toUpperCase()==="EDITAR" || this.actionForm.toUpperCase()==="ELIMINAR"){
          //Solo se edita información, el archivo no se puede reemplazar, solo eliminar
          this.isLoadingService.add(
            this.personalexpedienteformService.setRecord(this.record, this.actionForm).subscribe(async resp => {
              if (resp.hasOwnProperty('error')) {
                this.validSummary.generateErrorMessagesFromServer(resp.message);
              }
              else if (resp.message == "success") {
                this.record.id=resp.id;

                  this.successModal.show();
                  setTimeout(()=>{ this.successModal.hide(); this.close();}, 2000)
              }
          }), { key: 'loading' });
        }
      }
    }
  }

  //Archivo cargado. Eventos disparado desde el componente
  async onLoadedFile(datos:any){
      //ingresar el registro de la tabla archivos
      this.recordFile={
        id:0,
        tabla:"personalexpediente",
        id_tabla:0,ruta:datos.ruta,
        tipo: datos.tipo,  nombre:  datos.nombrearchivo,  datos: null,  id_usuarios_r: 0,
        state: '',  created_at: null,   updated_at: null
      };
          //ingresar el registro de expediente
    await this.isLoadingService.add(
      this.archivosSvc.setRecord(this.recordFile,this.actionForm).subscribe(resp => {
        this.record.id_archivos=resp.id;
        this.recordFile.id=resp.id;
        //registrar el expediente
        this.personalexpedienteformService.setRecord(this.record, this.actionForm).subscribe(async resp => {
          if (resp.hasOwnProperty('error')) {
            this.validSummary.generateErrorMessagesFromServer(resp.message);
          }
          else if (resp.message == "success") {
            this.record.id=resp.id;
            if (this.actionForm.toUpperCase() == "NUEVO") this.actionForm = "editar";

            //actualizar la referencia en el archivo
            this.recordFile.id_tabla=this.record.id;
            this.archivosSvc.setRecordReferencia(this.recordFile,this.actionForm).subscribe(resp => {
              this.successModal.show();
              setTimeout(()=>{ this.successModal.hide(); this.close();}, 2000)
            });
          }
        })
      })
    , { key: 'loading' });
  }

  // open modal
  open(idItem: string, accion: string, idPersonal: number): void {
    this.actionForm = accion;
    this.botonAccion = actionsButtonSave[accion];
    this.tituloForm = "Expediente de personal - " + titulosModal[accion] + " registro";
    this.formUpload.resetFile();
    if (idItem == "0") {
      this.record = this.newRecord(idPersonal);
      this.formUpload.showFile();
      this.listUpload.showFiles(0);
    } else {
      //obtener el registro
        this.personalexpedienteformService.getRecord(idItem).subscribe(async resp => {
          this.record = resp;
          this.formUpload.hideFile();
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

  //muestra el archivo
  getFile(ruta,tipo,nombre){
    this.uploadFileSvc.getFile(ruta,tipo,nombre);
  }

  // log contenido de objeto en adminulario
  get diagnosticValidate() { return JSON.stringify(this.record); }

}
