import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { PlantillasService } from '../services/plantillas.service';
import { ActivatedRoute } from '@angular/router';

import { DataTablesResponse } from '../../../../classes/data-tables-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';
import { PlantillasdocsService } from '../services/plantillasdocs.service';
import { PlantillasdocsProfesionalService } from '../services/plantillasdocsprofesional.service';
import { PlantillasdocsNombramientoService } from '../services/plantillasdocsnombramiento.service';
import { PlantillasdocsFamiliaresService } from '../services/plantillasdocsfamiliares.service';

import { environment } from '../../../../../environments/environment';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-plantillasdocs-admin',
  templateUrl: './plantillasdocs-admin.component.html',
  styleUrls: ['./plantillasdocs-admin.component.css']
})

export class PlantillasDocsAdminComponent implements OnInit, OnDestroy {
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

  Members: any[];
  ColumnNames: string[];

  private dataTablesParameters={
    draw: 1,  length: 100 , opcionesAdicionales: {},
    order: [{column: 0, dir: "asc"}],
    search: {value: "", regex: false},
    start: 0
  };
  private dtOptionsAdicional = { datosBusqueda: {campo: 0, operador: 0, valor: ''}
    ,raw:0
    ,fkey:'id,tipodocumento'
    ,fkeyvalue:[0,0]
    ,modo:0
  };

  NumberOfMembers = 0;
  API_URL = environment.APIS_URL;

  nombreModulo = 'Plantillasdocs';

  headersAdmin: any;

  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;

  record_id_plantillaspersonal:number;
  record_tipodoc:number;

  private elementModal: any;
  @ViewChild('basicModalDocs') basicModalDocs: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  cattipoCat:any[];

  constructor(private plantillasService: PlantillasService,
    private plantillasdocsService: PlantillasdocsService,
    private plantillasdocsprofesionalSvc: PlantillasdocsProfesionalService,
    private plantillasdocsnombramientoSvc: PlantillasdocsNombramientoService,
    private plantillasdocsfamiliaresSvc: PlantillasdocsFamiliaresService,
    private el: ElementRef,
    private route: ActivatedRoute
      ) {
      this.elementModal = el.nativeElement;
  }


  ngOnInit(): void {

    let modal = this;

    // ensure id attribute exists
    if (!modal.id) {//idModal {
        console.error('modal must have an id');
        return;
    }
    // add self (this modal instance) to the modal service so it's accessible from controllers
    modal.plantillasService.add(modal);

      //subtabla datatable
    this.headersAdmin = this.route.snapshot.data.userdataDocs; // get data from resolver

    this.dtOptions = {
      pagingType: 'full_numbers',
      paging:false,
      //pageLength: 50,
      //serverSide: true,
      //processing: true,
      ordering:false,
      destroy : true,
      searching : false,
      info: false,
      language: {
        emptyTable: '',
        zeroRecords: 'No hay coincidencias',
        lengthMenu: 'Mostrar _MENU_ elementos',
        search: 'Buscar:',
        info: 'De _START_ a _END_ de _TOTAL_ elementos',
        infoEmpty: 'De 0 a 0 de 0 elementos',
        infoFiltered: '(filtrados de _MAX_ elementos totales)',
        paginate: {
          first: 'Prim.',
          last: 'Últ.',
          next: 'Sig.',
          previous: 'Ant.'
        },
      },
      columns: this.headersAdmin,
      columnDefs:[{"visible": false, "targets": [0,1]}]//ID, tipo
    };

  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.plantillasService.remove(this.id); //idModal
      this.elementModal.remove();
  }


  // open modal
  open(idItem: string, accion: string,idCatplanteles:string,idCatplantillas:string,tipoDocumento:string):  void {
    this.actionForm=accion;
    this.botonAccion=actionsButtonSave[accion];
    this.tituloForm="Documentación - " +titulosModal[accion] + " registro";
    this.record_id_plantillaspersonal=parseInt(idItem);
    this.record_tipodoc=parseInt(tipoDocumento);

    this.reDraw();

    // console.log($('#modalTest').html()); poner el id a algun elemento para testear
    this.basicModalDocs.show();
  }

  // close modal
  close(): void {
      this.basicModalDocs.hide();
      if(this.actionForm.toUpperCase()!="VER"){
        this.redrawEvent.emit({
          campo: 0,
          operador: 0,
          valor: ''
        });
      }
  }



  //Sub formulario
  openModal(tipo:string, id: string, accion: string, idItem: number,idParent:number) {
    switch(tipo.toLowerCase()){
      case "plantillasdocsprofesional":
          this.plantillasdocsprofesionalSvc.open(id, accion, idItem,idParent);
          break;
        case "plantillasdocsnombramiento":
          this.plantillasdocsnombramientoSvc.open(id, accion, idItem,idParent);
          break;
        case "plantillasdocsfamiliares":
          this.plantillasdocsfamiliaresSvc.open(id, accion, idItem,idParent);
          break;
      default:
        this.plantillasdocsService.open(id, accion, idItem,idParent);

    }
  }

  closeModal(id: string) {
    this.plantillasdocsService.close(id);
  }

  reDraw(): void {


    this.dtOptionsAdicional.raw++;
    this.dtOptionsAdicional.fkeyvalue=[this.record_id_plantillaspersonal,this.record_tipodoc];
    //this.dtOptionsAdicional.fkeyvalue=this.record_id_plantillaspersonal;
    this.dataTablesParameters.opcionesAdicionales = this.dtOptionsAdicional;

    this.plantillasdocsService.getAdmin(this.dataTablesParameters).subscribe(resp => {

        this.ColumnNames = resp.columnNames;
        this.Members = resp.data;
        this.NumberOfMembers = resp.data.length;
        $('.dataTables_length>label>select, .dataTables_filter>label>input').addClass('form-control-sm');
        //$('#tblPlantillasdocs').dataTable({searching: false, paging: false, info: false});
        if (this.NumberOfMembers > 0) {
          $('.dataTables_empty').css('display', 'none');
        }
      }
    );
  }

}
