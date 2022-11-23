import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ReportesService } from '../../services/reportes.service';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Catzonaeconomica } from '../../../../_models';
import { CatzonaeconomicaService } from '../../../catalogos/catzonaeconomica/services/catzonaeconomica.service';


import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-rcatcategorias-form',
  templateUrl: './rcatcategorias-form.component.html',
})

export class RCatCategoriasFormComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() id: string; //idModal
  
  tituloForm: string;

  private elementModal: any;
  @ViewChild('RCategoriasModal') RCategoriasModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild('vsRepCategorias') vsRepCategorias: ValidationSummaryComponent;
  
  //@ViewChild('txtconsecutivo') txtconsecutivo: ElementRef;
  catzonaeconomicaCat: Catzonaeconomica[];

  param_id_catzonaeconomica:number;

  tipoReporte:number;

  constructor(private isLoadingService: IsLoadingService,
    private reportesService: ReportesService, private el: ElementRef,
    private catzonaeconomicaSvc: CatzonaeconomicaService
  ) {
    this.elementModal = el.nativeElement;
    this.catzonaeconomicaSvc.getCatalogo().subscribe(resp => {
      this.catzonaeconomicaCat = resp;
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

  MostrarReporte(form){
    this.reportesService.getCategoriasListado('/reportes/categorias',this.param_id_catzonaeconomica);
  }

  // open modal
  open(idItem: string): void {
    let titulo="";
    
    this.tituloForm =  "Reporte - Listado de categorías" + titulo;
    this.RCategoriasModal.show();
  }

  // close modal
  close(): void {
    this.RCategoriasModal.hide();
    
  }

}
