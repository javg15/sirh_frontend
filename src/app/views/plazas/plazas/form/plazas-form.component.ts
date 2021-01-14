import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { PlazasService } from '../services/plazas.service';
import { CategoriasService } from '../../../catalogos/categorias/services/categorias.service';
import { CatplantelesService } from '../../../catalogos/catplanteles/services/catplanteles.service';
import { CatcentrostrabajoService } from '../../../catalogos/catcentrostrabajo/services/catcentrostrabajo.service';
import { CatzonaeconomicaService } from '../../../catalogos/catzonaeconomica/services/catzonaeconomica.service';
import { CatzonageograficaService } from '../../../catalogos/catzonageografica/services/catzonageografica.service';
import { CatestatusplazaService } from '../../../catalogos/catestatusplaza/services/catestatusplaza.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Plazas, Categorias, Catcentrostrabajo, Catplanteles, Catzonaeconomica, Catzonageografica, Catestatusplaza } from '../../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';


declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-plazas-form',
  templateUrl: './plazas-form.component.html',
  styleUrls: ['./plazas-form.component.css']
})

export class PlazasFormComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() botonAccion: string;
  @Output() redrawEvent = new EventEmitter<any>();
  actionForm: string;
  tituloForm: string;

  private elementModal: any;
  @ViewChild('basicModal') basicModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  record: Plazas;
  categoriasCat:Categorias[];
  catplantelesCat:Catplanteles[];
  catcentrostrabajoCat: Catcentrostrabajo[];
  catzonaeconomicaCat:Catzonaeconomica[];
  catzonageograficaCat:Catzonageografica[];
  catestatusplazaCat:Catestatusplaza[];


  constructor(private plazasService: PlazasService, private el: ElementRef,
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

      this.categoriasSvc.getCatalogo().subscribe(resp => {
        this.categoriasCat = resp;
      });
      this.catestatusplazaSvc.getCatalogo().subscribe(resp => {
        this.catestatusplazaCat = resp;
      });
  }

  newRecord(): Plazas {
    return {
      id: 0,id_categorias: 0,consecutivo: 0, id_catplanteles: 0,  id_catcentrostrabajo: 0,
      state: '', id_catplantelescobro: 0, id_catzonageografica: 0, fecha_creacion: new Date(),
      fecha_fin: new Date(), id_catestatusplaza: 0, statussicodes: 0, id_puesto: 0,
      id_sindicato: 0, created_at: new Date(),  updated_at: new Date(), id_usuarios_r: 0
    };
  }
  ngOnInit(): void {

      this.record =this.newRecord();

      let modal = this;

      // ensure id attribute exists
      if (!modal.id) {
          console.error('modal must have an id');
          return;
      }
      // add self (this modal instance) to the modal service so it's accessible from controllers
      modal.plazasService.add(modal);
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.plazasService.remove(this.id);
      this.elementModal.remove();
  }

  onSelectPlantel(select_plantel) {
    let clave=$("#selectPlantel option:selected").text().split("-")[0];
    this.record.id_catplanteles=select_plantel.value;
    this.record.id_catcentrostrabajo=0;
    this.catcentrostrabajoCat=[];

    this.catcentrostrabajoSvc.getCatalogoSegunPlantel(this.record.id_catplanteles).subscribe(resp => {
      this.catcentrostrabajoCat = resp;
    });
  }

  submitAction(form) {

    if(this.actionForm.toUpperCase()!=="VER"){
      this.validSummary.resetErrorMessages(form);

      this.plazasService.setRecord(this.record,this.actionForm).subscribe(resp => {
        if (resp.hasOwnProperty('error')) {
          this.validSummary.generateErrorMessagesFromServer(resp.message);
        }
        else if(resp.message=="success"){
          if(this.actionForm.toUpperCase()==="NUEVO") this.actionForm="editar";
          this.record.id=resp.id;
          this.successModal.show();
          setTimeout(()=>{ this.successModal.hide(); }, 2000)
        }
      });
    }
  }

  // open modal
  open(idItem: string, accion: string):  void {
    this.actionForm=accion;
    this.botonAccion=actionsButtonSave[accion];
    this.tituloForm=titulosModal[accion] + " registro";

    if(idItem=="0"){
      this.record =this.newRecord();
    } else {

    this.plazasService.getRecord(idItem).subscribe(resp => {
      this.record = resp;
      this.catcentrostrabajoSvc.getCatalogoSegunPlantel(this.record.id_catplanteles).subscribe(resp => {
        this.catcentrostrabajoCat = resp;
      });
    });
  }

    // console.log($('#modalTest').html()); poner el id a algun elemento para testear
    this.basicModal.show();
  }

  // close modal
  close(): void {
      this.basicModal.hide();
      if(this.actionForm.toUpperCase()!="VER"){
        this.redrawEvent.emit({
          campo: 0,
          operador: 0,
          valor: ''
        });
      }
  }

  // log contenido de objeto en formulario
  get diagnosticValidate() { return JSON.stringify(this.record); }
}
