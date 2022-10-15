import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataTablesResponse } from '../../../../classes/data-tables-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Semestre,Personal } from '../../../../_models';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { titulosModal } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';
import { HorashistorialService } from '../services/horashistorial.service';
import { HorasclaseService } from '../../../plazas/horasclase/services/horasclase.service';
import { PersonalService } from '../../../catalogos/personal/services/personal.service';
import { environment } from '../../../../../environments/environment';
import { SemestreService } from '../../../catalogos/semestre/services/semestre.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-horas-historial',
  templateUrl: './horas-historial.component.html',
  styleUrls: ['./horas-historial.component.css']
})

export class HorasHistorialComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor

  @Input() dtOptions: any = {};
  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción


  /* El decorador @ViewChild recibe la clase DataTableDirective, para luego poder
  crear el dtElement que represente la tabla que estamos creando. */
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<DataTableDirective> = new Subject();

  Members: any[];
  ColumnNames: string[];

  private dataTablesParameters = {
    draw: 1, length: 100, opcionesAdicionales: {},
    order: [{ column: 0, dir: "asc" }],
    search: { value: "", regex: false },
    start: 0
  };
  private dtOptionsAdicional = {
    raw: 0
    , id_materiasclase: 0
    , id_personal: 0
    , id_semestre: 0
    , id_gruposclase: 0
    , tiporeporte:""
  };

  NumberOfMembers = 0;
  API_URL = environment.APIS_URL;

  nombreModulo = 'Horashistorial';


  tituloForm: string;

  headersAdmin: any;

  record_id_gruposclase: number;
  record_id_materiasclase: number;
  record_id_personal: number;
  record_id_semestre: number;
  tiporeporte:string;

  semestreCat: Semestre[];

  private elementModal: any;
  @ViewChild('basicModalHistorialHoras') basicModalHistorialHoras: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  constructor(
    private horashistorialService: HorashistorialService,
    private horasclaseSvc: HorasclaseService,
    private semestreSvc: SemestreService,
    private personalSvc:PersonalService,
    private el: ElementRef,
    private route: ActivatedRoute
  ) {
    this.elementModal = el.nativeElement;
    this.semestreSvc.getCatalogo().subscribe(resp => {
      this.semestreCat = resp;
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
    modal.horashistorialService.add(modal);

    //subtabla datatable
    this.headersAdmin = JSON.parse(this.route.snapshot.data.userdataHorasHistoria.cabeceras); // get data from resolver

    this.dtOptions = {
      pagingType: 'full_numbers',
      paging: false,
      //pageLength: 50,
      //serverSide: true,
      //processing: true,
      ordering: false,
      destroy: true,
      searching: false,
      info: false,
      dom: 'Bfrtip',
      initComplete: function (settings, json) {
        $('.button').removeClass('dt-button');
        $('div.dt-buttons').css('float', 'right');
      },
      buttons: [
        {
          extend: 'excelHtml5',
          text: 'Excel',
          className: 'table-button button btn btn-primary',
          customize: function (xlsx) {

            var sheet = xlsx.xl.worksheets['sheet1.xml'];
            var downrows = 0;
            var clRow = $('row', sheet);
            //update Row
            clRow.each(function () {
              var attr = $(this).attr('r');
              var ind = parseInt(attr);
              ind = ind + downrows;
              $(this).attr("r", ind);
            });

            // Update  row > c
            $('row c ', sheet).each(function () {
              var attr = $(this).attr('r');
              var pre = attr.substring(0, 1);
              var ind = parseInt(attr.substring(1, attr.length));
              ind = ind + downrows;
              $(this).attr("r", pre + ind);
            });

            function Addrow(index, data) {
              let msg = '<row r="' + index + '">'
              for (let i = 0; i < data.length; i++) {
                var key = data[i].k;
                var value = data[i].v;
                msg += '<c t="inlineStr" r="' + key + index + '" >';//s="42"
                msg += '<is>';
                msg += '<t>' + value + '</t>';
                msg += '</is>';
                msg += '</c>';
              }
              msg += '</row>';
              return msg;
            }

            //insert
            let rows = []; let abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']
            $("#tblHorashistorial tbody tr").each(function (i, v) {
              let row = [];
              $(v).find("td").each(function (ih, vh) {
                row.push({ k: abc[ih + 1], v: $(vh).html() });
              })
              rows.push(Addrow(i + 3, row));
            });

            rows.splice(-1, 1);//remover el ultimo renglon "No hay coincidencias"
            sheet.childNodes[0].childNodes[1].innerHTML = sheet.childNodes[0].childNodes[1].innerHTML + rows.toString();
          }
        },
        {
          extend: 'print',
          text: 'Imprimir',
          className: 'table-button button btn btn-success',
          /*customize: function (d) {
            var exportBody = "<div class=" + '"row text-center" style="font-size:22px;font-weight:bold;">Header</div>';
            d.body.length = 0;
            d.body.push.apply(d.body, exportBody);
          }*/
          customize: function (win) {

            /*$(win.document.body)
            .css('font-size', '10pt')
            .prepend(
            '<img src="http://datatables.net/media/images/logo-fade.png" style="position:absolute; top:0; left:0;" />');*/

            $(win.document.body).find('table')
              .addClass('compact')
              .css('font-size', 'inherit');

            $(win.document.body).find('h1').html($('#custom-modal-2 #myModalLabel').html())
            $(win.document.body).find('h1')
            $(win.document.body).find('tbody').html($("#tblHorashistorial tbody").html())
            $(win.document.body).find('thead th:first').remove()

            /*var innerHtmlData = //'<img src="http://datatables.net/media/images/logo-fade.png" style="position:absolute; top:0; left:0;">'
              '<h1>'+ $('#custom-modal-2 #myModalLabel').html()
              + '</h1><div></div>'
              + '<table class="table table-striped table-bordered table-sm row-border hover dataTable no-footer compact" style="font-size: inherit;">'
                + '<thead><tr>'
                    + '<th>RFC</th><th>Personal</th><th>Nombramiento</th><th>Expedición</th><th>Inicio</th><th>Fin</th>'
                + '</tr></thead>'
              + '<tbody>'
                + $("#tblHorashistorial tbody").html()
              + '</tbody>'
              + '</table><div></div>'

            win.document.activeElement.innerHTML= innerHtmlData;*/

          }
        }
      ],
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
      //columns: this.headersAdmin,
      columnDefs: [{ "visible": false, "targets": [0] }]//ID, tipo
    };

  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.horashistorialService.remove(this.id); //idModal
    this.elementModal.remove();
  }


  // open modal
  open(tipo:string, id_horasclase:number, id_personal: number, id_gruposclase: number, id_materiasclase: number, id_semestre: number): void {
    this.tituloForm = "Historial de " + tipo;
    this.record_id_materiasclase = id_materiasclase;
    this.record_id_personal = id_personal;
    this.record_id_semestre = id_semestre;
    this.record_id_gruposclase = id_gruposclase;
    this.tiporeporte=tipo;

    if(this.tiporeporte.toUpperCase()=="GRUPOS" || this.tiporeporte.toUpperCase()=="MATERIAS"){
      this.horasclaseSvc.getClave(id_horasclase).subscribe(resp => {
        if(this.tiporeporte.toUpperCase()=="GRUPOS")
          this.tituloForm += " - " + (resp[0].grupo);
        else if(this.tiporeporte.toUpperCase()=="MATERIAS")
          this.tituloForm += " - " + (resp[0].clave) + " - " + (resp[0].materia);

        this.reDraw();

        // console.log($('#modalTest').html()); poner el id a algun elemento para testear
        this.basicModalHistorialHoras.show();
      });
    }
    else if(this.tiporeporte.toUpperCase()=="DOCENTES"){
      this.personalSvc.getNombre(id_personal).subscribe(resp => {
        this.tituloForm += " - " + (resp.full_name);
        this.reDraw();

        // console.log($('#modalTest').html()); poner el id a algun elemento para testear
        this.basicModalHistorialHoras.show();
      });
    }
    
  }

  // close modal
  close(): void {
    this.basicModalHistorialHoras.hide();
  }

  onSemestreChange(valor: any) {
    this.record_id_semestre = parseInt(valor);
    this.reDraw();
  }

  reDraw(): void {
    this.dtOptionsAdicional.raw++;
    this.dtOptionsAdicional.id_materiasclase = this.record_id_materiasclase;
    this.dtOptionsAdicional.id_personal = this.record_id_personal;
    this.dtOptionsAdicional.id_semestre = this.record_id_semestre;
    this.dtOptionsAdicional.id_gruposclase = this.record_id_gruposclase;
    this.dtOptionsAdicional.tiporeporte=this.tiporeporte;
    
    this.dataTablesParameters.opcionesAdicionales = this.dtOptionsAdicional;

    this.horashistorialService.getHistorial(this.dataTablesParameters).subscribe(resp => {
      if(resp.length>0)
        this.headersAdmin = JSON.parse(resp[0].cabeceras);

      this.ColumnNames = resp.columnNames;
      this.Members = resp.data;
      this.NumberOfMembers = resp.data.length;
      $('.dataTables_length>label>select, .dataTables_filter>label>input').addClass('form-control-sm');
      //$('#tblPlantillasdocs').dataTable({searching: false, paging: false, info: false});
      if (this.NumberOfMembers > 0) {
        $('.dataTables_empty').css('display', 'none');
      }
    });
  }

}
