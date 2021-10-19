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
      created_at: new Date(),  updated_at: new Date(), id_usuarios_r: 0
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
  edicion_en_activo:boolean=true;
  edicion_en_copiar:boolean=false;

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
      id_cattipohorasmateria: 1, id_catnombramientos: 0, id_semestre: idSemestre,frenteagrupo:0,
      id_catestatushora: 0, id_catquincena_ini: 0, id_catquincena_fin: 0, horassueltas:0, id_cattipohorasdocente:0,
      state: '', created_at: new Date(), updated_at: new Date(), id_usuarios_r: 0
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
      else{
        await this.isLoadingService.add(
          this.horasasignacionformService.setRecord(this.record, this.actionForm).subscribe(async resp => {
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
  open(idItem: string, accion: string, idPersonal: number, idSemestre: number, idPlantel:number): void {
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
    if (idItem == "0") {
      this.record = this.newRecord(idPersonal, idSemestre);
      this.record.id_catplanteles=idPlantel;
      this.record.id_catplanteles_aplicacion=idPlantel;
      this.onSelectPlantel(idPlantel);
      this.edicion_en_activo=true;
    } else {
      //obtener el registro
      this.catquincenaSvc.getQuincenaActiva().subscribe(async resp => {
        //quincena activa
        this.record_quincena_activa = resp;
        this.horasasignacionformService.getRecord(idItem).subscribe(async resp => {
          this.record = resp;
          this.edicion_en_activo=true;
          if(this.record_quincena_activa.id>this.record.id_catquincena_ini)
            this.edicion_en_activo=false;//solo editar la quincena final

          this.onSelectPlantel(resp.id_catplanteles_aplicacion);
          this.onSelectGruposclase(resp.id_gruposclase);
          this.onSelectNombramiento(resp.id_catnombramientos);
          this.cattipohorasdocenteSvc.getCatalogoSegunMateria(resp.id_materiasclase).subscribe(resp => {
          this.cattipohorasdocenteCat = resp;
          });

          if(this.actionForm.toUpperCase()=="COPIAR"){
            this.actionForm="NUEVO";
            this.record.id=0;
            this.edicion_en_copiar=true;
          }
        });
      });
    }

    // console.log($('#modalTest').html()); poner el id a algun elemento para testear
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
    this.record.id_catplanteles_aplicacion=valor;
    let id_cattiposemestre=0;
    if(this.recordsemestre.tipo=="A") id_cattiposemestre=1
    if(this.recordsemestre.tipo=="B") id_cattiposemestre=2
    if(this.recordsemestre.tipo=="A,B") id_cattiposemestre=3
    this.gruposclaseSvc.getCatalogoConHorasDisponiblesSegunPlantel(valor,this.record.id,this.recordsemestre.tipo,this.record_id_semestre,id_cattiposemestre).subscribe(resp => {
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
    this.record.cantidad=this.materiasclaseCat.find(a=>a.id==valor).horasdisponibles;
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
          console.log("resp=>",resp)
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

}
