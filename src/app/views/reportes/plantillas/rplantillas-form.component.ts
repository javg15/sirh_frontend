import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ReportesService } from '../services/reportes.service';
import { CategoriasService } from '../../catalogos/categorias/services/categorias.service';
import { CatplantelesService } from '../../catalogos/catplanteles/services/catplanteles.service';
import { CatzonaeconomicaService } from '../../catalogos/catzonaeconomica/services/catzonaeconomica.service';
import { CatestatusplazaService } from '../../catalogos/catestatusplaza/services/catestatusplaza.service';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Categorias, Catplanteles, Catzonaeconomica, Catestatusplaza, Catquincena } from '../../../_models';
import { ValidationSummaryComponent } from '../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../_services/is-loading/is-loading.service';
import { CatquincenaService } from '../../catalogos/catquincena/services/catquincena.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-rplantillas-form',
  templateUrl: './rplantillas-form.component.html',
})

export class RPlantillasFormComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción
  @Output() redrawEvent = new EventEmitter<any>();
  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;
  nombreTablaTracking:string="reportes_histo.reportes_tracking";

  private elementModal: any;
  @ViewChild('basicModal') basicModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;
  
  //@ViewChild('txtconsecutivo') txtconsecutivo: ElementRef;

  categoriasCat: Categorias[];
  catplantelesCat: Catplanteles[];
  catzonaeconomicaCat: Catzonaeconomica[];
  catestatusplazaCat: Catestatusplaza[];
  catquincenaCat: Catquincena[];

  constructor(private isLoadingService: IsLoadingService,
    private reportesService: ReportesService, private el: ElementRef,
    private catplantelesSvc: CatplantelesService,
    private catzonaeconomicaSvc: CatzonaeconomicaService,
    private categoriasSvc: CategoriasService,
    private catestatusplazaSvc: CatestatusplazaService,
    private catquincenaSvc: CatquincenaService,
  ) {
    this.elementModal = el.nativeElement;
    this.catplantelesSvc.getCatalogo().subscribe(resp => {
      this.catplantelesCat = resp;
    });
    this.catestatusplazaSvc.getCatalogo().subscribe(resp => {
      this.catestatusplazaCat = resp;
    });
    this.catquincenaSvc.getCatalogo().subscribe(resp => {
      this.catquincenaCat = resp;
    });
  }

  ngOnInit(): void {

    let modal = this;

    // ensure id attribute exists
    if (!modal.id) {//idModal {
      console.error('modal must have an id');
      return;
    }
    // add self (this modal instance) to the modal service so it's accessible from controllers
    modal.reportesService.add(modal);

    //loading
    this.userFormIsPending = this.isLoadingService.isLoading$({ key: 'loading' });
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.reportesService.remove(this.id); //idModal
    this.elementModal.remove();
  }



  // open modal
  open(idItem: string, accion: string, id_rplantillasdocsnombramiento_actual: number, id_estatus: number): void {
    this.actionForm = accion;
    this.botonAccion = actionsButtonSave[accion];
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

}
