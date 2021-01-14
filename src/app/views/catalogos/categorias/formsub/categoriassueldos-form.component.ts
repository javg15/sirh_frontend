import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { DataTablesResponse } from '../../../../classes/data-tables-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Categoriassueldos, Catzonaeconomica, Catquincena } from '../../../../_models';
import { CatquincenaService } from '../../catquincena/services/catquincena.service';
import { CatzonaeconomicaService } from '../../catzonaeconomica/services/catzonaeconomica.service';

import { ValidationSummaryComponent } from '../../../_shared/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';

import { CategoriassueldosService } from '../services/categoriassueldos.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-categoriassueldos-form',
  templateUrl: './categoriassueldos-form.component.html',
  styleUrls: ['./categoriassueldos-form.component.css']
})

export class CategoriassueldosFormComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() botonAccion: string;
  @Input() varEditarHorPla: string = "1";
  @Output() redrawEvent = new EventEmitter<any>();

  /* El decorador @ViewChild recibe la clase DataTableDirective, para luego poder
  crear el dtElement que represente la tabla que estamos creando. */
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<DataTableDirective> = new Subject();


  actionForm: string;
  tituloForm: string;

  private elementModal: any;
  @ViewChild('basicModal') basicModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  record: Categoriassueldos;
  catquincenaCat:Catquincena[];
  catzonaeconomicaCat:Catzonaeconomica[];

  constructor(
    private el: ElementRef,
    private catzonaeconomicaSvc: CatzonaeconomicaService,
    private catquincenaSvc: CatquincenaService,
    private categoriassueldosService: CategoriassueldosService
      ) {
      this.elementModal = el.nativeElement;
      this.catzonaeconomicaSvc.getCatalogo().subscribe(resp => {
        this.catzonaeconomicaCat = resp;
      });
      this.catquincenaSvc.getCatalogo().subscribe(resp => {
        this.catquincenaCat = resp;
      });
  }

  newRecord(idParent:number): Categoriassueldos {
    return {
      id: 0,  clave: '', id_categorias:idParent, fecha_inicio:new Date(), fecha_fin:new Date(),
      totalplazaaut:0, totalhorasaut:0, id_catzonaeconomica:0, importe:0,
      state: '', created_at: new Date(),  updated_at: new Date(), id_usuarios_r: 0
    };
  }
  ngOnInit(): void {

      this.record =this.newRecord(0);

      let modal = this;

      // ensure id attribute exists
      if (!modal.id) {
          console.error('modal must have an id');
          return;
      }
      // add self (this modal instance) to the modal service so it's accessible from controllers
      modal.categoriassueldosService.add(modal);
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.categoriassueldosService.remove(this.id);
      this.elementModal.remove();
  }


  submitAction(form) {

    if(this.actionForm.toUpperCase()!=="VER"){
      this.validSummary.resetErrorMessages(form);

      this.categoriassueldosService.setRecord(this.record,this.actionForm).subscribe(resp => {
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

  changeCmdEditarHorPla(e){
    this.varEditarHorPla=e.target.value;
    this.HideShowEditarHorPla();

  }

  HideShowEditarHorPla(){
    if(this.varEditarHorPla=="1")
      this.record.totalhorasaut=0;
    else
      this.record.totalplazaaut=0;
  }
  // open modal
  open(idItem: string, accion: string,idParent:number):  void {
    this.actionForm=accion;
    this.botonAccion=actionsButtonSave[accion];
    this.tituloForm=titulosModal[accion] + " registro";

    if(idItem=="0"){
      this.record =this.newRecord(idParent);
    } else {
    this.categoriassueldosService.getRecord(idItem).subscribe(resp => {
      this.record = resp;
      this.varEditarHorPla=this.record.totalhorasaut==0 ? "1" : "2";
      this.HideShowEditarHorPla();
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
