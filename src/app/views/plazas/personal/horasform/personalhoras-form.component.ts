import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Personalhoras, Personal, Semestre, Catplanteles, Catquincena, Gruposclase, Materiasclase } from '../../../../_models';
import { Archivos } from '../../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';

import { PersonalhorasFormService } from '../services/personalhorasform.service';
import { CatquincenaService } from '../../../catalogos/catquincena/services/catquincena.service';
import { GruposclaseService } from '../../../catalogos/gruposclase/services/gruposclase.service';
import { MateriasclaseService } from '../../../catalogos/materiasclase/services/materiasclase.service';
import { ListUploadComponent } from '../../../_shared/upload/list-upload.component';
import { FormUploadComponent } from '../../../_shared/upload/form-upload.component';
import { SemestreService } from '../../../catalogos/semestre/services/semestre.service';
import { CatplantelesService } from '../../../catalogos/catplanteles/services/catplanteles.service';
import { PersonalService } from '../services/personal.service';


declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-personalhoras-form',
  templateUrl: './personalhoras-form.component.html',
  styleUrls: ['./personalhoras-form.component.css']
})

export class PersonalhorasFormComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción
  @Output() redrawEvent = new EventEmitter<any>();

  nombreModulo = 'Personalhoras';

  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;

  private elementModal: any;

  @ViewChild('basicModalPersonalhoras') basicModalPersonalhoras: ModalDirective;
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
    id: 0,tipo: '',anio: 0,quincena: 0,qnainiciosemestre:'',qnafinsemestre: '',actual: 0,idCatquincenaIni: 0,
    idCatquincenaFin: 0, idCatquincenaFininterinas: 0,permitemodificacion: 0,permitecargadeplantillas: 0,
    created_at: new Date(),  updated_at: new Date(), id_usuarios_r: 0,state:''
};

  catplantelesCat: Catplanteles[];
  catquincenaCat: Catquincena[];
  gruposclaseCat: Gruposclase[];
  materiasclaseCat: Materiasclase[];
  keywordSearch = 'full_name';
  isLoadingSearch: boolean;
  //recordJsonTipodoc1:any={UltimoGradodeEstudios:0,AreadeCarrera:0,Carrera:0,Estatus:0};

  constructor(private isLoadingService: IsLoadingService,
    private personalhorasformService: PersonalhorasFormService,
    private personalSvc: PersonalService,
    private semestreSvc: SemestreService,
    private catquincenaSvc: CatquincenaService,
    private catplantelesSvc: CatplantelesService,
    private gruposclaseSvc: GruposclaseService,
    private materiasclaseSvc: MateriasclaseService,
    private el: ElementRef,
  ) {
    this.elementModal = el.nativeElement;

    this.catquincenaSvc.getCatalogo().subscribe(resp => {
      this.catquincenaCat = resp;
    });

  }

  newRecord(idParent: number, idSemestre: number): Personalhoras {
    return {
      id: 0, id_personal: idParent, cantidad: 0, id_plazas: 0, id_horasclase: 0,
      id_cattipohorasmateria: 0, id_catnombramientos: 0, id_semestre: idSemestre,
      id_catestatushora: 0, id_catquincena_ini: 0, id_catquincena_fin: 0,
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
    modal.personalhorasformService.add(modal);

    //loading
    this.userFormIsPending = this.isLoadingService.isLoading$({ key: 'loading' });
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.personalhorasformService.remove(this.id); //idModal
    this.elementModal.remove();
  }


  async submitAction(admin) {

    if (this.actionForm.toUpperCase() !== "VER") {

      this.validSummary.resetErrorMessages(admin);

      await this.isLoadingService.add(
        this.personalhorasformService.setRecord(this.record, this.actionForm).subscribe(async resp => {
          if (resp.hasOwnProperty('error')) {
            this.validSummary.generateErrorMessagesFromServer(resp.message);
          }
          else if (resp.message == "success") {
            if (this.actionForm.toUpperCase() == "NUEVO") this.actionForm = "editar";
            this.record.id = resp.id;

            this.successModal.show();
            setTimeout(() => { this.successModal.hide(); }, 2000)
          }
        }), { key: 'loading' });
    }
  }

  // open modal
  open(idItem: string, accion: string, idParent: number, idSemestre: number): void {
    this.actionForm = accion;
    this.botonAccion = actionsButtonSave[accion];
    this.tituloForm = "Datos Sindicato - " + titulosModal[accion] + " registro";

    //catalogo de planteles segun personal
    this.catplantelesSvc.getCatalogoSegunPersonal(idParent).subscribe(resp => {
      this.catplantelesCat = resp;
    });

    this.personalSvc.getRecord(idParent).subscribe(resp => {
      this.recordpersonal = resp;
    });
    this.semestreSvc.getRecord(idSemestre).subscribe(resp => {
      this.recordsemestre = resp;
    });
    this.catplantelesSvc.getCatalogoSegunPersonal(idParent).subscribe(resp => {
      this.catplantelesCat = resp;
    });

    if (idItem == "0") {
      this.record = this.newRecord(idParent, idSemestre);
    } else {
      //obtener el registro
      this.personalhorasformService.getRecord(idParent).subscribe(resp => {
        this.record = resp;
      });
    }

    // console.log($('#modalTest').html()); poner el id a algun elemento para testear
    this.basicModalPersonalhoras.show();
  }

  // close modal
  close(): void {
    this.basicModalPersonalhoras.hide();
    if (this.actionForm.toUpperCase() != "VER") {
      this.redrawEvent.emit(null);
    }
  }

  // log contenido de objeto en adminulario
  get diagnosticValidate() { return JSON.stringify(this.record); }

  onSelectPlantel(valor: any) {
    this.gruposclaseSvc.getCatalogoSegunPlantel(valor, this.record.id_semestre).subscribe(resp => {
      this.gruposclaseCat = resp;
    });
  }

  onSelectGruposclase(valor: any) {
    this.materiasclaseSvc.getCatalogoSegunGrupo(valor).subscribe(resp => {
      this.materiasclaseCat = resp;
    });
  }
}
