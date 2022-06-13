import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Personalestudios,Catestudiosniveles,Catestudioscarreras } from '../../../../_models';
import { Archivos } from '../../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';

import { CatestudiosnivelesService } from '../../../catalogos/catestudiosniveles/services/catestudiosniveles.service';
import { CatestudioscarrerasService } from '../../../catalogos/catestudioscarreras/services/catestudioscarreras.service';
import { PersonalEstudiosAdminService } from '../services/personalestudiosadmin.service';
import { PersonalEstudiosFormService } from '../services/personalestudiosform.service';
import { ArchivosService } from '../../../catalogos/archivos/services/archivos.service';

import { ListUploadFisicoComponent } from '../../../_shared/upload_fisico/list-uploadFisico.component';
import { FormUploadFisicoComponent } from '../../../_shared/upload_fisico/form-uploadFisico.component';
import { UploadFisicoFileService } from '../../../_shared/upload_fisico/uploadFisico-file.service';
import { Console } from 'console';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-personalestudios-form',
  templateUrl: './personalestudios-form.component.html',
  
})

export class PersonalEstudiosFormComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción
  @Output() redrawEvent = new EventEmitter<any>();

  nombreModulo = 'Personalestudios';

  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;

  private elementModal: any;

  @ViewChild('basicModalDocsProfesional') basicModalDocsProfesional: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;
  @ViewChild(ListUploadFisicoComponent) listUpload: ListUploadFisicoComponent;
  @ViewChild(FormUploadFisicoComponent) formUpload: FormUploadFisicoComponent;

  record: Personalestudios;
  recordFile:Archivos;
  catestudiosnivelesCat: Catestudiosniveles[];
  catestudioscarrerasCat: Catestudioscarreras[];
  keywordSearch = 'full_name';
  isLoadingSearch:boolean;
  //recordJsonTipodoc1:any={UltimoGradodeEstudios:0,AreadeCarrera:0,Carrera:0,Estatus:0};

  constructor(private isLoadingService: IsLoadingService,
    private personalestudiosadminService: PersonalEstudiosAdminService,
    private personalestudiosformService: PersonalEstudiosFormService,
    private catestudiosnivelesSvc: CatestudiosnivelesService,
    private catestudioscarrerasSvc: CatestudioscarrerasService,
    private el: ElementRef,
    private archivosSvc:ArchivosService,
    private uploadFileSvc:UploadFisicoFileService,
      ) {
        this.elementModal = el.nativeElement;

        this.catestudiosnivelesSvc.getCatalogo().subscribe(resp => {
          this.catestudiosnivelesCat = resp;
        });
  }

  newRecord(idParent:number): Personalestudios {
    return {
      id: 0, id_personal: idParent,  id_archivos: 0,
      id_catestudioscarreras:0,id_catestudiosniveles:0,titulado:0,id_catestudiosniveles_ultimo:0,
      siglasini:'',incompleta:0,cursando:0,numcedprof:'',
      state: '', created_at: new Date(), updated_at: new Date(), id_usuarios_r: 0
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
    modal.personalestudiosadminService.add(modal);

      //loading
      this.userFormIsPending =this.isLoadingService.isLoading$({ key: 'loading' });
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.personalestudiosadminService.remove(this.id); //idModal
      this.elementModal.remove();
  }


  async submitAction(admin) {


    if(this.actionForm.toUpperCase()!=="VER"){

      this.validSummary.resetErrorMessages(admin);
      let archivoModificado=false;//para saber si ya se realizo algun upload, y con él, la llamada a la funcion setRecord()

      if(this.actionForm.toUpperCase()==="NUEVO" || this.actionForm.toUpperCase()==="EDITAR"){
        //el metodo .upload, emitirá el evento que cachará el metodo  onLoadedFile de este archivo
        if(this.formUpload.selectedFiles){
          archivoModificado=true;
          this.formUpload.ruta="personal/estudios/" +
            this.record.id_personal.toString().padStart(5 , "0")
          await this.formUpload.upload();
        }
      }
      
      if(archivoModificado==false || this.actionForm.toUpperCase()==="ELIMINAR"){
        this.setRecord();
      }
    }

    /*if(this.actionForm.toUpperCase()!=="VER"){

      this.validSummary.resetErrorMessages(admin);
        if(this.actionForm.toUpperCase()==="NUEVO"){
          
          if(this.formUpload.selectedFiles){//si se seleccionó algun archivo
            //primero cargar el archivo
            this.formUpload.ruta="personal/estudios/" +
              this.record.id_personal.toString().padStart(5 , "0")
            //el metodo .upload, emitirá el evento que cachará el metodo  onLoadedFile de este archivo
            this.formUpload.upload()
          }
          else{
            this.personalestudiosformService.setRecord(this.record, this.actionForm).subscribe(async resp => {
              if (resp.hasOwnProperty('error')) {
                this.validSummary.generateErrorMessagesFromServer(resp.message);
              }
              else if (resp.message == "success") {
                this.record.id=resp.id;
                if (this.actionForm.toUpperCase() == "NUEVO") this.actionForm = "editar";
                this.successModal.show();
                setTimeout(()=>{ this.successModal.hide(); this.close();}, 2000)
              }
            })
          }
        }
        else if(this.actionForm.toUpperCase()==="EDITAR" || this.actionForm.toUpperCase()==="ELIMINAR"){
          //Solo se edita información, el archivo no se puede reemplazar, solo eliminar
          this.isLoadingService.add(
            this.personalestudiosformService.setRecord(this.record, this.actionForm).subscribe(async resp => {
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
    }*/
  }

  setRecord(){
      this.isLoadingService.add(
        this.personalestudiosformService.setRecord(this.record, this.actionForm).subscribe(async resp => {
          if (resp.hasOwnProperty('error')) {
            this.validSummary.generateErrorMessagesFromServer(resp.message);
          }
          else if (resp.message == "success") {
            if(this.actionForm.toUpperCase()=="NUEVO") this.actionForm="editar";
            this.record.id=resp.id;
            this.successModal.show();
            setTimeout(()=>{ this.successModal.hide(); this.close();}, 2000)
          }
        }), { key: 'loading' }
      );
  }

  onSelectNivel(valor:any){
    this.catestudioscarrerasSvc.getCatalogoSegunNivel(valor).subscribe(resp => {
      this.catestudioscarrerasCat = resp;
    });
  }

  // open modal
  open(idItem: string, accion: string,idParent:number):  void {
    this.actionForm=accion;
    this.botonAccion=actionsButtonSave[accion];
    this.tituloForm="Estudios - " + titulosModal[accion] + " registro";
    this.formUpload.resetFile();

    if (idItem == "0") {
      this.record = this.newRecord(idParent);
      
      this.formUpload.showFile();
      this.listUpload.showFiles(0);
    } else {
      //obtener el registro
        this.personalestudiosformService.getRecord(idItem).subscribe(async resp => {
          this.record = resp;
          this.onSelectNivel(this.record.id_catestudiosniveles)
          if(this.record.id_archivos>0)
            this.formUpload.hideFile();
          else
            this.formUpload.showFile();
          this.listUpload.showFiles(this.record.id_archivos);
      });
    }


    this.basicModalDocsProfesional.show();
  }

  //Archivo cargado
  //Archivo cargado. Eventos disparado desde el componente
  async onLoadedFile(datos:any){
      //ingresar el registro de la tabla archivos
      this.recordFile={
        id:0,
        tabla:"personalestudios",
        id_tabla:0,ruta:datos.ruta,
        tipo: datos.tipo,  nombre:  datos.nombrearchivo,  datos: null,  id_usuarios_r: 0,
        state: '',  created_at: null,   updated_at: null
      };

      this.setRecordFile();
    }

  async setRecordFile()
  {
        //ingresar el registro de estudios
        await this.isLoadingService.add(
          this.archivosSvc.setRecord(this.recordFile,this.actionForm).subscribe(resp => {
            this.record.id_archivos=resp.id;
            this.recordFile.id=resp.id;
            //registrar el estudios
            this.personalestudiosformService.setRecord(this.record, this.actionForm).subscribe(async resp => {
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

    
  async onRemoveFile(datos:any){
    if(this.record.id_archivos==datos.id){this.record.id_archivos=0;}
  }


  // close modal
  close(): void {
      this.basicModalDocsProfesional.hide();
      if(this.actionForm.toUpperCase()!="VER"){
        this.redrawEvent.emit("personalestudiosform");
      }
  }

  //muestra el archivo
  getFile(ruta,tipo,nombre){
    this.uploadFileSvc.getFile(ruta,tipo,nombre);
  }

  // log contenido de objeto en adminulario
  get diagnosticValidate() { return JSON.stringify(this.record); }
}
