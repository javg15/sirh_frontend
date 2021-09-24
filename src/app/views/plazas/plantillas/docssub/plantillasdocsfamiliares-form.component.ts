import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Plantillasdocsfamiliares } from '../../../../_models';
import { Archivos } from '../../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';

import { ArchivosService } from '../../../catalogos/archivos/services/archivos.service';
import { PlantillasdocsFamiliaresService } from '../services/plantillasdocsfamiliares.service';
import { ListUploadComponent } from '../../../_shared/upload/list-upload.component';
import { FormUploadComponent } from '../../../_shared/upload/form-upload.component';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-plantillasdocsfamiliares-form',
  templateUrl: './plantillasdocsfamiliares-form.component.html',
  styleUrls: ['./plantillasdocs-form.component.css']
})

export class PlantillasDocsFamiliaresFormComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción
  @Output() redrawEvent = new EventEmitter<any>();

  nombreModulo = 'Plantillaspersonaldocs';

  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;

  private elementModal: any;

  @ViewChild('basicModalDocsFamiliares') basicModalDocsFamiliares: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;
  @ViewChild(ListUploadComponent) listUpload: ListUploadComponent;
  @ViewChild(FormUploadComponent) formUpload: FormUploadComponent;

  record: Plantillasdocsfamiliares;
  recordFile:Archivos;
  keywordSearch = 'full_name';
  isLoadingSearch:boolean;
  //recordJsonTipodoc1:any={UltimoGradodeEstudios:0,AreadeCarrera:0,Carrera:0,Estatus:0};

  constructor(private isLoadingService: IsLoadingService,
      private plantillasdocsfamiliaresService: PlantillasdocsFamiliaresService,
    private el: ElementRef,
    private archivosSvc:ArchivosService
      ) {
        this.elementModal = el.nativeElement;
  }

  newRecord(idParent:number): Plantillasdocsfamiliares {
    return {
      id: 0,  id_plantillaspersonal: idParent, id_archivos:0,
      curp:'',rfc:'',homoclave:'',nombre:'',apellidopaterno:'',apellidomaterno:'',
      fechanacimiento:null,sexo:'',
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
    modal.plantillasdocsfamiliaresService.add(modal);

      //loading
      this.userFormIsPending =this.isLoadingService.isLoading$({ key: 'loading' });
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.plantillasdocsfamiliaresService.remove(this.id); //idModal
      this.elementModal.remove();
  }


  async submitAction(admin) {

    if(this.actionForm.toUpperCase()!=="VER"){

      this.validSummary.resetErrorMessages(admin);

      await this.isLoadingService.add(
      this.plantillasdocsfamiliaresService.setRecord(this.record,this.actionForm).subscribe(async resp => {
        if (resp.hasOwnProperty('error')) {
          this.validSummary.generateErrorMessagesFromServer(resp.message);
        }
        else if(resp.message=="success"){
          if(this.actionForm.toUpperCase()=="NUEVO") this.actionForm="editar";
          this.record.id=resp.id;

          //actualizar el registro de la tabla archivos
          if(this.record.id_archivos>0){
              this.recordFile={id:this.record.id_archivos,
                  tabla:"plantillasdocsfamiliares",
                  id_tabla:this.record.id,
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
      }),{ key: 'loading' });
    }
  }

  // open modal
  open(idItem: string, accion: string,idParent:number):  void {
    this.actionForm=accion;
    this.botonAccion=actionsButtonSave[accion];
    this.tituloForm="Datos Familiares - " + titulosModal[accion] + " registro";
    this.formUpload.resetFile();

    if(idItem=="0"){
        this.record =this.newRecord(idParent);
        this.listUpload.showFiles(0);
    } else {
      //obtener el registro
      this.plantillasdocsfamiliaresService.getRecord(idItem).subscribe(resp => {
        this.record = resp;
        this.listUpload.showFiles(this.record.id_archivos);
      });
    }

    // console.log($('#modalTest').html()); poner el id a algun elemento para testear
    this.basicModalDocsFamiliares.show();
  }

  //Archivo cargado
  onLoadedFile(idFile:number){
    this.record.id_archivos=idFile;
    this.listUpload.showFiles(this.record.id_archivos);
  }

  // close modal
  close(): void {
      this.basicModalDocsFamiliares.hide();
      if(this.actionForm.toUpperCase()!="VER"){
        this.redrawEvent.emit(null);
      }
  }

  // log contenido de objeto en adminulario
  get diagnosticValidate() { return JSON.stringify(this.record); }

  onChangeCurp(curp){
    this.record.curp=curp.toUpperCase();
    let rfc=this.record.curp.toString().substring(0,10);
    this.record.rfc=rfc;

    let fechanacimiento=curp.toString().substring(4,10);
    //console.log("fechanacimiento=",fechanacimiento)
    let fecha="";
    if(parseInt(fechanacimiento.substring(0,2))>20)
      fecha="19" +fechanacimiento.substring(0,2) + "-" + fechanacimiento.substring(2,4) + "-" + fechanacimiento.substring(4,6);
    else
      fecha="20" +fechanacimiento.substring(0,2) + "-" + fechanacimiento.substring(2,4) + "-" + fechanacimiento.substring(4,6);

    let fechaTxt=fecha
    fecha+="T00:00:00"
    this.record.fechanacimiento=new Date(fecha);
    setTimeout(()=>{ $('#txtFechanacimiento').val(fechaTxt) }, 100)


  }
}
