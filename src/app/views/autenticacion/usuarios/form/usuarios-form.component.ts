import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { CatestadosService } from '../../../catalogos/catestados/services/catestados.service';
import { CatmunicipiosService } from '../../../catalogos/catmunicipios/services/catmunicipios.service';
import { CatlocalidadesService } from '../../../catalogos/catlocalidades/services/catlocalidades.service';
import { CatestadocivilService } from '../../../catalogos/catestadocivil/services/catestadocivil.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Usuarios,  Catestados, Catmunicipios, Catlocalidades, Catestadocivil } from '../../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';
import { Archivos } from '../../../../_models';
import { ArchivosService } from '../../../catalogos/archivos/services/archivos.service';

import { ListUploadComponent } from '../../../_shared/upload/list-upload.component';
import { FormUploadComponent } from '../../../_shared/upload/form-upload.component';


declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})

export class UsuariosFormComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción
  @Output() redrawEvent = new EventEmitter<any>();
  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;

  private elementModal: any;
  @ViewChild('basicModal') basicModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;
  @ViewChild(ListUploadComponent) listUpload: ListUploadComponent;
  @ViewChild(FormUploadComponent) formUpload: FormUploadComponent;

  record: Usuarios;
  passConfirm:String;
  recordFile:Archivos;
  catestadosCat:Catestados[];
  catmunicipiosCat:Catmunicipios[];
  catlocalidadesCat: Catlocalidades[];
  catestadocivilCat: Catestadocivil[];


  constructor(private isLoadingService: IsLoadingService,
      private usuariosService: UsuariosService, private el: ElementRef,
      private archivosSvc:ArchivosService,
      ) {
      this.elementModal = el.nativeElement;
  }

  newRecord(): Usuarios {
    return {
      id: 0,  username: '',   pass: '',
      uPassenc: '',  perfil: 0,  nombre: '',   numemp: '',   created_at: new Date(),  updated_at: new Date(),
      id_permgrupos: 0, id_usuarios_r: 0, state: '',  email: '', id_archivos_avatar:0
    };
  }
  ngOnInit(): void {

      this.record =this.newRecord();

      let modal = this;

      // ensure id attribute exists
      if (!modal.id) {//idModal {
          console.error('modal must have an id');
          return;
      }
      // add self (this modal instance) to the modal service so it's accessible from controllers
      modal.usuariosService.add(modal);

      //loading
      this.userFormIsPending =this.isLoadingService.isLoading$({ key: 'loading' });
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.usuariosService.remove(this.id); //idModal
      this.elementModal.remove();
  }


  async submitAction(form) {

    if(this.actionForm.toUpperCase()!=="VER"){
      this.validSummary.resetErrorMessages(form);

      await this.isLoadingService.add(
      this.usuariosService.setRecord(this.record,this.actionForm).subscribe(async resp => {
        if (resp.hasOwnProperty('error')) {
          this.validSummary.generateErrorMessagesFromServer(resp.message);
        }
        else if(resp.message=="success"){
          if(this.actionForm.toUpperCase()==="NUEVO") this.actionForm="editar";
          this.record.id=resp.id;

          //actualizar el registro de la tabla archivos
          if(this.record.id_archivos_avatar>0){
            this.recordFile={id:this.record.id_archivos_avatar,
                  tabla:"usuarios",
                  id_tabla:this.record.id,
                  tipo: null,  nombre:  null,  datos: null,  id_usuarios_r: 0,
                  state: '',  created_at: null,   updated_at: null
                };

                await this.isLoadingService.add(this.archivosSvc.setRecordReferencia(this.recordFile,this.actionForm).subscribe(resp => {
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

  //Archivo cargado
  onLoadedFile(idFile:number){
    this.record.id_archivos_avatar=idFile;
    this.listUpload.showFiles(this.record.id_archivos_avatar);
  }

  // open modal
  open(idItem: string, accion: string):  void {
    this.actionForm=accion;
    this.botonAccion=actionsButtonSave[accion];
    this.tituloForm=titulosModal[accion] + " registro";

    if(idItem=="0"){
      this.record =this.newRecord();
    } else {

    this.usuariosService.getRecord(idItem).subscribe(resp => {
      this.record = resp;
      this.listUpload.showFiles(this.record.id_archivos_avatar);
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
