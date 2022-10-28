import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../../../../_services/token-storage.service';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Personalhoras, Personal, Semestre, Catplanteles, Catquincena, Gruposclase, Materiasclase, Catestatushora, Catnombramientos, Cattipohorasdocente } from '../../../../_models';
import { Archivos } from '../../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';

import { HorasasignacionFormService } from '../services/horasasignacionform.service';
import { CatquincenaService } from '../../../catalogos/catquincena/services/catquincena.service';
import { GruposclaseService } from '../../../catalogos/gruposclase/services/gruposclase.service';
import { MateriasclaseService } from '../../../catalogos/materiasclase/services/materiasclase.service';
import { SemestreService } from '../../../catalogos/semestre/services/semestre.service';
import { CatplantelesService } from '../../../catalogos/catplanteles/services/catplanteles.service';
import { CatestatushoraService } from '../../../catalogos/catestatushora/services/catestatushora.service';
import { CatnombramientosService } from '../../../catalogos/catnombramientos/services/catnombramientos.service';
import { CattipohorasdocenteService } from '../../../catalogos/cattipohorasdocente/services/cattipohorasdocente.service';
import { PersonalService } from '../../../catalogos/personal/services/personal.service';
import { relativeTimeThreshold } from 'moment';
import { PlazasService } from '../../../plazas/plazas/services/plazas.service';
import { HorashistorialService } from '../services/horashistorial.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-horasasignacion-form',
  templateUrl: './horasasignacion-form.component.html',
  styleUrls: ['./horasasignacion-form.component.css']
})

export class HorasasignacionFormComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción
  @Output() redrawEvent = new EventEmitter<any>();

  nombreModulo = 'Horasasignacion';

  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;
  usuario:any=this.tokenStorage.getUser();

  private elementModal: any;

  @ViewChild('basicModalHorasasignacion') basicModalHorasasignacion: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  record: Personalhoras;
  recordpersonal: Personal = {
      id: 0,curp: '', rfc: '',  homoclave: '',
      state: '', nombre: '', apellidopaterno: '', apellidomaterno:'',id_catestadocivil:0,
      fechanacimiento: null, id_catestadosnaci: 0, id_catmunicipiosnaci: 0, id_catlocalidadesnaci: 0,
      id_archivos_avatar:0,id_usuarios_sistema:0,numeemp:'',
      telefono: '', email: '', emailoficial:'',observaciones:'',sexo:0,
      id_catestadosresi: 0, id_catmunicipiosresi: 0, id_catlocalidadesresi: 0,
      domicilio:'',colonia:'',cp:'',telefonomovil:'',numimss:'',numissste:'',otronombre:'', numotro:'',tipopension:'',
      created_at: new Date(),  updated_at: new Date(), id_usuarios_r: 0,fechaingreso:null,primaantiguedad:0,
      id_catbanco_deposito:0,cuentadeposito:'',formacobro:0,
  };
  recordsemestre: Semestre = {
    id: 0,tipo: '',anio: 0,quincena: 0,qnainiciosemestre:'',qnafinsemestre: '',actual: 0,id_catquincena_ini: 0,
    id_catquincena_fin: 0, id_catquincena_fininterinas: 0,permitemodificacion: 0,permitecargadeplantillas: 0,
    created_at: new Date(),  updated_at: new Date(), id_usuarios_r: 0,state:''
  };
  

  catplantelesCat: Catplanteles[];
  catplantelesAplicacionCat: Catplanteles[];
  catquincenaCat: Catquincena[];
  gruposclaseCat: Gruposclase[];
  materiasclaseCat: Materiasclase[];
  catestatushoraCat: Catestatushora[];
  catnombramientosCat: Catnombramientos[];
  cattipohorasdocenteCat: Cattipohorasdocente[];
  record_id_personal:number;
  record_id_semestre:number;
  record_id_plantel:number;
  record_personaltitular:Personal[];
  record_personaltitular_nombre:string;
  record_quincena_activa:Catquincena;
  record_id_plaza:number;
  record_text_plaza:string;
  record_text_categoria:string;
  
  edicion_en_activo:boolean=true;
  edicion_en_copiar:boolean=false;
  edicion_habilitarTipoHoras:boolean=true;
  edicion_horasDIESyApoyo:boolean=false;
  edicion_horasApoyo:boolean=false;
  horasApoyoDocenciaMax:number;
  horasProgramadasEnPlaza:number;
  horasDisponiblesEnPlaza:number;
  horasRestantesEnPlaza:number=0;
  verAsignarHorasRestantes:boolean=false;
  asignarHorasRestantes:number;
  tipoForm:number;//tipoForm=1->Carga horaria, tipoForm=2->DIES, tipoForm=3->Apoyo a la docencia

  esPlantelDesdeParametro:boolean=false;
  keywordSearch = 'full_name';
  isLoadingSearch: boolean;
  esinterina: boolean=false;
  record_titular:any;
  record_id_categorias:number=0;
  //recordJsonTipodoc1:any={UltimoGradodeEstudios:0,AreadeCarrera:0,Carrera:0,Estatus:0};

  constructor(
    private tokenStorage: TokenStorageService,
    private isLoadingService: IsLoadingService,
    private horasasignacionformService: HorasasignacionFormService,
    private personalSvc: PersonalService,
    private semestreSvc: SemestreService,
    private catquincenaSvc: CatquincenaService,
    private catplantelesSvc: CatplantelesService,
    private gruposclaseSvc: GruposclaseService,
    private materiasclaseSvc: MateriasclaseService,
    private catestatushoraSvc: CatestatushoraService,
    private catnombramientosSvc: CatnombramientosService,
    private cattipohorasdocenteSvc: CattipohorasdocenteService,
    private plazasSvc: PlazasService,
    private horashistorialSvc:HorashistorialService,
    private el: ElementRef,
    private route: ActivatedRoute
  ) {
    this.elementModal = el.nativeElement;


    this.catestatushoraSvc.getCatalogo().subscribe(resp => {
      this.catestatushoraCat = resp.filter(a=>(a.id==1 || a.id==2 || a.id==5));
    });
    this.catnombramientosSvc.getCatalogo().subscribe(resp => {
      this.catnombramientosCat = resp;
    });

  }

  newRecord(idParent: number, idSemestre: number): Personalhoras {
    return {
      id: 0, id_personal: idParent, cantidad: 0, id_catplanteles: 0, id_catplanteles_aplicacion:0, id_gruposclase: 0,id_materiasclase: 0,id_horasclase: 0,
      id_cattipohorasmateria: 1, id_catnombramientos: 0, id_semestre: idSemestre,frenteagrupo:0,id_plazas:0,
      id_catestatushora: 0, id_catquincena_ini: 0, id_catquincena_fin: 0, horassueltas:0, id_cattipohorasdocente:0,
      state: '', created_at: new Date(), updated_at: new Date(), id_usuarios_r: 0, descargada:0, id_personalhoras_descarga:0,
      id_personal_titular:0
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
    modal.horasasignacionformService.add(modal);

    //loading
    this.userFormIsPending = this.isLoadingService.isLoading$({ key: 'loading' });

    //quincena activa
    //this.record_quincena_activa = this.route.snapshot.data.dataHoraAsignacion;
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.horasasignacionformService.remove(this.id); //idModal
    this.elementModal.remove();
  }


  async submitAction(admin) {
    let pasaValidaciones:boolean=true;

    if (this.actionForm.toUpperCase() !== "VER") {

      this.validSummary.resetErrorMessages(admin);

      if(this.record.id_catnombramientos==2 && this.record_personaltitular.length==0){
        this.validSummary.generateErrorMessagesFromServer({Titular: "No existe un profesor con esta materia en Licencia"});
        pasaValidaciones=false;
      }
      /*else if(this.edicion_horasDIESyApoyo && (this.record.cantidad>this.horasDisponiblesEnPlaza || this.record.cantidad<1)){
        this.validSummary.generateErrorMessagesFromServer({Horas: "La materia seleccionada es del Programa DIES, por lo tanto, la cantidad de horas debe ser entre 1 y " + this.horasProgramadasEnPlaza});
      }*/
      if(this.tipoForm==2){//DIES
        if(this.record.cantidad>this.horasDisponiblesEnPlaza){
          this.record.cantidad=this.horasDisponiblesEnPlaza
          this.validSummary.generateErrorMessagesFromServer({Horas:"La cantidad de horas DIES no debe ser mayor a las horas disponibles en la plaza"});
          pasaValidaciones=false;
        }
      }
      else if(this.tipoForm==3){//APOYO
        if(this.record.cantidad>this.horasDisponiblesEnPlaza){
          this.record.cantidad=this.horasDisponiblesEnPlaza
          this.validSummary.generateErrorMessagesFromServer({Horas:"La cantidad de horas de Apoyo a la Docencia no debe ser mayor a las horas disponibles en la plaza"});
          pasaValidaciones=false;
        }
        else if(this.record.cantidad>this.horasApoyoDocenciaMax){
          this.record.cantidad=this.horasApoyoDocenciaMax
          this.validSummary.generateErrorMessagesFromServer({Horas:"La cantidad de Horas de Apoyo a la Docencia no debe ser mayor a " + this.horasApoyoDocenciaMax});
          pasaValidaciones=false;
        }
      }
      
      if(pasaValidaciones){
        if (this.actionForm.toUpperCase() == "DESACTIVAR") {
          this.record.descargada=1;
        }

        await this.isLoadingService.add(
          this.horasasignacionformService.setRecord(this.record, this.actionForm, this.asignarHorasRestantes, (this.horasRestantesEnPlaza*-1)).subscribe(async resp => {
            if (resp.hasOwnProperty('error')) {
              this.validSummary.generateErrorMessagesFromServer(resp.message);
            }
            else if (resp.message == "success") {
              let actionFormSQL=this.actionForm;
              if (this.actionForm.toUpperCase() == "NUEVO") this.actionForm = "editar";
              this.record.id = resp.id;

              //Ejecutar sql server
              await this.isLoadingService.add(
                this.horasasignacionformService.setRecordSQLServer(this.record,actionFormSQL).subscribe(async resp => {
                  //Actualizar el registro con el id devuelto por sql server
                  this.horasasignacionformService.setUpdateIdServer(this.record,resp.result,actionFormSQL).subscribe(async resp => {
                    //actualizar el registro de la tabla archivos
                      this.successModal.show();
                      setTimeout(()=>{ this.successModal.hide(); this.close(); }, 2000)
                  });
              }),{ key: 'loading' });    
            }
          }), { key: 'loading' });
        }
    }
  }

  openModal(id: string, tipo:string, id_horasclase:number, id_personal: number,id_gruposclase:number,id_materiasclase:number,id_semestre:number) {
    this.horashistorialSvc.open(id, tipo, id_horasclase, id_personal, id_gruposclase, id_materiasclase,id_semestre);
  }

  closeModal(id: string) {
    this.horashistorialSvc.close(id);
  }


  // open modal
  open(idItem: string, accion: string, idPersonal: number, idSemestre: number, idPlantel:number, idPlaza:number,esInterina:number,idPlantelAplicacion:number,tipoForm:number): void {
    let titulo="";
    if(tipoForm==1) titulo="Carga horaria";
    if(tipoForm==2) titulo="Horas DIES";
    if(tipoForm==3) titulo="Horas de apoyo a la docencia";

    this.actionForm = accion;
    this.botonAccion = actionsButtonSave[accion];
    this.tituloForm =  titulo + " - " 
        + titulosModal[accion] 
        + " registro";
    this.record_id_personal=idPersonal;
    this.record_id_semestre=idSemestre;
    this.record_id_plantel=idPlantel;
    this.tipoForm=tipoForm;

    this.esPlantelDesdeParametro=(idPlantel>0);

    this.personalSvc.getRecord(idPersonal).subscribe(resp => {
      this.recordpersonal = resp;
    });
    this.semestreSvc.getRecord(idSemestre).subscribe(resp => {
      this.recordsemestre = resp;
    });
    this.catplantelesSvc.getCatalogoSegunPersonal(idPersonal).subscribe(resp => {
      this.catplantelesCat = resp;
    });
    this.catplantelesSvc.getCatalogoSinAdmin(this.usuario.id).subscribe(resp => {
      this.catplantelesAplicacionCat = resp;
    });

    this.edicion_en_copiar=false;
    this.asignarHorasRestantes=1;//por default en sí

    if (idItem == "0") {
      this.record = this.newRecord(idPersonal, idSemestre);
      this.record.id_catplanteles=idPlantel;
      this.record.id_plazas=idPlaza;
      this.record.id_catestatushora=1;

      if(idPlantelAplicacion==0)
        this.record.id_catplanteles_aplicacion=idPlantel;
      else
        this.record.id_catplanteles_aplicacion=idPlantelAplicacion;

      this.onSelectPlantel(this.record.id_catplanteles_aplicacion);

      this.edicion_en_activo=true;
      this.plazasSvc.getRecordParaCombo(idPlaza).subscribe(resp => {
        this.record_id_plaza = resp[0].id;
        this.record_text_plaza = resp[0].text;
        this.record_text_categoria = resp[0].categoria;
        this.record_id_categorias = resp[0].id_categorias;
        this.horasProgramadasEnPlaza = resp[0].horas_programadas;
        this.record.horassueltas=(resp[0].eshomologada=="true"?1:0);

        if(resp[0].eshomologada=="true"){
          this.record.id_catnombramientos=1;
          this.edicion_habilitarTipoHoras=true;
        }
        else if(esInterina==1){
          this.record.id_catnombramientos=2;//2=interino
          this.edicion_habilitarTipoHoras=true;
        }
        else{
          this.record.id_catnombramientos=0;
          this.edicion_habilitarTipoHoras=false;
        }
        this.onSelectNombramiento(this.record.id_catnombramientos)
      });

      this.plazasSvc.getHorasDisponibleSegunPlaza(idPersonal,idPlantel,idSemestre,idPlaza).subscribe(resp => {
        this.horasDisponiblesEnPlaza=resp[0].horasdisponibles;
        this.horasApoyoDocenciaMax=resp[0].horasapoyo;
        this.horasRestantesEnPlaza=(this.horasDisponiblesEnPlaza>0?this.horasDisponiblesEnPlaza - this.record.cantidad:parseInt(this.horasDisponiblesEnPlaza.toString())+parseInt((this.record.cantidad*-1).toString()));
        this.verAsignarHorasRestantes=(this.horasRestantesEnPlaza<0);
      });


    } else {
      //obtener el registro
      this.catquincenaSvc.getQuincenaActiva().subscribe(async resp => {
        //quincena activa
        this.record_quincena_activa = resp;
        this.horasasignacionformService.getRecord(idItem).subscribe(async resp => {
          this.record = resp;
          this.edicion_en_activo=true;

          //obtener registro segun quincena inicial
          this.catquincenaSvc.getRecord(this.record.id_catquincena_ini).subscribe(async resp => {
            if(this.record_quincena_activa.anio.toString()+this.record_quincena_activa.quincena.toString().padStart(2,"0")
               >resp.anio.toString()+resp.quincena.toString().padStart(2,"0"))
            this.edicion_en_activo=false;//solo editar la quincena final
          });
          

          if(this.actionForm.toUpperCase()=="COPIAR"){
            this.actionForm="NUEVO";
            this.record.id=0;
            this.record.descargada=0;
            this.edicion_en_copiar=true;
          }

          this.onSelectPlantel(resp.id_catplanteles_aplicacion);
          this.onSelectGruposclase(resp.id_gruposclase);
          //this.onSelectNombramiento(resp.id_catnombramientos);
          this.cattipohorasdocenteSvc.getCatalogoSegunMateria(resp.id_materiasclase,this.record_id_categorias).subscribe(resp => {
            this.cattipohorasdocenteCat = resp;
            if(resp.length==1)
              this.record.id_cattipohorasdocente=resp[0].id
          });
          this.plazasSvc.getRecordParaCombo(this.record.id_plazas).subscribe(resp => {
            this.record_id_plaza = resp[0].id;
            this.record_text_plaza = resp[0].text;
            this.record_text_categoria = resp[0].categoria;
            this.horasProgramadasEnPlaza = resp[0].horas_programadas;
            this.record.horassueltas=(resp[0].eshomologada=="true"?1:0);
            if(resp[0].eshomologada=="true"){
              this.record.id_catnombramientos=1;
              this.edicion_habilitarTipoHoras=true;
            }
            else if(esInterina==1){
              this.record.id_catnombramientos=2;//2=interino
              this.edicion_habilitarTipoHoras=true;
            }
            else{
              this.edicion_habilitarTipoHoras=false;
            }

            this.onSelectNombramiento(this.record.id_catnombramientos);

          });
          this.plazasSvc.getHorasDisponibleSegunPlaza(idPersonal,idPlantel,idSemestre,idPlaza).subscribe(resp => {
            if(!this.edicion_en_copiar)
              this.horasDisponiblesEnPlaza=parseFloat(resp[0].horasdisponibles)+this.record.cantidad //sumar las horas ya asignadas como parte de las horas disponibles
            else
              this.horasDisponiblesEnPlaza=resp[0].horasdisponibles

            this.horasRestantesEnPlaza=(this.horasDisponiblesEnPlaza>0?this.horasDisponiblesEnPlaza - this.record.cantidad:parseInt(this.horasDisponiblesEnPlaza.toString())+parseInt((this.record.cantidad*-1).toString()));
            this.verAsignarHorasRestantes=(this.horasRestantesEnPlaza<0);
          });
        });
      });
    }

    //console.log("this.edicion_en_activo=>",this.edicion_en_activo)
    this.basicModalHorasasignacion.show();
  }

  // close modal
  close(): void {
    this.basicModalHorasasignacion.hide();
    if (this.actionForm.toUpperCase() != "VER") {
      this.redrawEvent.emit(null);
    }
  }

  // log contenido de objeto en adminulario
  get diagnosticValidate() { return JSON.stringify(this.record); }

  onSelectPlantel(valor: any) {
    let id_cattiposemestre=0;
    if(this.recordsemestre.tipo=="A") id_cattiposemestre=1
    if(this.recordsemestre.tipo=="B") id_cattiposemestre=2
    if(this.recordsemestre.tipo=="A,B") id_cattiposemestre=3

    if(!this.edicion_en_copiar)//si no es copia
      this.gruposclaseSvc.getCatalogoConHorasDisponiblesSegunPlantel(valor,this.record.id,this.recordsemestre.tipo,this.record_id_semestre,id_cattiposemestre).subscribe(resp => {
        if(this.tipoForm==1)
          this.gruposclaseCat = resp.filter(a=>a["text"]!="0-");
        else{
          this.gruposclaseCat = resp.filter(a=>a["text"]=="0-");
          this.record.id_gruposclase=this.gruposclaseCat.length>0?this.gruposclaseCat.find(a=>a["text"]=="0-").id:0;
          this.onSelectGruposclase(this.record.id_gruposclase);
        }
      });
    else
      this.gruposclaseSvc.getCatalogoConHorasDisponiblesSegunCopia(valor,this.record.id,this.recordsemestre.tipo,this.record_id_semestre,id_cattiposemestre
          ,this.record.id_materiasclase,this.record.id_catestatushora,this.record.id_cattipohorasdocente,this.record.id_personal).subscribe(resp => {

        if(this.tipoForm==1)
          this.gruposclaseCat = resp.filter(a=>a["text"]!="0-");
        else{
          this.gruposclaseCat = resp.filter(a=>a["text"]=="0-");
          this.record.id_gruposclase=this.gruposclaseCat.length>0?this.gruposclaseCat.find(a=>a["text"]=="0-").id:0;
          this.onSelectGruposclase(this.record.id_gruposclase);
        }
        
      });

  }

  onSelectGruposclase(valor: any) {
    let id_cattiposemestre=0;
    if(this.recordsemestre.tipo=="A") id_cattiposemestre=1
    if(this.recordsemestre.tipo=="B") id_cattiposemestre=2
    if(this.recordsemestre.tipo=="A,B") id_cattiposemestre=3
    this.materiasclaseSvc.getCatalogoConHorasDisponiblesSegunGrupo(this.record.id_catplanteles_aplicacion, valor,this.record.id,this.record_id_semestre,id_cattiposemestre).subscribe(resp => {

      if(this.tipoForm==1){
        this.materiasclaseCat = resp.filter(a=>a["text"].indexOf("DIES")<0 && a["text"].indexOf("APOYO A LA DOCENCIA")<0);
      }
      else if(this.tipoForm==2){
        this.materiasclaseCat = resp.filter(a=>a["text"].indexOf("DIES")>=0);
      }
      else if(this.tipoForm==3){
        this.materiasclaseCat = resp.filter(a=>a["text"].indexOf("APOYO A LA DOCENCIA")>=0);
      }
    });
  }

  onSelectMateriasclase(valor: any) {
    this.record.id_materiasclase=parseInt(valor);
    let materia=this.materiasclaseCat.find(a=>a.id==valor);
    if(this.tipoForm==2){//DIES
      this.record.cantidad=this.horasDisponiblesEnPlaza;
    }
    else if(this.tipoForm==3){
      this.record.cantidad=this.horasApoyoDocenciaMax;
    }else{
      this.record.cantidad=materia.horasdisponibles;
    }
    this.record.id_horasclase=materia.id_horasclase;

    //si son horas de jornada y si ya excede las horas, entonces, mostrar la opción de asignar en horas sueltas
    this.horasRestantesEnPlaza=(this.horasDisponiblesEnPlaza>0?this.horasDisponiblesEnPlaza - this.record.cantidad:parseInt(this.horasDisponiblesEnPlaza.toString()) + parseInt((this.record.cantidad*-1).toString()));
    this.verAsignarHorasRestantes=(this.horasRestantesEnPlaza<0);

    this.edicion_horasDIESyApoyo=(materia["nogrupo"]==1 && 
      (materia["claveasignatura"].substring(0,2)=="PD" || materia["claveasignatura"].substring(0,2)=="AD"));

    if(this.edicion_horasDIESyApoyo){
      this.record.horassueltas=0;
      this.record.frenteagrupo=0;
    }
    this.cattipohorasdocenteSvc.getCatalogoSegunMateria(valor,this.record_id_categorias).subscribe(resp => {
     this.cattipohorasdocenteCat = resp;
     if(resp.length==1)
      this.record.id_cattipohorasdocente=resp[0].id
   });
  }

  onSelectNombramiento(id_catnombramientos){
    this.record_personaltitular=[];
    this.esinterina=false;
    if(id_catnombramientos==2 || id_catnombramientos==3){//interino o provisional
      this.catquincenaSvc.getCatalogoSegunSemestre(this.record_id_semestre).subscribe(resp => {
        this.catquincenaCat = resp;
      });
      //interinato
      if(id_catnombramientos==2){
        this.esinterina=true;
        this.horasasignacionformService.getRecordTitularEnLicencia(this.record.id_horasclase,this.record.id_semestre).subscribe(resp => {
          this.record_personaltitular = resp;
          this.record_personaltitular_nombre="";
          this.record.id_personal_titular=0;
          
          if(resp.length>0){
            this.record_personaltitular_nombre=this.record_personaltitular["nombre"];
            this.record.id_personal_titular= resp.id;
          }
        });
      }
    }
    else{
      this.catquincenaSvc.getCatalogo().subscribe(resp => {
        this.catquincenaCat = resp;
      });
    }
  }

  onChangeCantidadHoras(valor: any){
    if(this.tipoForm==2){//DIES
      if(valor>this.horasDisponiblesEnPlaza){
        this.record.cantidad=this.horasDisponiblesEnPlaza
        alert("La cantidad de horas DIES no debe ser mayor a las horas disponibles en la plaza");
      }
    }
    else if(this.tipoForm==3){//APOYO
      if(valor>this.horasDisponiblesEnPlaza){
        this.record.cantidad=this.horasDisponiblesEnPlaza
        alert("La cantidad de horas de Apoyo a la Docencia no debe ser mayor a las horas disponibles en la plaza");
      }
      else if(valor>this.horasApoyoDocenciaMax){
        this.record.cantidad=this.horasApoyoDocenciaMax
        alert("La cantidad de Horas de Apoyo a la Docencia no debe ser mayor a " + this.horasApoyoDocenciaMax);
      }
    }
    //si son horas de jornada, entonces, si ya excede las horas, entonces, mostrar la opción de asignar en horas sueltas
    this.horasRestantesEnPlaza=(this.horasDisponiblesEnPlaza>0?this.horasDisponiblesEnPlaza - this.record.cantidad: parseInt(this.horasDisponiblesEnPlaza.toString()) + parseInt((this.record.cantidad*-1).toString()));
    this.verAsignarHorasRestantes=(this.horasRestantesEnPlaza<0);
  }

}
