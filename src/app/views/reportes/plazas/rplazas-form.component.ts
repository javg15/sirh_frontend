import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ReportesService } from '../services/reportes.service';
import { CategoriasService } from '../../catalogos/categorias/services/categorias.service';
import { CatplantelesService } from '../../catalogos/catplanteles/services/catplanteles.service';
import { CatestatusplazaService } from '../../catalogos/catestatusplaza/services/catestatusplaza.service';
import { CattiponominaService } from '../../catalogos/cattiponomina/services/cattiponomina.service';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Catplanteles, Cattiponomina, Categorias, Catestatusplaza } from '../../../_models';


import { ValidationSummaryComponent } from '../../_shared/validation/validation-summary.component';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../_services/is-loading/is-loading.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-rplazas-form',
  templateUrl: './rplazas-form.component.html',
})

export class RPlazasFormComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() id: string; //idModal
  
  tituloForm: string;

  private elementModal: any;
  @ViewChild('RPlazasModal') RPlazasModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild('vsRepPlazasListado') vsRepPlazasListado: ValidationSummaryComponent;
  
  //@ViewChild('txtconsecutivo') txtconsecutivo: ElementRef;
  categoriasCat: Categorias[];
  catplantelesCat: Catplanteles[];
  catestatusplazaCat: Catestatusplaza[];
  cattiponominaCat:Cattiponomina[];

  param_id_catplanteles:number;
  param_id_cattiponomina:number;
  param_id_categorias:number;
  param_id_catestatusplaza:number;

  tipoReporte:number;

  constructor(private isLoadingService: IsLoadingService,
    private reportesService: ReportesService, private el: ElementRef,
    private catplantelesSvc: CatplantelesService,private cattiponominaSvc: CattiponominaService,
    private categoriasSvc: CategoriasService,private CatestatusplazaSvc: CatestatusplazaService,
  ) {
    this.elementModal = el.nativeElement;
    this.catplantelesSvc.getCatalogo().subscribe(resp => {
      this.catplantelesCat = resp;
    });
    this.cattiponominaSvc.getCatalogo().subscribe(resp => {
      this.cattiponominaCat = resp;
    });
    this.categoriasSvc.getCatalogo().subscribe(resp => {
      this.categoriasCat = resp;
    });
    this.CatestatusplazaSvc.getCatalogo().subscribe(resp => {
      this.catestatusplazaCat = resp;
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

  MostrarReportePlazasListado(form){
    this.vsRepPlazasListado.resetErrorMessages(form);
    if(this.param_id_catplanteles>0){
      this.reportesService.getPlazasListado('/reportes/plazas_listado',this.param_id_catplanteles,this.param_id_cattiponomina,this.param_id_categorias,this.param_id_catestatusplaza);
    }
    else{
      this.vsRepPlazasListado.generateErrorMessagesFromServer({param_id_catplanteles: "Seleccione el Plantel a consultar"});
    }
    
  }

  // open modal
  open(idItem: string): void {
    let titulo="";
    titulo="Listado de plazas";
    
    this.tituloForm =  "Reporte - " + titulo;
    this.RPlazasModal.show();
  }

  // close modal
  close(): void {
    this.RPlazasModal.hide();
    
  }

}
