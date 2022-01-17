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
  edicion_en_activo:boolean=true;
  edicion_en_copiar:boolean=false;
  edicion_habilitarTipoHoras:boolean=true;
  edicion_horasDIES:boolean=false;
  horasDisponiblesEnPlaza:number;
  horasRestantesEnPlaza:number=0;
  verAsignarHorasRestantes:boolean=false;
  asignarHorasRestantes:number;


  esPlantelDesdeParametro:boolean=false;
  keywordSearch = 'full_name';
  isLoadingSearch: boolean;
  esinterina: boolean=false;
  record_titular:any;

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
    private el: ElementRef,
    private route: ActivatedRoute
  ) {
    this.elementModal = el.nativeElement;


    this.catestatushoraSvc.getCatalogo().subscribe(resp => {
      this.catestatushoraCat = resp;
    });
    this.catnombramientosSvc.getCatalogo().subscribe(resp => {
      this.catnombramientosCat = resp;
    });

  }

  newRecord(idParent: number, idSemestre: number): Personalhoras {
    return {
      id: 0, id_personal: idParent, cantidad: 0, id_catplanteles: 0, id_catplanteles_aplicacion:0, id_gruposclase: 0,id_materiasclase: 0,
      id_cattipohorasmateria: 1, id_catnombramientos: 0, id_semestre: idSemestre,frenteagrupo:0,id_plazas:0,
      id_catestatushora: 0, id_catquincena_ini: 0, id_catquincena_fin: 0, horassueltas:0, id_cattipohorasdocente:0,
      state: '', created_at: new Date(), updated_at: new Date(), id_usuarios_r: 0, descargada:0, id_personalhoras_descarga:0
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

    if (this.actionForm.toUpperCase() !== "VER") {

      this.validSummary.resetErrorMessages(admin);

      if(this.record.id_catnombramientos==2 && this.record_personaltitular.length==0){
        this.validSummary.generateErrorMessagesFromServer({Titular: "No existe un profesor con esta materia en Licencia"});
      }
      else if(this.edicion_horasDIES && (this.record.cantidad>40 || this.record.cantidad<1)){
        this.validSummary.generateErrorMessagesFromServer({Horas: "La materia seleccionada es del Programa DIES, por lo tanto, la cantidad de horas debe ser entre 1 y 40"});
      }
      else{
        if (this.actionForm.toUpperCase() == "DESACTIVAR") {
          this.record.descargada=1;
        }

        await this.isLoadingService.add(
          this.horasasignacionformService.setRecord(this.record, this.actionForm, this.asignarHorasRestantes, this.horasRestantesEnPlaza).subscribe(async resp => {
            if (resp.hasOwnProperty('error')) {
              this.validSummary.generateErrorMessagesFromServer(resp.message);
            }
            else if (resp.message == "success") {
              if (this.actionForm.toUpperCase() == "NUEVO") this.actionForm = "editar";
              this.record.id = resp.id;

              this.successModal.show();
              setTimeout(() => { this.successModal.hide(); this.close();}, 2000)
            }
          }), { key: 'loading' });
        }
    }
  }

  // open modal
  open(idItem: string, accion: string, idPersonal: number, idSemestre: number, idPlantel:number, idPlaza:number,esInterina:number,idPlantelAplicacion:number): void {
    this.actionForm = accion;
    this.botonAccion = actionsButtonSave[accion];
    this.tituloForm = "Carga horaria - " + titulosModal[accion] + " registro";
    this.record_id_personal=idPersonal;
    this.record_id_semestre=idSemestre;
    this.record_id_plantel=idPlantel;


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
      if(idPlantelAplicacion==0)
        this.record.id_catplanteles_aplicacion=idPlantel;
      else
        this.record.id_catplanteles_aplicacion=idPlantelAplicacion;

      this.onSelectPlantel(this.record.id_catplanteles_aplicacion);
      this.edicion_en_activo=true;
      this.plazasSvc.getRecordParaCombo(idPlaza).subscribe(resp => {
        this.record_id_plaza = resp[0].id;
        this.record_text_plaza = resp[0].text;
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
      });
      this.plazasSvc.getHorasDisponibleSegunPlaza(idPersonal,idPlantel,idSemestre,idPlaza).subscribe(resp => {
        this.horasDisponiblesEnPlaza=resp[0].horasdisponibles;
        this.horasRestantesEnPlaza=(this.horasDisponiblesEnPlaza>0?this.record.cantidad - this.horasDisponiblesEnPlaza:parseInt((this.record.cantidad*-1).toString()) + parseInt(this.horasDisponiblesEnPlaza.toString()));
        this.verAsignarHorasRestantes=(this.horasRestantesEnPlaza>0);
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
          this.onSelectNombramiento(resp.id_catnombramientos);
          this.cattipohorasdocenteSvc.getCatalogoSegunMateria(resp.id_materiasclase).subscribe(resp => {
            this.cattipohorasdocenteCat = resp;
          });
          this.plazasSvc.getRecordParaCombo(this.record.id_plazas).subscribe(resp => {
            this.record_id_plaza = resp[0].id;
            this.record_text_plaza = resp[0].text;
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
          });
          this.plazasSvc.getHorasDisponibleSegunPlaza(idPersonal,idPlantel,idSemestre,idPlaza).subscribe(resp => {
            if(!this.edicion_en_copiar)
              this.horasDisponiblesEnPlaza=parseFloat(resp[0].horasdisponibles)+this.record.cantidad //sumar las horas ya asignadas como parte de las horas disponibles
            else
              this.horasDisponiblesEnPlaza=resp[0].horasdisponibles

            this.horasRestantesEnPlaza=(this.horasDisponiblesEnPlaza>0?this.record.cantidad - this.horasDisponiblesEnPlaza:parseInt((this.record.cantidad*-1).toString()) + parseInt(this.horasDisponiblesEnPlaza.toString()));
            this.verAsignarHorasRestantes=(this.horasRestantesEnPlaza>0);
          });
        });
      });
    }


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
        this.gruposclaseCat = resp;
      });
    else
      this.gruposclaseSvc.getCatalogoConHorasDisponiblesSegunCopia(valor,this.record.id,this.recordsemestre.tipo,this.record_id_semestre,id_cattiposemestre
          ,this.record.id_materiasclase,this.record.id_catestatushora,this.record.id_cattipohorasdocente,this.record.id_personal).subscribe(resp => {
        this.gruposclaseCat = resp;
      });

  }

  onSelectGruposclase(valor: any) {
    let id_cattiposemestre=0;
    if(this.recordsemestre.tipo=="A") id_cattiposemestre=1
    if(this.recordsemestre.tipo=="B") id_cattiposemestre=2
    if(this.recordsemestre.tipo=="A,B") id_cattiposemestre=3
    this.materiasclaseSvc.getCatalogoConHorasDisponiblesSegunGrupo(this.record.id_catplanteles_aplicacion, valor,this.record.id,this.record_id_semestre,id_cattiposemestre).subscribe(resp => {
      this.materiasclaseCat = resp;
    });
  }

  onSelectMateriasclase(valor: any) {
    let materia=this.materiasclaseCat.find(a=>a.id==valor);
    this.record.cantidad=materia.horasdisponibles;

    //si son horas de jornada, entonces, si ya excede las horas, entonces, mostrar la opción de asignar en horas sueltas
    this.horasRestantesEnPlaza=(this.horasDisponiblesEnPlaza>0?this.record.cantidad - this.horasDisponiblesEnPlaza:parseInt((this.record.cantidad*-1).toString()) + parseInt(this.horasDisponiblesEnPlaza.toString()));
    this.verAsignarHorasRestantes=(this.horasRestantesEnPlaza>0);

    this.edicion_horasDIES=(materia["nogrupo"]==1 && materia["claveasignatura"].substring(0,2)=="PD");
    if(this.edicion_horasDIES){
      this.record.horassueltas=0;
      this.record.frenteagrupo=0;
    }
    this.cattipohorasdocenteSvc.getCatalogoSegunMateria(valor).subscribe(resp => {
     this.cattipohorasdocenteCat = resp;
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
        this.horasasignacionformService.getRecordTitularEnLicencia(this.record.id_catplanteles_aplicacion,this.record.id_gruposclase,this.record.id_materiasclase,this.record.id_semestre).subscribe(resp => {
          this.record_personaltitular = resp;
          this.record_personaltitular_nombre="";

          if(resp.length>0){
            this.record_personaltitular_nombre=this.record_personaltitular["nombre"];
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
    //si son horas de jornada, entonces, si ya excede las horas, entonces, mostrar la opción de asignar en horas sueltas
    this.horasRestantesEnPlaza=(this.horasDisponiblesEnPlaza>0?this.record.cantidad - this.horasDisponiblesEnPlaza:parseInt((this.record.cantidad*-1).toString()) + parseInt(this.horasDisponiblesEnPlaza.toString()));
    this.verAsignarHorasRestantes=(this.horasRestantesEnPlaza>0);
  }

}
