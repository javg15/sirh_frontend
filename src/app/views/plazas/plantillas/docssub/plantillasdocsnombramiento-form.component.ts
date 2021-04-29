import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { DatePipe } from '@angular/common'
import { ActivatedRoute } from '@angular/router';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Plantillasdocsnombramiento,Personal,Categorias,Plantillaspersonal,Catestatusplaza,Plazas,Categoriasdetalle } from '../../../../_models';
//import { Archivos } from '../../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';
import { PersonalService } from '../../personal/services/personal.service';
import { PlazasService } from '../../plazas/services/plazas.service';
import { CategoriasService } from '../../../catalogos/categorias/services/categorias.service';
import { CategoriasdetalleService } from '../../../catalogos/categorias/services/categoriasdetalle.service';

//import { ArchivosService } from '../../../catalogos/archivos/services/archivos.service';
import { PlantillasdocsNombramientoService } from '../services/plantillasdocsnombramiento.service';
import { PlantillasService } from '../services/plantillas.service';
import { CatestatusplazaService } from '../../../catalogos/catestatusplaza/services/catestatusplaza.service';
import { ListUploadComponent } from '../../../_shared/upload/list-upload.component';
import { FormUploadComponent } from '../../../_shared/upload/form-upload.component';
import { AutocompleteComponent } from 'angular-ng-autocomplete';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-plantillasdocsnombramiento-form',
  templateUrl: './plantillasdocsnombramiento-form.component.html',
  styleUrls: ['./plantillasdocs-form.component.css']
})

export class PlantillasDocsNombramientoFormComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción
  @Output() redrawEvent = new EventEmitter<any>();

  nombreModulo = 'Plantillaspersonaldocs';

  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;


  private elementModal: any;
  @ViewChild('id_personal_titular') id_personal_titular:AutocompleteComponent;
  @ViewChild('basicModalDocsNombramiento') basicModalDocsNombramiento: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;
  /*@ViewChild(ListUploadComponent) listUpload: ListUploadComponent;
  @ViewChild(FormUploadComponent) formUpload: FormUploadComponent;*/

  record: Plantillasdocsnombramiento;
  record_plantillaspersonal:Plantillaspersonal;
  record_titular:String;
  //recordFile:Archivos;
  keywordSearch = 'full_name';
  isLoadingSearch:boolean;
  catpersonalCat:Personal[];
  categoriasCat:Categorias[];
  categoriasdetalleCat:Categoriasdetalle[];
  catestatusplazaCat:Catestatusplaza[];
  plazasCat:Plazas[];
  convigencia:boolean;
  conlicencia:boolean;
  esinterina:boolean;
  esnombramiento:boolean;
  plazaOcupadaTitular:String;
  tipo:string;
  varAsignarHoras:boolean;
  varAsignarHorasSemestres:boolean;
  //recordJsonTipodoc1:any={UltimoGradodeEstudios:0,AreadeCarrera:0,Carrera:0,Estatus:0};

  constructor(private isLoadingService: IsLoadingService,
      private plantillasdocsnombramientoService: PlantillasdocsNombramientoService,
      private personalSvc: PersonalService,
      private categoriasSvc: CategoriasService,
      private plantillasSvc: PlantillasService,
      private catestatusplazaSvc: CatestatusplazaService,
      private plazasSvc: PlazasService,
      private categoriasdetalleSvc: CategoriasdetalleService,
    private el: ElementRef,
    //private archivosSvc:ArchivosService,
    public datepipe: DatePipe
      ) {
        this.elementModal = el.nativeElement;

  }

  newRecord(idParent:number): Plantillasdocsnombramiento {
    return {
      id: 0,  id_plantillaspersonal: idParent, id_archivos:0,
      fechaexpedicion: null,  id_catestatusplaza: 0,  fechaini: null, fechafin: null,
      id_personal_titular: 0,  horas: 0, horasb: 0,  id_categorias: 0, id_plazas:0,
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
    modal.plantillasdocsnombramientoService.add(modal);

      //loading
      this.userFormIsPending =this.isLoadingService.isLoading$({ key: 'loading' });
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.plantillasdocsnombramientoService.remove(this.id); //idModal
      this.elementModal.remove();
  }


  async submitAction(admin) {

    if(this.actionForm.toUpperCase()!=="VER"){

      this.validSummary.resetErrorMessages(admin);

      await this.isLoadingService.add(
      this.plantillasdocsnombramientoService.setRecord(this.record,this.actionForm).subscribe(async resp => {
        if (resp.hasOwnProperty('error')) {
          this.validSummary.generateErrorMessagesFromServer(resp.message);
        }
        else if(resp.message=="success"){
          if(this.actionForm.toUpperCase()=="NUEVO") this.actionForm="editar";
          this.record.id=resp.id;

          //actualizar el registro de la tabla archivos
          if(this.record.id_archivos>0){
              /*this.recordFile={id:this.record.id_archivos,
                  tabla:"plantillasdocsnombramiento",
                  id_tabla:this.record.id,
                  tipo: null,  nombre:  null,  datos: null,  id_usuarios_r: 0,
                  state: '',  created_at: null,   updated_at: null
                };

              await this.isLoadingService.add(
              this.archivosSvc.setRecordReferencia(this.recordFile,this.actionForm).subscribe(resp => {
                this.successModal.show();
                setTimeout(()=>{ this.successModal.hide(); }, 2000)
              }),{ key: 'loading' });*/
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
  async open(idItem: string, accion: string,idParent:number,tipo:number):  Promise<void> {
    this.actionForm=accion;
    this.botonAccion=actionsButtonSave[accion];
    this.tipo=(tipo==1?"nombramiento":"licencia");
    this.tituloForm="Preparación " + this.tipo +" - " + titulosModal[accion] + " registro";
    //this.formUpload.resetFile();
    this.record_titular="";

    await this.catestatusplazaSvc.getCatalogo(tipo).subscribe(resp => {
      this.catestatusplazaCat = resp;
    });

    if(idItem=="0"){
        this.record =this.newRecord(idParent);
        //this.listUpload.showFiles(0);

        //obtener el plantel de la plantilla
        this.plantillasSvc.getRecord(this.record.id_plantillaspersonal).subscribe(resp => {
          this.record_plantillaspersonal=resp;
          this.varAsignarHorasSemestres=(this.record_plantillaspersonal.id_catplantillas==4?true:false);

          this.onSelectTipoNombramiento(this.record.id_catestatusplaza);
        });
    } else {
      //obtener el registro
      this.plantillasdocsnombramientoService.getRecord(idItem).subscribe(resp => {
        this.record = resp;
        //this.listUpload.showFiles(this.record.id_archivos);

        if(this.record.id_personal_titular>0)//si es el titular
          this.personalSvc.getRecord(this.record.id_personal_titular).subscribe(resp => {
            this.record_titular = resp.nombre + " " + resp.apellidopaterno + " " + resp.apellidomaterno + " - " + resp.curp;
          });

        //obtener el plantel de la plantilla
        this.plantillasSvc.getRecord(this.record.id_plantillaspersonal).subscribe(resp => {
          this.record_plantillaspersonal=resp;
          this.varAsignarHorasSemestres=(this.record_plantillaspersonal.id_catplantillas==4?true:false);

          this.onSelectTipoNombramiento(this.record.id_catestatusplaza);
          this.onSelectCategorias(this.record.id_categorias);
          this.plazasSvc.getPlazaSegunPersonal(this.record.id_personal_titular).subscribe(resp => {
            this.plazaOcupadaTitular=resp[0].clave;
          });

        });
      });
    }



    // console.log($('#modalTest').html()); poner el id a algun elemento para testear
    this.basicModalDocsNombramiento.show();
  }

  //Archivo cargado
  onLoadedFile(idFile:number){
    this.record.id_archivos=idFile;
    //this.listUpload.showFiles(this.record.id_archivos);
  }

  // close modal
  close(): void {
      this.basicModalDocsNombramiento.hide();
      if(this.actionForm.toUpperCase()!="VER"){
        this.redrawEvent.emit(null);
      }
  }

  // log contenido de objeto en adminulario
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
    this.record.id_personal_titular=parseInt(items[2]);
    if(this.record.id_personal_titular>0)
      this.plazasSvc.getPlazaSegunPersonal(this.record.id_personal_titular).subscribe(resp => {
        this.plazaOcupadaTitular=resp[0].clave;
      });
  }

  onSelectTipoNombramiento(valor:any){

    if(valor!=""){
      let tipoNombramiento=this.catestatusplazaCat.find(x=>x.id==valor);

      this.convigencia=(tipoNombramiento.convigencia==1);
      this.conlicencia=(tipoNombramiento.conlicencia==1);
      this.esinterina=(tipoNombramiento.esinterina==1);
      this.esnombramiento=(tipoNombramiento.esnombramiento==1);

      if(this.esnombramiento){
        this.categoriasSvc.getCatalogoDisponibleEnPlantilla(this.record_plantillaspersonal.id_catplanteles,this.record.id_plazas,this.record_plantillaspersonal.id_catplantillas).subscribe(resp => {
          this.categoriasCat = resp;
        });
      }
      else{
        if(this.record.fechaini!=null){
          let dateString = this.record.fechaini + 'T00:00:00';
          let newDate = new Date(dateString);
          this.record.fechafin = new Date();
          this.record.fechafin.setDate( newDate.getDate() + 181 );

          let fechafin =this.datepipe.transform(this.record.fechafin, 'yyyy-MM-dd');
          setTimeout(()=>{ $('#txtFechafin').val(fechafin) }, 100)
        }
      }
    }
  }

  onSelectCategorias(valor:any){
    if(this.varAsignarHorasSemestres && this.categoriasCat!=null){
      this.record.horas=this.categoriasCat.find(a=>a.id==valor).horasasignadas;
      this.record.horasb=this.categoriasCat.find(a=>a.id==valor).horasasignadas;
    }

    this.categoriasdetalleSvc.getRecordSegunCategoria(valor).subscribe(resp => {
      this.varAsignarHoras=false;
      this.categoriasdetalleCat=resp;

      if(this.categoriasdetalleCat.length>0){
        if(this.categoriasdetalleCat[0].totalhorasaut>0)
          this.varAsignarHoras=true;
      }

    });
    this.plazasSvc.getCatalogoDisponibleSegunCategoria(valor,this.record.id_plazas).subscribe(resp => {
      this.plazasCat = resp;
    });
  }
}
