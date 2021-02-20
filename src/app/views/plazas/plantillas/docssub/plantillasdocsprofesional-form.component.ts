import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Plantillasdocsprofesional } from '../../../../_models';
import { Archivos } from '../../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';

import { ArchivosService } from '../../../catalogos/archivos/services/archivos.service';
import { PlantillasdocsProfesionalService } from '../services/plantillasdocsprofesional.service';
import { ListUploadComponent } from '../../../_shared/upload/list-upload.component';
import { FormUploadComponent } from '../../../_shared/upload/form-upload.component';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-plantillasdocsprofesional-form',
  templateUrl: './plantillasdocsprofesional-form.component.html',
  styleUrls: ['./plantillasdocs-form.component.css']
})

export class PlantillasDocsProfesionalFormComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción
  @Output() redrawEvent = new EventEmitter<any>();

  nombreModulo = 'Plantillaspersonaldocs';

  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;

  private elementModal: any;

  @ViewChild('basicModalDocsProfesional') basicModalDocsProfesional: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;
  @ViewChild(ListUploadComponent) listUpload: ListUploadComponent;
  @ViewChild(FormUploadComponent) formUpload: FormUploadComponent;

  record: Plantillasdocsprofesional;
  recordFile:Archivos;
  keywordSearch = 'full_name';
  isLoadingSearch:boolean;
  //recordJsonTipodoc1:any={UltimoGradodeEstudios:0,AreadeCarrera:0,Carrera:0,Estatus:0};

  constructor(private isLoadingService: IsLoadingService,
      private plantillasdocsprofesionalService: PlantillasdocsProfesionalService,
    private el: ElementRef,
    private archivosSvc:ArchivosService
      ) {
        this.elementModal = el.nativeElement;
  }

  newRecord(idParent:number): Plantillasdocsprofesional {
    return {
      id: 0,  id_plantillaspersonal: idParent, id_archivos:0,
      ultimogradoestudios:0,areacarrera:0,carrera:0,estatus:0,
      fechaexpedicion:null,
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
    modal.plantillasdocsprofesionalService.add(modal);

      //loading
      this.userFormIsPending =this.isLoadingService.isLoading$({ key: 'loading' });
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.plantillasdocsprofesionalService.remove(this.id); //idModal
      this.elementModal.remove();
  }


  async submitAction(admin) {

    if(this.actionForm.toUpperCase()!=="VER"){

      this.validSummary.resetErrorMessages(admin);

      await this.isLoadingService.add(
      this.plantillasdocsprofesionalService.setRecord(this.record,this.actionForm).subscribe(async resp => {
        if (resp.hasOwnProperty('error')) {
          this.validSummary.generateErrorMessagesFromServer(resp.message);
        }
        else if(resp.message=="success"){
          if(this.actionForm.toUpperCase()==="NUEVO") this.actionForm="editar";
          this.record.id=resp.id;

          //actualizar el registro de la tabla archivos
          if(this.record.id_archivos>0){
              this.recordFile={id:this.record.id_archivos,
                  tabla:"plantillasdocsprofesional",
                  id_tabla:this.record.id,
                  tipo: null,  nombre:  null,  datos: null,  id_usuarios_r: 0,
                  state: '',  created_at: null,   updated_at: null
                };

              await this.isLoadingService.add(
              this.archivosSvc.setRecordReferencia(this.recordFile,this.actionForm).subscribe(resp => {
                this.successModal.show();
                setTimeout(()=>{ this.successModal.hide(); }, 2000)
              }),{ key: 'loading' });
          }
          else{
            this.successModal.show();
            setTimeout(()=>{ this.successModal.hide(); }, 2000)
          }
        }
      }),{ key: 'loading' });
    }
  }

  // open modal
  open(idItem: string, accion: string,idParent:number):  void {
    this.actionForm=accion;
    this.botonAccion=actionsButtonSave[accion];
    this.tituloForm="Preparación profesional - " + titulosModal[accion] + " registro";
    this.formUpload.resetFile();

    if(idItem=="0"){
        this.record =this.newRecord(idParent);
        this.listUpload.showFiles(0);
    } else {
      //obtener el registro
      this.plantillasdocsprofesionalService.getRecord(idItem).subscribe(resp => {
        this.record = resp;
        this.listUpload.showFiles(this.record.id_archivos);
      });
    }

    // console.log($('#modalTest').html()); poner el id a algun elemento para testear
    this.basicModalDocsProfesional.show();
  }

  //Archivo cargado
  onLoadedFile(idFile:number){
    this.record.id_archivos=idFile;
    this.listUpload.showFiles(this.record.id_archivos);
  }

  // close modal
  close(): void {
      this.basicModalDocsProfesional.hide();
      if(this.actionForm.toUpperCase()!="VER"){
        this.redrawEvent.emit({
          campo: 0,
          operador: 0,
          valor: ''
        });
      }
  }

  // log contenido de objeto en adminulario
  get diagnosticValidate() { return JSON.stringify(this.record); }
}
