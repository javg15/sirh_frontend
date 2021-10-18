import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CategoriastabularService } from '../services/categoriastabular.service';
import { CategoriasService } from '../../categorias/services/categorias.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Categoriastabular, Categorias } from '../../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';


declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-categoriastabular-form',
  templateUrl: './categoriastabular-form.component.html',
  styleUrls: ['./categoriastabular-form.component.css']
})

export class CategoriastabularFormComponent implements OnInit, OnDestroy {
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

  record: Categoriastabular;
  categoriasCat:Categorias[];



  constructor(private isLoadingService: IsLoadingService,
      private categoriastabularService: CategoriastabularService, private el: ElementRef,
      private categoriasSvc: CategoriasService
      ) {
      this.elementModal = el.nativeElement;
      this.categoriasSvc.getCatalogo().subscribe(resp => {
        this.categoriasCat = resp;
      });

  }

  newRecord(): Categoriastabular {
    return {
      id: 0,tipoplantel: '', id_categorias: 0,  cantidad: 0,
      state: '', created_at: new Date(),  updated_at: new Date(), id_usuarios_r: 0
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
      modal.categoriastabularService.add(modal);

      //loading
      this.userFormIsPending =this.isLoadingService.isLoading$({ key: 'loading' });
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.categoriastabularService.remove(this.id); //idModal
      this.elementModal.remove();
  }


  async submitAction(form) {

    if(this.actionForm.toUpperCase()!=="VER"){
      this.validSummary.resetErrorMessages(form);

      await this.isLoadingService.add(
      this.categoriastabularService.setRecord(this.record,this.actionForm).subscribe(resp => {
        if (resp.hasOwnProperty('error')) {
          this.validSummary.generateErrorMessagesFromServer(resp.message);
        }
        else if(resp.message=="success"){
          if(this.actionForm.toUpperCase()=="NUEVO") this.actionForm="editar";
          this.record.id=resp.id;
          this.successModal.show();
          setTimeout(()=>{ this.successModal.hide(); this.close();}, 2000)
        }
      }),{ key: 'loading' });
    }
  }

  // open de este form
  open(idItem: string, accion: string):  void {
    this.actionForm=accion;
    this.botonAccion=actionsButtonSave[accion];
    this.tituloForm=titulosModal[accion] + " registro";

    if(idItem=="0"){
      this.record =this.newRecord();
    } else {
        this.categoriastabularService.getRecord(idItem).subscribe(resp => {
          this.record = resp;
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
