import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { DatePipe } from '@angular/common'
import { ActivatedRoute } from '@angular/router';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Plantillasdocsnombramiento,Plantillaspersonal,Catquincena, Catbajamotivo,
  Categorias,Plazas } from '../../../../_models';
//import { Archivos } from '../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';

//import { ArchivosService } from '../../../catalogos/archivos/services/archivos.service';
import { PlantillasdocsBajaService } from '../services/plantillasdocsbaja.service';
import { PlantillasService } from '../services/plantillas.service';
import { CatestatusplazaService } from '../../../catalogos/catestatusplaza/services/catestatusplaza.service';
import { CatquincenaService } from '../../../catalogos/catquincena/services/catquincena.service';
import { CatbajamotivoService } from '../../../catalogos/catbajamotivo/services/catbajamotivo.service';
import { ListUploadComponent } from '../../../_shared/upload/list-upload.component';
import { FormUploadComponent } from '../../../_shared/upload/form-upload.component';
import { AutocompleteComponent } from 'angular-ng-autocomplete';
import { PlazasService } from '../../../plazas/plazas/services/plazas.service';
import { CategoriasService } from '../../../catalogos/categorias/services/categorias.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-plantillasdocsbaja-form',
  templateUrl: './plantillasdocsbaja-form.component.html',
  styleUrls: ['./plantillasdocs-form.component.css']
})

export class PlantillasDocsBajaFormComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción
  @Output() redrawEvent = new EventEmitter<any>();

  nombreModulo = 'Plantillaspersonaldocs';

  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;


  private elementModal: any;
  @ViewChild('id_personal_titular') id_personal_titular:AutocompleteComponent;
  @ViewChild('basicModalDocsBaja') basicModalDocsBaja: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;
  /*@ViewChild(ListUploadComponent) listUpload: ListUploadComponent;
  @ViewChild(FormUploadComponent) formUpload: FormUploadComponent;*/

  record: Plantillasdocsnombramiento;
  record_plantillaspersonal:Plantillaspersonal;
  record_titular:String;
  record_id_pdn:number=0;//nombramiento relacionado con la palza seleccionada, para las plazas
  //recordFile:Archivos;
  keywordSearch = 'full_name';
  isLoadingSearch:boolean;
  catquincenaCat:Catquincena[];
  catbajamotivoCat:Catbajamotivo[];
  categoriasCat:Categorias[];
  plazasCat:Plazas[];

  constructor(private isLoadingService: IsLoadingService,
      private plantillasdocsbajaService: PlantillasdocsBajaService,
      private plantillasSvc: PlantillasService,
      private catbajamotivoSvc: CatbajamotivoService,
      private catquincenaSvc: CatquincenaService,
      private plazasSvc: PlazasService,
      private categoriasSvc: CategoriasService,
    private el: ElementRef,
    //private archivosSvc:ArchivosService,
    public datepipe: DatePipe
      ) {
        this.elementModal = el.nativeElement;
        this.catquincenaSvc.getCatalogo().subscribe(resp => {
          this.catquincenaCat = resp;
        });
        

  }

  newRecord(idParent:number): Plantillasdocsnombramiento {
    return {
      id: 0,  id_plantillaspersonal: idParent, id_archivos:0,
      fechaexpedicion: null,  id_catestatusplaza: 1,  fechaini: null, fechafin: null,
      id_personal_titular: 0,  horas: 0, horasb: 0,  id_categorias: 0, id_plazas:0,
      state: '', created_at: new Date(),  updated_at: new Date(), id_usuarios_r: 0,
      id_catquincena_ini:0,id_catquincena_fin:32767,id_catbajamotivo:0,id_catplanteles:0,
      id_catcentrostrabajo:0,id_catesquemapago:0,id_catfuncionprimaria:0,id_catfuncionsecundaria:0,
      id_cattipoocupacion:0,id_cattiposemestre:0,esplazabase:0,id_catplanteles_aplicacion:0,id_catfuncionplantilla:0,
      id_plazas_sql:0
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
    modal.plantillasdocsbajaService.add(modal);

      //loading
      this.userFormIsPending =this.isLoadingService.isLoading$({ key: 'loading' });
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.plantillasdocsbajaService.remove(this.id); //idModal
      this.elementModal.remove();
  }


  async submitAction(admin) {

    if(this.actionForm.toUpperCase()!=="VER"){

      this.validSummary.resetErrorMessages(admin);

      await this.isLoadingService.add(
      this.plantillasdocsbajaService.setRecord(this.record,this.actionForm).subscribe(async resp => {
        if (resp.hasOwnProperty('error')) {
          this.validSummary.generateErrorMessagesFromServer(resp.message);
        }
        else if(resp.message=="success"){
          let actionFormSQL=this.actionForm;

          if(this.actionForm.toUpperCase()=="NUEVO") this.actionForm="editar";
          this.record.id=resp.id;

          //Ejecutar sql server
          await this.isLoadingService.add(
            this.plantillasdocsbajaService.setRecordSQLServer(this.record,actionFormSQL,this.record_id_pdn).subscribe(async resp => {

                //actualizar el registro de la tabla archivos
                if(this.record.id_archivos>0){
                    /*this.recordFile={id:this.record.id_archivos,
                        tabla:"plantillasdocsbaja",
                        id_tabla:this.record.id,
                        tipo: null,  nombre:  null,  datos: null,  id_usuarios_r: 0,
                        state: '',  created_at: null,   updated_at: null
                      };

                    await this.isLoadingService.add(
                    this.archivosSvc.setRecordReferencia(this.recordFile,this.actionForm).subscribe(resp => {
                      this.successModal.show();
                      setTimeout(()=>{ this.successModal.hide(); this.close();}, 2000)
                    }),{ key: 'loading' });*/
                }
                else{
                  this.successModal.show();
                  setTimeout(()=>{ this.successModal.hide(); this.close();}, 2000)
                }
            })
          ,{ key: 'loading' });   
        }
      }),{ key: 'loading' });
    }
  }

  onSelectCategorias(valor:any){
      this.plazasSvc.getCatalogoVigenteSegunCategoria(valor,this.record.id_plantillaspersonal).subscribe(resp => {
        this.plazasCat = resp;
      });
  }

  onSelectPlazas(valor:any){
    //nombramiento relacionado, para licencias
    this.record_id_pdn=this.plazasCat.find(a=>a.id==valor)["id_pdn"];
  }

  // open modal
  async open(idItem: string, accion: string,idParent:number,tipoBaja:string):  Promise<void> {
    this.actionForm=accion;
    this.botonAccion=actionsButtonSave[accion];
    
    //this.formUpload.resetFile();
    this.record_titular="";


    this.catbajamotivoSvc.getCatalogo().subscribe(resp => {
      if(tipoBaja=="DE"){ //bajas definitivas
          this.catbajamotivoCat = resp.filter(a=>a.tipobaja=="DE");
          this.tituloForm="Baja administrativa definitiva - " + titulosModal[accion] + " registro";
      }
        else if(tipoBaja=="NO"){ //bajas de nombramientos
          this.catbajamotivoCat = resp.filter(a=>a.tipobaja=="NO");
          this.tituloForm="Baja administrativa de nombramiento - " + titulosModal[accion] + " registro";
        }
    });

    if(idItem=="0"){
        this.record =this.newRecord(idParent);
        //this.listUpload.showFiles(0);
        if(tipoBaja=="DE") //bajas definitivas
          this.record.id_catestatusplaza=1;
        else if(tipoBaja=="NO") //bajas de nombramientos
          this.record.id_catestatusplaza=2;

        //obtener el plantel de la plantilla
        this.plantillasSvc.getRecord(this.record.id_plantillaspersonal).subscribe(resp => {
          this.record_plantillaspersonal=resp;

          //para el caso de licenciamiento/baja, se debe elegir la categoria
          this.categoriasSvc.getCatalogoVigenteEnPlantilla(this.record.id_plantillaspersonal).subscribe(resp => {
            this.categoriasCat = resp;
          });
        });
    } else {
      //obtener el registro
      this.plantillasdocsbajaService.getRecord(idItem).subscribe(resp => {
        this.record = resp;
        //this.listUpload.showFiles(this.record.id_archivos);

        //para el caso de licenciamiento/baja, se debe elegir la categoria
        this.categoriasSvc.getRecordParaCombo(this.record.id_categorias).subscribe(respCat => {
          this.categoriasSvc.getCatalogoVigenteEnPlantilla(this.record.id_plantillaspersonal).subscribe(resp => {
            this.categoriasCat = resp;
            //si se esta editando o consultando se agrega el registro de la categoria almacenada, esto debido a que la funcion
            //getCatalogoVigenteEnPlantilla ya no regresa la categoria registrada
            this.categoriasCat.push(respCat[0])
            this.onSelectCategorias(respCat[0].id)
          });
        });
      });
    }




    this.basicModalDocsBaja.show();
  }


  //Archivo cargado
  onLoadedFile(idFile:number){
    this.record.id_archivos=idFile;
    //this.listUpload.showFiles(this.record.id_archivos);
  }

  // close modal
  close(): void {
      this.basicModalDocsBaja.hide();
      if(this.actionForm.toUpperCase()!="VER"){
        this.redrawEvent.emit("plantillasdocsbaja");
      }
  }

  // log contenido de objeto en adminulario
  get diagnosticValidate() { return JSON.stringify(this.record); }


}
