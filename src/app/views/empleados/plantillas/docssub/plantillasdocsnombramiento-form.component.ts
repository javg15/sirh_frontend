import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { DatePipe } from '@angular/common'
import { ActivatedRoute } from '@angular/router';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Plantillasdocsnombramiento,Personal,Categorias,Plantillaspersonal,Catestatusplaza,
    Plazas,Categoriasdetalle,Catquincena, Catfuncionprimaria,Catfuncionsecundaria,Catesquemapago,
    Cattiposemestre, Catplanteles,Catcentrostrabajo,Catplantillas } from '../../../../_models';
//import { Archivos } from '../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { Observable, zip } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';
import { PersonalService } from '../../../catalogos/personal/services/personal.service';
import { PersonalhorasService } from '../../personalhoras/services/personalhoras.service';
import { PlazasService } from '../../../plazas/plazas/services/plazas.service';
import { CategoriasService } from '../../../catalogos/categorias/services/categorias.service';
import { CategoriasdetalleService } from '../../../catalogos/categorias/services/categoriasdetalle.service';
import { CatquincenaService } from '../../../catalogos/catquincena/services/catquincena.service';
import { CatfuncionprimariaService } from '../../../catalogos/catfuncionprimaria/services/catfuncionprimaria.service';
import { CatfuncionsecundariaService } from '../../../catalogos/catfuncionsecundaria/services/catfuncionsecundaria.service';
import { CattiposemestreService } from '../../../catalogos/cattiposemestre/services/cattiposemestre.service';
import { CatesquemapagoService } from '../../../catalogos/catesquemapago/services/catesquemapago.service';
import { CatplantelesService } from '../../../catalogos/catplanteles/services/catplanteles.service';
import { CatcentrostrabajoService } from '../../../catalogos/catcentrostrabajo/services/catcentrostrabajo.service';
import { CatzonaeconomicaService } from '../../../catalogos/catzonaeconomica/services/catzonaeconomica.service';
import { CatzonageograficaService } from '../../../catalogos/catzonageografica/services/catzonageografica.service';

//import { ArchivosService } from '../../../catalogos/archivos/services/archivos.service';
import { PlantillasdocsNombramientoService } from '../services/plantillasdocsnombramiento.service';
import { PlantillasService } from '../services/plantillas.service';
import { CatplantillasService } from '../../../catalogos/catplantillas/services/catplantillas.service';
import { CatestatusplazaService } from '../../../catalogos/catestatusplaza/services/catestatusplaza.service';
import { ListUploadComponent } from '../../../_shared/upload/list-upload.component';
import { FormUploadComponent } from '../../../_shared/upload/form-upload.component';
import { AutocompleteComponent } from 'angular-ng-autocomplete';
import { ClipboardService } from 'ngx-clipboard'

import * as moment from 'moment';
import { filter, map, mergeMap, switchMap } from 'rxjs/operators';

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
  record_catplantillas:Catplantillas;
  record_titular:String;
  record_disponibles_horas:number;
  record_disponibles_horasb:number;
  record_plantel:string;
  record_txtzonaeconomica:string;
  record_txtzonageografica:string;
  //recordFile:Archivos;
  keywordSearch = 'full_name';
  isLoadingSearch:boolean;
  catpersonalCat:Personal[];
  categoriasCat:Categorias[];
  categoriasdetalleCat:Categoriasdetalle[];
  catestatusplazaCat:Catestatusplaza[];
  plazasCat:Plazas[];
  catquincenaCat:Catquincena[];
  catfuncionprimariaCat:Catfuncionprimaria[];
  catfuncionsecundariaCat:Catfuncionsecundaria[];
  cattiposemestreCat:Cattiposemestre[];
  catesquemapagoCat:Catesquemapago[];
  catplantelesCat:Catplanteles[];
  catcentrostrabajoCat:Catcentrostrabajo[];

  convigencia:boolean;
  conlicencia:boolean;
  esinterina:boolean;
  esnombramiento:boolean;
  plazaOcupadaTitular:String;
  tipo:string;
  varAsignarHorasPlazasPorJornada:boolean;
  varAsignarHorasPlazasPorHora:boolean;
  seRevisoCargaHoraria:boolean=true; //se activa cuando se pica en el boton de editar carga horaria, por default tiene valor de true
  //recordJsonTipodoc1:any={UltimoGradodeEstudios:0,AreadeCarrera:0,Carrera:0,Estatus:0};

  constructor(private isLoadingService: IsLoadingService,
      private plantillasdocsnombramientoService: PlantillasdocsNombramientoService,
      private personalSvc: PersonalService,
      private personalhorasSvc: PersonalhorasService,
      private categoriasSvc: CategoriasService,
      private plantillasSvc: PlantillasService,
      private catestatusplazaSvc: CatestatusplazaService,
      private plazasSvc: PlazasService,
      private categoriasdetalleSvc: CategoriasdetalleService,
      private catquincenaSvc: CatquincenaService,
      private catfuncionprimariaSvc: CatfuncionprimariaService,
      private catfuncionsecundariaSvc: CatfuncionsecundariaService,
      private catesquemapagoSvc: CatesquemapagoService,
      private cattiposemestreSvc: CattiposemestreService,
      private catplantelesSvc: CatplantelesService,
      private catcentrostrabajoSvc: CatcentrostrabajoService,
      private catzonaeconomicaSvc: CatzonaeconomicaService,
      private catzonageograficaSvc: CatzonageograficaService,
      private catplantillasSvc: CatplantillasService,
      private clipboardService: ClipboardService,
    private el: ElementRef,
    //private archivosSvc:ArchivosService,
    public datepipe: DatePipe
      ) {
        this.elementModal = el.nativeElement;
        this.catquincenaSvc.getCatalogoSegunAnio(moment().format('YYYY')).subscribe(resp => {
          this.catquincenaCat = resp;
        });
        this.catfuncionprimariaSvc.getCatalogo().subscribe(resp => {
          this.catfuncionprimariaCat = resp;
        });
        this.catfuncionsecundariaSvc.getCatalogo().subscribe(resp => {
          this.catfuncionsecundariaCat = resp;
        });
        this.cattiposemestreSvc.getCatalogo().subscribe(resp => {
          this.cattiposemestreCat = resp;
        });
        this.catesquemapagoSvc.getCatalogo().subscribe(resp => {
          this.catesquemapagoCat = resp;
        });

  }

  newRecord(idParent:number): Plantillasdocsnombramiento {
    return {
      id: 0,  id_plantillaspersonal: idParent, id_archivos:0,
      fechaexpedicion: null,  id_catestatusplaza: 0,  fechaini: null, fechafin: null,
      id_personal_titular: 0,  horas: 0, horasb: 0,  id_categorias: 0, id_plazas:0,
      state: '', created_at: new Date(),  updated_at: new Date(), id_usuarios_r: 0,
      id_catquincena_ini:0,id_catquincena_fin:0,id_catbajamotivo:0,id_catplanteles:0,
      id_catcentrostrabajo:0,id_catesquemapago:0,id_catfuncionprimaria:0,id_catfuncionsecundaria:0,
      id_cattipoocupacion:0,id_cattiposemestre:0,esplazabase:0
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

      if(!this.seRevisoCargaHoraria)
        this.validSummary.generateErrorMessagesFromServer({carga_horaria: "Debe revisar la carga horaria para verificar que materias se registrarán como licencia"});
      else{
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
                  setTimeout(()=>{ this.successModal.hide(); this.close();}, 2000)
                }),{ key: 'loading' });*/
            }
            else{
              this.successModal.show();
              setTimeout(()=>{ this.successModal.hide(); this.close(); }, 2000)
            }
          }
        }),{ key: 'loading' });
      }
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
        this.plantillasSvc.getRecord(this.record.id_plantillaspersonal).pipe(
            mergeMap((plantilla) => {
              this.record_plantillaspersonal=plantilla;
              this.record.id_catplanteles=this.record_plantillaspersonal.id_catplanteles; // se asigna aquí, porque es de solo lectura y viene desde la plantilla

              return this.catplantelesSvc.getCatalogo().pipe(
                // this pass all objects to the next observable in this chain
                map(catplanteles => ({ catplanteles, plantilla }))
              )
            }),
            mergeMap(({ catplanteles, plantilla }) => {
              return this.catplantillasSvc.getRecord(this.record_plantillaspersonal.id_catplantillas).pipe(
                // this pass all objects to the next observable in this chain
                map(catplantillas => ({ catplantillas, catplanteles, plantilla }))
              )
            }),
          )
          .subscribe((data) => {

            //planteles
            this.catplantelesCat = data.catplanteles;
            this.record_plantel=data.catplanteles.find(x=>x.id==this.record.id_catplanteles).ubicacion;

            //plantillas
            this.record_catplantillas=data.catplantillas;
            //marca si se debe revisar la carga horaria
            if(this.record_catplantillas.id==2 && this.tipo=='licencia')
              this.seRevisoCargaHoraria=false; //se pone a false, y cuando se pica el boton de editar carga horaria, se pone a true
            else
              this.seRevisoCargaHoraria=true;
          });

          //para el caso de licenciamiento/baja, se debe elegir la categoria
          if(this.tipo=="licencia"){
            this.categoriasSvc.getCatalogoVigenteEnPlantilla(this.record.id_plantillaspersonal).subscribe(resp => {
              this.categoriasCat = resp;
            });
          }

          this.onSelectPlantel(this.record.id_catplanteles);
          //2=plantilla de docentes
          //this.varAsignarHorasPlazasPorHora=(this.record_plantillaspersonal.id_catplantillas==2?true:false);

          this.onSelectTipoNombramiento(this.record.id_catestatusplaza);

    } else {
      //obtener el registro
      this.plantillasdocsnombramientoService.getRecord(idItem).pipe(
        mergeMap((registro) => {
          return this.plantillasSvc.getRecord(registro.id_plantillaspersonal).pipe(
            // this pass all objects to the next observable in this chain
            map(plantilla => ({ plantilla,registro }))
          )
        }),
      )
      .subscribe((data) => {
        this.record = data.registro;
        this.record_plantillaspersonal=data.plantilla;
        this.record.id_catplanteles=data.plantilla.id_catplanteles; // se asigna aquí, porque es de solo lectura y viene desde la plantilla

        /*const categorias$=this.categoriasSvc.getCatalogoVigenteEnPlantilla(data.registro.id_plantillaspersonal);
        const categoriasExtra$=this.categoriasSvc.getRecordParaCombo(data.registro.id_categorias)*/
        const plazas$=this.plazasSvc.getPlazaSegunPersonal(data.registro.id_personal_titular)
        const plantillas$=this.catplantillasSvc.getRecord(data.plantilla.id_catplantillas)
        const planteles$=this.catplantelesSvc.getCatalogo();
        const personal_titular$=this.personalSvc.getRecord(data.registro.id_personal_titular)

        let source$ = zip( plazas$, plantillas$, planteles$,personal_titular$);
        source$.subscribe(([plazasInfo,plantillasInfo, plantelesInfo,personal_titularInfo]) =>{
          /*this.categoriasCat = categoriasInfo
          this.categoriasCat.push(categoriasExtraInfo)*/

          if(plazasInfo.length>0)
            this.plazaOcupadaTitular=plazasInfo[0].clave;
          this.record_catplantillas=plantillasInfo;

          this.catplantelesCat = plantelesInfo;

          if(plantelesInfo.length>0)
            this.record_plantel=plantelesInfo.find(x=>x.id==data.registro.id_catplanteles).ubicacion;

          if(personal_titularInfo!=null)
            this.record_titular =personal_titularInfo.numeemp + " - "
              +  personal_titularInfo.nombre + " " + personal_titularInfo.apellidopaterno
              + " " + personal_titularInfo.apellidomaterno + " - " + personal_titularInfo.curp;

          this.onSelectCategorias(this.record.id_categorias);
          this.onSelectPlazas(this.record.id_plazas);
          this.onSelectPlantel(this.record.id_catplanteles,this.record.id_catcentrostrabajo);
          this.onSelectTipoNombramiento(this.record.id_catestatusplaza);

        });


        /*this.categoriasCat = data.categorias;
        //si se esta editando o consultando se agrega el registro de la categoria almacenada, esto debido a que la funcion
        //getCatalogoVigenteEnPlantilla ya no regresa la categoria registrada
        this.categoriasCat.push(data.categoriasExtra[0])

        if(data.plazas.length>0)
          this.plazaOcupadaTitular=data.plazas[0].clave;

        this.catplantelesCat = data.catplanteles;

        if(data.catplanteles.length>0)
          this.record_plantel=data.catplanteles.find(x=>x.id==this.record.id_catplanteles).ubicacion;

        this.record_catplantillas=data.catplantillas;

        if(data.personal_titular!=null)
          this.record_titular =data.personal_titular.numeemp + " - "
            +  data.personal_titular.nombre + " " + data.personal_titular.apellidopaterno
            + " " + data.personal_titular.apellidomaterno + " - " + data.personal_titular.curp;*/


      })

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
        //si se esta editando o consultando se agrega el registro de la categoria almacenada, esto debido a que la funcion
        //getCatalogoDisponibleEnPlantilla ya no regresa la categoria registrada
        //if(this.actionForm.toUpperCase()!=="NUEVO" && this.record.id_categorias>0){
          this.categoriasSvc.getRecordParaCombo(this.record.id_categorias).pipe(
            mergeMap((registro) => {
              return this.categoriasSvc.getCatalogoDisponibleEnPlantilla(this.record_plantillaspersonal.id_catplanteles,this.record.id_plazas,this.record_plantillaspersonal.id_catplantillas).pipe(
                // this pass all objects to the next observable in this chain
                map(categorias => ({ categorias,registro }))
              )
            }),
          ).subscribe((data)=>{
            this.categoriasCat = data.categorias;
            //agregar el elemento para cuando se esta editando o visualizando
            //siempre y cuando no este ya en la lista
            let busqueda=data.categorias.find(x=>x.id==data.registro[0].id);
            if(this.actionForm.toUpperCase()!=="NUEVO" && (!busqueda || data.categorias.length==0) && data.registro[0])
              this.categoriasCat.push(data.registro[0])
          })
        /*}
        else{
          this.categoriasSvc.getCatalogoDisponibleEnPlantilla(this.record_plantillaspersonal.id_catplanteles,this.record.id_plazas,this.record_plantillaspersonal.id_catplantillas).subscribe(resp => {
            this.categoriasCat = resp;
          });
        }*/
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

          //para el caso de licenciamiento/baja, se debe elegir la categoria
          this.categoriasSvc.getRecordParaCombo(this.record.id_categorias).pipe(
            mergeMap((registro) => {
              return this.categoriasSvc.getCatalogoVigenteEnPlantilla(this.record.id_plantillaspersonal).pipe(
                // this pass all objects to the next observable in this chain
                map(categorias => ({ categorias,registro }))
              )
            }),
          ).subscribe((data)=>{
            this.categoriasCat = data.categorias;
            //agregar el elemento para cuando se esta editando o visualizando
            //siempre y cuando no este ya en la lista
            let busqueda=data.categorias.find(x=>x.id==data.registro[0].id);
            if(this.actionForm.toUpperCase()!=="NUEVO" && (!busqueda || data.categorias.length==0) && data.registro[0])
              this.categoriasCat.push(data.registro[0])
          })
      }
    }
  }

  onSelectCategorias(valor:any){
    /*this.categoriasdetalleSvc.getRecordSegunCategoria(valor).subscribe(resp => {
      this.varAsignarHorasPlazasPorJornada=false;
      this.categoriasdetalleCat=resp;
//si tiene detalle de horas la categoria
      if(this.categoriasdetalleCat.length>0){
        if(this.categoriasdetalleCat[0].totalhorasaut>0)
          this.varAsignarHorasPlazasPorJornada=true;
      }
    });*/

    //definir si asigna por semestre o por categorias
    this.varAsignarHorasPlazasPorHora=false;this.varAsignarHorasPlazasPorJornada=false;
    if(this.record_plantillaspersonal.id_catplantillas==2){
      if(this.categoriasCat.find(a=>a.id==valor).horasasignadas>0)
        this.varAsignarHorasPlazasPorJornada=true;
      else
        this.varAsignarHorasPlazasPorHora=true;
    }

    if(this.varAsignarHorasPlazasPorHora){//plazas por horas
      //se especifican la cantidad de horas disponibles
        this.record_disponibles_horas=this.categoriasCat.find(a=>a.id==valor)["horas"];
        this.record_disponibles_horasb=this.categoriasCat.find(a=>a.id==valor)["horasb"];
        if(this.record.id==0){ //cuando es registro nuevo, incializar variables
          this.record.horas=0;
          this.record.horasb=0;
        }
    }

    if(this.varAsignarHorasPlazasPorJornada){//plazas por jornada
      //se especifican la cantidad de horas asignadas como las disponibles
        this.record.horas=this.categoriasCat.find(a=>a.id==valor).horasasignadas;
        this.record.horasb=this.categoriasCat.find(a=>a.id==valor).horasasignadas;

    }

    if(this.esnombramiento){
      /*this.plazasSvc.getCatalogoDisponibleSegunCategoria(valor,this.record.id_plazas,this.record.id_catplanteles).subscribe(resp => {
        this.plazasCat = resp;
      });*/
      this.plazasSvc.getRecordParaCombo(this.record.id_plazas).pipe(
        mergeMap((registro) => {
          return this.plazasSvc.getCatalogoDisponibleSegunCategoria(valor,0,this.record.id_catplanteles).pipe(
            // this pass all objects to the next observable in this chain
            map(plazas => ({ plazas,registro }))
          )
        }),
      ).subscribe((data)=>{
        this.plazasCat = data.plazas;
        //agregar el elemento para cuando se esta editando o visualizando
        //siempre y cuando no este ya en la lista
        let busqueda=data.plazas.find(x=>x.id==data.registro[0].id);
        if(this.actionForm.toUpperCase()!=="NUEVO"
          && (!busqueda || data.plazas.length==0)
          && data.registro[0]
          && data.registro[0].id_categorias==this.record.id_categorias)//dependiente
          this.plazasCat.push(data.registro[0])
      })
    }
    else{ //es baja/licenciamiento
      this.plazasSvc.getRecordParaCombo(this.record.id_plazas).pipe(
        mergeMap((registro) => {
          return this.plazasSvc.getCatalogoVigenteSegunCategoria(valor,this.record.id_plantillaspersonal).pipe(
            // this pass all objects to the next observable in this chain
            map(plazas => ({ plazas,registro }))
          )
        }),
      ).subscribe((data)=>{
        this.plazasCat = data.plazas;
        //agregar el elemento para cuando se esta editando o visualizando
        //siempre y cuando no este ya en la lista
        let busqueda=data.plazas.find(x=>x.id==data.registro[0].id);
        if(this.actionForm.toUpperCase()!=="NUEVO"
            && (!busqueda || data.plazas.length==0)
            && data.registro[0]
            && data.registro[0].id_categorias==this.record.id_categorias)//dependiente
          this.plazasCat.push(data.registro[0])
      })
    }
  }

  onSelectPlazas(valor:any){
    /*if(this.varAsignarHorasPlazasPorHora && this.plazasCat!=null){
      if(this.plazasCat.find(a=>a.id==valor)){
        this.record_disponibles_horas=this.plazasCat.find(a=>a.id==valor).horas;
        this.record_disponibles_horasb=this.plazasCat.find(a=>a.id==valor).horasb;
      }
    }*/
  }

  onSelectPlantel(select_plantel,id_catcentrostrabajo:any=0) {
    //let clave=$("#selectPlantel option:selected").text().split("-")[0];
    //this.record.id_catplanteles=select_plantel;
    this.record.id_catcentrostrabajo=id_catcentrostrabajo;
    this.catcentrostrabajoCat=[];

    this.catcentrostrabajoSvc.getCatalogoSegunPlantel(this.record.id_catplanteles).subscribe(resp => {
      this.catcentrostrabajoCat = resp;
    });

    //Obtener las categporias segun el tipo de plantel seleccionado
    /*let tipoplantel=this.catplantelesCat.find(e=>e.id==select_plantel).tipoplantel;
    this.categoriasSvc.getCatalogoSegunPlantel(tipoplantel).subscribe(resp => {
      this.categoriasCat = resp;
    });*/

    if(select_plantel>0)
      this.showAdicionalesPlantel(select_plantel);
  }

  showAdicionalesPlantel(select_plantel){

    this.catplantelesSvc.getRecord(select_plantel).subscribe(resp => {
      this.catzonaeconomicaSvc.getRecord(resp.id_catzonaeconomica).subscribe(resp => {
        this.record_txtzonaeconomica=resp.descripcion;
      });

      this.catzonageograficaSvc.getRecord(resp.id_catzonageografica).subscribe(resp => {
        this.record_txtzonageografica=resp.descripcion;
      })
    });
  }

  //modal de licenciamiento de horas
  openModal(id: string, accion: string, idItem: number) {
    this.seRevisoCargaHoraria=true;
    this.personalhorasSvc.open(id, accion, this.record_plantillaspersonal.id_personal,0,0);
  }

  closeModal(id: string) {
    this.personalhorasSvc.close(id);
  }

  CopiarPlaza(){
    let copyText=this.plazasCat.find(a=>a.id==this.record.id_plazas)["text"];
    this.clipboardService.copy(copyText)

  }
}
