import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { HorasclaseService } from '../services/horasclase.service';
import { HorasclaseasignarService } from '../services/horasclaseasignar.service';
import { ActivatedRoute } from '@angular/router';

import { DataTablesResponse } from '../../../../classes/data-tables-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Horasclaseasignar, Catquincena,Plantillaspersonal } from '../../../../_models';
import { CatquincenaService } from '../../../catalogos/catquincena/services/catquincena.service';
import { PlantillasService } from '../../../plazas/plantillas/services/plantillas.service';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../../src/environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';
import { environment } from '../../../../../../src/environments/environment';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-horasclaseasignar-form',
  templateUrl: './horasclaseasignar-form.component.html',
  styleUrls: ['./horasclaseasignar-form.component.css']
})

export class HorasclaseasignarFormComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() dtOptions: DataTables.Settings = {};
  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción
  @Output() redrawEvent = new EventEmitter<any>();
  /* El decorador @ViewChild recibe la clase DataTableDirective, para luego poder
  crear el dtElement que represente la tabla que estamos creando. */
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<DataTableDirective> = new Subject();

  API_URL = environment.APIS_URL;

  nombreModulo = 'Horasclaseasignar';

  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;

  private elementModal: any;
  @ViewChild('basicModal') basicModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  record: Horasclaseasignar;
  catquincenaCat:Catquincena[];
  plantillaspersonalCat:Plantillaspersonal[];

  constructor(private isLoadingService: IsLoadingService,
    private horasclaseService: HorasclaseService,private el: ElementRef,
    private horasclaseasignarSvc: HorasclaseasignarService,
    private plantillaspersonalSvc: PlantillasService,
    private catquincenaSvc: CatquincenaService,
    private route: ActivatedRoute
      ) {
      this.elementModal = el.nativeElement;
      this.catquincenaSvc.getCatalogo().subscribe(resp => {
        this.catquincenaCat = resp;
      });

      //this.cattipoCat=[{id:'',descripcion:''},{id:1,descripcion:'ADMINISTRATIVO'},{id:2,descripcion:'DOCENTE'},{id:3,descripcion:'DIRECTIVO'}];
  }

  newRecord(): Horasclaseasignar {
    return {
      id: 0,  id_plantillaspersonal: 0, id_horasclase:0,
      id_catquincena_fin:0,id_catquincena_ini:0,
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
    modal.horasclaseService.add(modal);

    //loading
    this.userFormIsPending =this.isLoadingService.isLoading$({ key: 'loading' });

  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.horasclaseService.remove(this.id); //idModal
      this.elementModal.remove();
  }


  async submitAction(form) {

    if(this.actionForm.toUpperCase()!=="VER"){
      this.validSummary.resetErrorMessages(form);

      await this.isLoadingService.add(
      this.horasclaseasignarSvc.setRecord(this.record,this.actionForm).subscribe(resp => {
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
  open(idItem: string, accion: string,idParent:number):  void {
    this.actionForm=accion;
    this.botonAccion=actionsButtonSave[accion];
    this.tituloForm="Horas clase - " + titulosModal[accion] + " registro";

    this.horasclaseService.getRecord(idItem).subscribe(resp => {
      this.plantillaspersonalSvc.getCatalogoSegunPlantel(resp.id_catplanteles).subscribe(resp => {
        this.plantillaspersonalCat = resp;

        this.horasclaseasignarSvc.getRecordSegunParent(idItem).subscribe(resp => {
          if(resp.message){
            this.record =this.newRecord();
            this.record.id_horasclase=idParent;
          }
          else
            this.record = resp;
          //this.reDraw();
        });

        // console.log($('#modalTest').html()); poner el id a algun elemento para testear
        this.basicModal.show();
      });
    });


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


  //Sub formulario
  /*openModal(id: string, accion: string, idItem: number,idParent:number) {
    this.horasclaseasignardetalleService.open(id, accion, idItem,idParent);
  }

  closeModal(id: string) {
    this.horasclaseasignardetalleService.close(id);
  }

  reDraw(): void {


    this.dtOptionsAdicional.raw++;
    this.dtOptionsAdicional.fkeyvalue=this.record.id;
    this.dataTablesParameters.opcionesAdicionales = this.dtOptionsAdicional;

    this.horasclaseasignardetalleService.getAdmin(this.dataTablesParameters).subscribe(resp => {

        this.ColumnNames = resp.columnNames;
        this.Members = resp.data;
        this.NumberOfMembers = resp.data.length;
        $('.dataTables_length>label>select, .dataTables_filter>label>input').addClass('form-control-sm');
        //$('#tblHorasclasedetalle').dataTable({searching: false, paging: false, info: false});
        if (this.NumberOfMembers > 0) {
          $('.dataTables_empty').css('display', 'none');
        }
      }
    );
  }
*/
}
