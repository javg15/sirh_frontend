import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ReportesService } from '../services/reportes.service';
import { CategoriasService } from '../../catalogos/categorias/services/categorias.service';
import { CatplantelesService } from '../../catalogos/catplanteles/services/catplanteles.service';
import { CatzonaeconomicaService } from '../../catalogos/catzonaeconomica/services/catzonaeconomica.service';
import { CatestatusplazaService } from '../../catalogos/catestatusplaza/services/catestatusplaza.service';
import { SemestreService } from '../../catalogos/semestre/services/semestre.service';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Categorias, Catplanteles, Catzonaeconomica, Catestatusplaza, Catquincena, Semestre } from '../../../_models';
import { ValidationSummaryComponent } from '../../_shared/validation/validation-summary.component';
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
  
  tituloForm: string;

  private elementModal: any;
  @ViewChild('RPlantillasModal') RPlantillasModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild('vsRepPlantilla') vsRepPlantilla: ValidationSummaryComponent;
  
  //@ViewChild('txtconsecutivo') txtconsecutivo: ElementRef;
  semestreCat:Semestre[];
  categoriasCat: Categorias[];
  catplantelesCat: Catplanteles[];
  catzonaeconomicaCat: Catzonaeconomica[];
  catestatusplazaCat: Catestatusplaza[];
  catquincenaCat: Catquincena[];

  param_id_catplanteles:number;
  param_id_semestre:number;
  param_plantel:string;

  tipoReporte:number;

  constructor(private isLoadingService: IsLoadingService,
    private reportesService: ReportesService, private el: ElementRef,
    private catplantelesSvc: CatplantelesService,
    private catzonaeconomicaSvc: CatzonaeconomicaService,
    private categoriasSvc: CategoriasService,
    private catestatusplazaSvc: CatestatusplazaService,
    private catquincenaSvc: CatquincenaService,
    private semestreSvc: SemestreService,
  ) {
    this.elementModal = el.nativeElement;
    this.semestreSvc.getCatalogo().subscribe(resp => {
      this.semestreCat = resp.sort((a,b) => b.text.localeCompare(a.text));
      if(this.semestreCat.length>0){
        this.param_id_semestre=this.semestreCat[0].id;
      }
    });
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

  MostrarReporte(form){
    this.vsRepPlantilla.resetErrorMessages(form);

    if(this.param_id_catplanteles>0){
      let dato=this.catplantelesCat.find((rec)=>{
        if(rec.id==this.param_id_catplanteles)
          return rec
        });
      
      this.param_plantel=dato.clave + ' - ' + dato.ubicacion
      
      if(this.tipoReporte==1)
        this.reportesService.getReportePlantilla('/reportes/personal_estudios',this.param_id_catplanteles,this.param_id_semestre,this.param_plantel);
      else if(this.tipoReporte==2)
        this.reportesService.getReportePlantillaMateria('/reportes/personal_estudios_materia',this.param_id_catplanteles,this.param_id_semestre,this.param_plantel);
    }
    else{
      this.vsRepPlantilla.generateErrorMessagesFromServer({id_catplanteles: "Seleccione el plantel a consultar"});
    }

  }

  // open modal
  open(idItem: string): void {
    let titulo="";
    if(idItem.toLowerCase()=="/reportes/plantillas/plantillasdiradm"){
      this.tipoReporte=1;
      titulo="Plantillas Directivos y Administrativos";
    }
    else if(idItem.toLowerCase()=="/reportes/plantillas/plantillasdoc"){
      this.tipoReporte=2;
      titulo="Plantillas Docentes";
    }
    
    this.tituloForm =  "Reporte - " + titulo;
    this.RPlantillasModal.show();
  }

  // close modal
  close(): void {
    this.RPlantillasModal.hide();
    
  }

}
