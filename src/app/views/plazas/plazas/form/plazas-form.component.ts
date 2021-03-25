import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { PlazasService } from '../services/plazas.service';
import { CategoriasService } from '../../../catalogos/categorias/services/categorias.service';
import { CatplantelesService } from '../../../catalogos/catplanteles/services/catplanteles.service';
import { CatcentrostrabajoService } from '../../../catalogos/catcentrostrabajo/services/catcentrostrabajo.service';
import { CatzonaeconomicaService } from '../../../catalogos/catzonaeconomica/services/catzonaeconomica.service';
import { CatzonageograficaService } from '../../../catalogos/catzonageografica/services/catzonageografica.service';
import { CatestatusplazaService } from '../../../catalogos/catestatusplaza/services/catestatusplaza.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Plazas, Categorias, Catcentrostrabajo, Catplanteles, Catzonaeconomica, Catzonageografica, Catestatusplaza,Catsindicato } from '../../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';



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

  private elementModal: any;
  @ViewChild('basicModal') basicModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;
  @ViewChild('txtzonaeconomica') txtzonaeconomica: ElementRef;
  @ViewChild('txtzonageografica') txtzonageografica: ElementRef;
  @ViewChild('txtplazasdisponibles') txtplazasdisponibles: ElementRef;
  @ViewChild('txtplazasautorizadas') txtplazasautorizadas: ElementRef;
  @ViewChild('txtplazasautorizadasplantel') txtplazasautorizadasplantel: ElementRef;
    @ViewChild('txtconsecutivo') txtconsecutivo: ElementRef;

  record: Plazas;
  categoriasCat:Categorias[];
  catplantelesCat:Catplanteles[];
  catcentrostrabajoCat: Catcentrostrabajo[];
  catzonaeconomicaCat:Catzonaeconomica[];
  catzonageograficaCat:Catzonageografica[];
  catestatusplazaCat:Catestatusplaza[];



  constructor(private isLoadingService: IsLoadingService,
      private plazasService: PlazasService, private el: ElementRef,
      private catplantelesSvc: CatplantelesService,
      private catcentrostrabajoSvc: CatcentrostrabajoService,
      private catzonaeconomicaSvc: CatzonaeconomicaService,
      private catzonageograficaSvc: CatzonageograficaService,
      private categoriasSvc: CategoriasService,
        private catestatusplazaSvc: CatestatusplazaService,

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
  }

  newRecord(): Plazas {
    return {
      id: 0,id_categorias: 0,consecutivo: 0, id_catplanteles: 0,  id_catcentrostrabajo: 0,
      state: '', id_catplantelescobro: 0, id_catzonageografica: 0, fecha_creacion: null,
      fecha_fin: null, id_catestatusplaza: 1, statussicodes: 0, id_puesto: 0,estatus:'',
      id_catsindicato: 0, created_at: new Date(),  updated_at: new Date(), id_usuarios_r: 0
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
      modal.plazasService.add(modal);

      //loading
      this.userFormIsPending =this.isLoadingService.isLoading$({ key: 'loading' });
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.plazasService.remove(this.id); //idModal
      this.elementModal.remove();
  }

  onSelectPlantel(select_plantel) {
    //let clave=$("#selectPlantel option:selected").text().split("-")[0];
    this.record.id_catplanteles=select_plantel;
    this.record.id_catcentrostrabajo=0;
    this.catcentrostrabajoCat=[];

    this.catcentrostrabajoSvc.getCatalogoSegunPlantel(this.record.id_catplanteles).subscribe(resp => {
      this.catcentrostrabajoCat = resp;
    });

    //Obtener las categporias segun el tipo de plantel seleccionado
    let tipoplantel=this.catplantelesCat.find(e=>e.id==select_plantel).tipoplantel;
    this.categoriasSvc.getCatalogoSegunPlantel(tipoplantel).subscribe(resp => {
      this.categoriasCat = resp;
    });

    if(select_plantel>0)
      this.showAdicionalesPlantel(select_plantel);
  }

  onSelectCategoria(select_categoria){
    this.record.id_categorias=select_categoria;
    this.showAdicionalesCategoria();
  }

  /**
   * Realiza operaciones extras segun los parametros evaluados
   */
  showAdicionalesCategoria(){
    if(this.record.id_categorias>0 && this.record.id_catplanteles>0){
      this.plazasService.getRecordPlazasInfo(this.record.id_categorias,this.record.id_catplanteles).subscribe(resp => {
        this.txtplazasdisponibles.nativeElement.value=resp[0].fn_plazas_disponibles.totalplazasdisponibles;
        this.txtplazasautorizadas.nativeElement.value=resp[0].fn_plazas_disponibles.totalplazasautorizadas;
        this.txtplazasautorizadasplantel.nativeElement.value=resp[0].fn_plazas_disponibles.totalautorizadasalplantel;

        //cambio de color alertando de que ya no hay vacantes
        if(resp[0].fn_plazas_disponibles.totalplazasdisponibles==0 && this.actionForm.toLowerCase()=="nuevo")
          this.txtplazasdisponibles.nativeElement.style.backgroundColor ="yellow";
        else
          this.txtplazasdisponibles.nativeElement.style.backgroundColor ="";
      });
      this.plazasService.getConsecutivo(this.record.id_categorias).subscribe(resp => {
        this.txtconsecutivo.nativeElement.value=resp;
      });
    }
  }

  showAdicionalesPlantel(select_plantel){

    this.catplantelesSvc.getRecord(select_plantel).subscribe(resp => {
      this.catzonaeconomicaSvc.getRecord(resp.id_catzonaeconomica).subscribe(resp => {
        this.txtzonaeconomica.nativeElement.value=resp.descripcion;
      });

      this.catzonageograficaSvc.getRecord(resp.id_catzonageografica).subscribe(resp => {
        this.txtzonageografica.nativeElement.value=resp.descripcion;
      })
    });

    this.showAdicionalesCategoria();

  }

  async submitAction(form) {

    if(this.actionForm.toUpperCase()!=="VER"){
      this.validSummary.resetErrorMessages(form);

      await this.isLoadingService.add(
      this.plazasService.setRecord(this.record,this.actionForm).subscribe(resp => {
        if (resp.hasOwnProperty('error')) {
          this.validSummary.generateErrorMessagesFromServer(resp.message);
        }
        else if(resp.message=="success"){
          if(this.actionForm.toUpperCase()=="NUEVO") this.actionForm="editar";
          this.record.id=resp.id;
          this.successModal.show();
          setTimeout(()=>{ this.successModal.hide(); }, 2000)
        }
      }),{ key: 'loading' });
    }
  }

  // open modal
  open(idItem: string, accion: string):  void {
    this.actionForm=accion;
    this.botonAccion=actionsButtonSave[accion];

    if(idItem=="0"){
      this.record =this.newRecord();
      this.tituloForm=titulosModal[accion] + " registro";
    } else {

      this.plazasService.getRecord(idItem).subscribe(resp => {
        this.record = resp;
        this.catcentrostrabajoSvc.getCatalogoSegunPlantel(this.record.id_catplanteles).subscribe(resp => {
          this.catcentrostrabajoCat = resp;
        });
        this.plazasService.getClave(idItem).subscribe(resp => {
          this.tituloForm=titulosModal[accion] + " registro - " + resp[0].clave;
        });

        this.onSelectPlantel(resp.id_catplanteles);
        this.onSelectCategoria(resp.id_categorias);
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
      if(this.actionForm.toUpperCase()!="VER"){
        this.redrawEvent.emit(null);
      }
  }

  // log contenido de objeto en formulario
  get diagnosticValidate() { return JSON.stringify(this.record); }
}
