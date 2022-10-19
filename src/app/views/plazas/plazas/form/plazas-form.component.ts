import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { PlazasService } from '../services/plazas.service';
import { CategoriasService } from '../../../catalogos/categorias/services/categorias.service';
import { CatplantelesService } from '../../../catalogos/catplanteles/services/catplanteles.service';
import { CatcentrostrabajoService } from '../../../catalogos/catcentrostrabajo/services/catcentrostrabajo.service';
import { CatzonaeconomicaService } from '../../../catalogos/catzonaeconomica/services/catzonaeconomica.service';
import { CatzonageograficaService } from '../../../catalogos/catzonageografica/services/catzonageografica.service';
import { CatestatusplazaService } from '../../../catalogos/catestatusplaza/services/catestatusplaza.service';
import { CategoriasdetalleService } from '../../../catalogos/categorias/services/categoriasdetalle.service';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Plazas, Categorias, Catcentrostrabajo, Catplanteles, Catzonaeconomica, Catzonageografica, Catestatusplaza, Categoriasdetalle, Catquincena } from '../../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';
import { CatquincenaService } from '../../../catalogos/catquincena/services/catquincena.service';

import { TrackingFormComponent } from '../../../_shared/tracking/tracking-form.component';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-plazas-form',
  templateUrl: './plazas-form.component.html',
  styleUrls: ['./plazas-form.component.css']
})

export class PlazasFormComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción
  @Output() redrawEvent = new EventEmitter<any>();
  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;
  nombreTablaTracking:string="plazas_histo.plazas_tracking";

  private elementModal: any;
  @ViewChild('basicModal') basicModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;
  @ViewChild('txtzonaeconomica') txtzonaeconomica: ElementRef;
  @ViewChild('txtzonageografica') txtzonageografica: ElementRef;
  @ViewChild('txtplazasautorizadaszona') txtplazasautorizadaszona: ElementRef;
  @ViewChild('txtplazasdisponibleszona') txtplazasdisponibleszona: ElementRef;
  @ViewChild('txtplazasautorizadasplantel') txtplazasautorizadasplantel: ElementRef;
  @ViewChild('txtplazasdisponiblesplantel') txtplazasdisponiblesplantel: ElementRef;
  @ViewChild(TrackingFormComponent) trackingForm: TrackingFormComponent
  //@ViewChild('txtconsecutivo') txtconsecutivo: ElementRef;

  record: Plazas;
  categoriasCat: Categorias[];
  catplantelesCat: Catplanteles[];
  catcentrostrabajoCat: Catcentrostrabajo[];
  catzonaeconomicaCat: Catzonaeconomica[];
  catzonageograficaCat: Catzonageografica[];
  catestatusplazaCat: Catestatusplaza[];
  categoriasdetalleCat: any[];
  catquincenaCat: Catquincena[];
  varHorasAB: boolean;
  editaconsecutivo: boolean;
  permiteeditar: boolean;
  permiteeditar_comision: boolean;
  record_id_plantillasdocsnombramiento_actual: number;
  record_id_estatus: number;

  constructor(private isLoadingService: IsLoadingService,
    private plazasService: PlazasService, private el: ElementRef,
    private catplantelesSvc: CatplantelesService,
    private catcentrostrabajoSvc: CatcentrostrabajoService,
    private catzonaeconomicaSvc: CatzonaeconomicaService,
    private catzonageograficaSvc: CatzonageograficaService,
    private categoriasdetalleSvc: CategoriasdetalleService,
    private categoriasSvc: CategoriasService,
    private catestatusplazaSvc: CatestatusplazaService,
    private catquincenaSvc: CatquincenaService,
  ) {
    this.elementModal = el.nativeElement;
    this.catplantelesSvc.getCatalogo().subscribe(resp => {
      this.catplantelesCat = resp;
    });
    this.catcentrostrabajoSvc.getCatalogo().subscribe(resp => {
      this.catcentrostrabajoCat = resp;
    });
    this.catestatusplazaSvc.getCatalogo().subscribe(resp => {
      this.catestatusplazaCat = resp;
    });
    this.catquincenaSvc.getCatalogo().subscribe(resp => {
      this.catquincenaCat = resp;
    });
  }

  newRecord(): Plazas {
    return {
      id: 0, id_categorias: 0, consecutivo: 0, id_catplanteles: 0, id_catcentrostrabajo: 0,
      state: '', id_catplantelescobro: 0, id_catzonageografica: 0, id_catquincena_ini: 0,
      id_catquincena_fin: 0, id_catestatusplaza: 1, statussicodes: 0, id_puesto: 0, estatus: '', id_categoriasdetalle: 0,
      id_catsindicato: 0, created_at: new Date(), updated_at: new Date(), id_usuarios_r: 0,
      horas: 0, horasb: 0,id_catplanteles_comision:0
    };
  }
  ngOnInit(): void {

    this.record = this.newRecord();

    let modal = this;

    // ensure id attribute exists
    if (!modal.id) {//idModal {
      console.error('modal must have an id');
      return;
    }
    // add self (this modal instance) to the modal service so it's accessible from controllers
    modal.plazasService.add(modal);

    //loading
    this.userFormIsPending = this.isLoadingService.isLoading$({ key: 'loading' });
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.plazasService.remove(this.id); //idModal
    this.elementModal.remove();
  }

  onSelectPlantel(select_plantel) {
    //let clave=$("#selectPlantel option:selected").text().split("-")[0];
    this.record.id_catplanteles = select_plantel;
    this.record.id_catcentrostrabajo = 0;
    this.catcentrostrabajoCat = [];

    this.catcentrostrabajoSvc.getCatalogoSegunPlantel(this.record.id_catplanteles).subscribe(resp => {
      this.catcentrostrabajoCat = resp;
    });

    //Obtener las categporias segun el tipo de plantel seleccionado
    let tipoplantel = null;
    if (select_plantel > 0)
      tipoplantel = this.catplantelesCat.find(e => e.id == select_plantel).tipoplantel;
    this.categoriasSvc.getCatalogoSegunPlantel(tipoplantel).subscribe(resp => {
      this.categoriasCat = resp;
    });

    if (select_plantel > 0)
      this.showAdicionalesPlantel(select_plantel);
  }

  onSelectCategoria(select_categoria) {
    this.record.id_categorias = select_categoria;

    let categoria = null;
    if (select_categoria > 0) {
      this.categoriasSvc.getEstaEnTablaHomologadas(select_categoria).subscribe(resp => {
        let EstaentablaHomologada = resp;

        categoria = this.categoriasCat.find(e => e.id == select_categoria);

        if (categoria.id_cattipocategoria == 2 && EstaentablaHomologada ==true)
          this.varHorasAB = true;
        else
          this.varHorasAB = false;
      });
    }
    else
      this.varHorasAB = false;

    if (select_categoria > 0)
      this.showAdicionalesCategoria();
  }

  /**
   * Realiza operaciones extras segun los parametros evaluados
   */
  showAdicionalesCategoria() {
    if (this.record.id_categorias > 0 && this.record.id_catplanteles > 0) {
      this.plazasService.getRecordPlazasInfo(this.record.id_categorias, this.record.id_catplanteles).subscribe(resp => {
        this.txtplazasdisponibleszona.nativeElement.value = resp[0].fn_plazas_disponibles.totaldisponibleszona;
        this.txtplazasautorizadaszona.nativeElement.value = resp[0].fn_plazas_disponibles.totalautorizadaszona;
        this.txtplazasdisponiblesplantel.nativeElement.value = resp[0].fn_plazas_disponibles.totaldisponiblesplantel;
        this.txtplazasautorizadasplantel.nativeElement.value = resp[0].fn_plazas_disponibles.totalautorizadasplantel;

        //cambio de color alertando de que ya no hay vacantes
        if (resp[0].fn_plazas_disponibles.totalplazasdisponibles == 0 && this.actionForm.toLowerCase() == "nuevo")
          this.txtplazasdisponibleszona.nativeElement.style.backgroundColor = "yellow";
        else
          this.txtplazasdisponibleszona.nativeElement.style.backgroundColor = "";
      });

      if (this.actionForm.toUpperCase() == "NUEVO") {//no calcular el consecutivo en la edicion
        this.plazasService.getConsecutivo(this.record.id_categorias).subscribe(resp => {
          this.record.consecutivo = resp;
        });
      }

      this.categoriasdetalleSvc.getCatalogo(this.record.id_categorias).subscribe(resp => {
        this.categoriasdetalleCat = resp;
        if (this.categoriasdetalleCat.length > 0)//si solo existe un registro
          this.categoriasdetalleCat.unshift({ id: null, codigo: '', clave_ze: '' });
      });
    }
  }

  showAdicionalesPlantel(select_plantel) {

    this.catplantelesSvc.getRecord(select_plantel).subscribe(resp => {
      this.catzonaeconomicaSvc.getRecord(resp.id_catzonaeconomica).subscribe(resp => {
        this.txtzonaeconomica.nativeElement.value = resp.descripcion;
      });

      this.catzonageograficaSvc.getRecord(resp.id_catzonageografica).subscribe(resp => {
        this.txtzonageografica.nativeElement.value = resp.descripcion;
      })
    });

    this.showAdicionalesCategoria();

  }

  async submitAction(form) {

    if (this.actionForm.toUpperCase() !== "VER") {
      this.validSummary.resetErrorMessages(form);

      if (//ya tiene un nombraminto en el historial
        this.record_id_plantillasdocsnombramiento_actual != 0
        //vacante,cancelada,nuevacreacion
        && this.record_id_estatus != 0 && this.record_id_estatus != 1 && this.record_id_estatus != 7 && this.record_id_estatus != 8
        //
        && this.actionForm.toUpperCase() == "DESACTIVAR"
      )
        this.validSummary.generateErrorMessagesFromServer({ Titular: "El registro no puede desactivarse debido a que el estatus actual de la plaza es diferente a VACANTE DEFINITIVA, NUEVA CREACIÓN O CANCELADA" });

      else {
        await this.isLoadingService.add(
          this.plazasService.setRecord(this.record, this.actionForm).subscribe(resp => {
            if (resp.hasOwnProperty('error')) {
              this.validSummary.generateErrorMessagesFromServer(resp.message);
            }
            else if (resp.message == "success") {
              if (this.actionForm.toUpperCase() == "NUEVO") this.actionForm = "editar";
              this.record.id = resp.id;
              this.successModal.show();
              setTimeout(() => { this.successModal.hide(); this.close(); }, 2000)
            }
          }), { key: 'loading' });
      }
    }
  }


  // open modal
  open(idItem: string, accion: string, id_plantillasdocsnombramiento_actual: number, id_estatus: number): void {
    this.actionForm = accion;
    this.botonAccion = actionsButtonSave[accion];
    this.editaconsecutivo = false;
    this.permiteeditar_comision=this.permiteeditar = false;
    this.record_id_plantillasdocsnombramiento_actual = id_plantillasdocsnombramiento_actual;
    this.record_id_estatus = id_estatus;

    if (idItem == "0") {
      this.record = this.newRecord();
      this.tituloForm = "Plazas - " + titulosModal[accion] + " registro";
      this.permiteeditar_comision=this.permiteeditar = true;
    } else {
      this.editaconsecutivo = true;
      this.tituloForm = "Plazas - " + titulosModal[accion] + " registro";
      this.plazasService.getRecord(idItem).subscribe(resp => {
        this.record = resp;
        
        //si aun no tiene una asignación 
        if (id_plantillasdocsnombramiento_actual == 0)
          this.permiteeditar_comision=this.permiteeditar = true;
        else if (id_estatus==0 || id_estatus == 1 || id_estatus == 7 || id_estatus == 8) //vacante,cancelada,nuevacreacion
          this.permiteeditar_comision=this.permiteeditar = true;
        else
          this.permiteeditar_comision=this.permiteeditar = false;

        if (this.actionForm.toUpperCase() == "COPIAR") {
          this.actionForm = "NUEVO";
          this.record.id = 0;
          this.permiteeditar_comision=this.permiteeditar = true;
        }

        if (this.actionForm.toUpperCase() == "COMISIONAR") {
          this.actionForm = "EDITAR";
          this.permiteeditar_comision = true;
        }

        this.catcentrostrabajoSvc.getCatalogoSegunPlantel(this.record.id_catplanteles).subscribe(resp => {
          this.catcentrostrabajoCat = resp;
        });
        this.plazasService.getClave(idItem).subscribe(resp => {
          this.tituloForm = "Plazas - " + titulosModal[accion] + " registro - " + resp[0].clave;
        });

        //se pasa a esta variable porque en alguna parte desconocida  this.record.id_categorias se pasa a null
        let id_categorias = this.record.id_categorias;

        this.onSelectPlantel(this.record.id_catplanteles);
        
        //Obtener las categporias segun el tipo de plantel seleccionado
        let tipoplantel = this.catplantelesCat.find(e => e.id == this.record.id_catplanteles).tipoplantel;
        this.categoriasSvc.getCatalogoSegunPlantel(tipoplantel).subscribe(resp => {
          this.categoriasCat = resp;
          this.record.id_categorias = id_categorias;
          this.onSelectCategoria(id_categorias);
        });
        /*this.showAdicionalesPlantel(resp.id_catplanteles);
        this.showAdicionalesCategoria();*/
      });
    }

    // console.log($('#modalTest').html()); poner el id a algun elemento para testear
    this.basicModal.show();
  }

  // close modal
  close(): void {
    this.basicModal.hide();
    if (this.actionForm.toUpperCase() != "VER") {
      this.redrawEvent.emit(null);
    }
  }

  // log contenido de objeto en formulario
  get diagnosticValidate() { return JSON.stringify(this.record); }
}
