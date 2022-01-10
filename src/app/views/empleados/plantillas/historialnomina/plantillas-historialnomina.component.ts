import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataTablesResponse } from '../../../../classes/data-tables-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';
import { PlantillasService } from '../services/plantillas.service';
import { PlantillashistorialnominaService } from '../services/plantillashistorialnomina.service';
import { environment } from '../../../../../environments/environment';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-plantillas-historialnomina',
  templateUrl: './plantillas-historialnomina.component.html',
  styleUrls: ['./plantillas-historialnomina.component.css']
})

export class PlantillasHistorialNominaComponent implements OnInit, OnDestroy {
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

  private dataTablesParameters={
    draw: 1,  length: 100 , opcionesAdicionales: {},
    order: [{column: 0, dir: "asc"}],
    search: {value: "", regex: false},
    start: 0
  };
  private dtOptionsAdicional = {
    raw:0
    ,id_personal:0
  };

  NumberOfMembers = 0;
  API_URL = environment.APIS_URL;

  nombreModulo = 'Plantillashistorialnomina';


  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;

  headersAdmin: any;

  record_id_personal:number;
  record_detalle:any={"descempfuncion":"","nombrect":"","descplantelfisica":"","descplantelplaza":"",
      "desctiponomina":"","desccategoria":"","siglassindicato":"","desctipoemp":"",
      "tratarcomobase":0,"interinopuro":0,"nomemptitular":"",
      "nombrefuncionpri":"","nombrefuncionsec":"","qnaini":"","qnafin":"",
      "descmotgralbaja":"","tiposemestre":"","descesquemapago":""
    };

  private elementModal: any;
  @ViewChild('basicModalDocs') basicModalDocs: ModalDirective;
  @ViewChild('detalleModal') public detalleModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;

  cattipoCat:any[];

  constructor(
    private plantillashistorialnominaService: PlantillashistorialnominaService,
    private plantillasSvc: PlantillasService,
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
    modal.plantillasSvc.add(modal);

    //subtabla datatable
    this.headersAdmin = this.route.snapshot.data.userdataHistorialNomina; // get data from resolver

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
      dom: 'Bfrtip',
      initComplete:  function (settings, json) {
        $('.button').removeClass('dt-button');
        $('div.dt-buttons').css('float','right');
     },
      buttons: [
           {
            extend: 'excelHtml5',
            text:'Excel',
            className: 'table-button button btn btn-primary',
            customize: function ( xlsx ){

              var sheet = xlsx.xl.worksheets['sheet1.xml'];
              var downrows = 0;
              var clRow = $('row', sheet);
              //update Row
              clRow.each(function () {
                  var attr = $(this).attr('r');
                  var ind = parseInt(attr);
                  ind = ind + downrows;
                  $(this).attr("r",ind);
              });

              // Update  row > c
              $('row c ', sheet).each(function () {
                  var attr = $(this).attr('r');
                  var pre = attr.substring(0, 1);
                  var ind = parseInt(attr.substring(1, attr.length));
                  ind = ind + downrows;
                  $(this).attr("r", pre + ind);
              });

              function Addrow(index,data) {
                  let msg='<row r="'+index+'">'
                  for(let i=0;i<data.length;i++){
                      var key=data[i].k;
                      var value=data[i].v;
                      msg += '<c t="inlineStr" r="' + key + index + '" >';//s="42"
                      msg += '<is>';
                      msg +=  '<t>'+value+'</t>';
                      msg+=  '</is>';
                      msg+='</c>';
                  }
                  msg += '</row>';
                  return msg;
              }

              //insert
              let rows=[]; let abc=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O']
              $("#tblPlantillashistorialnomina tbody tr").each(function(i,v){
                  let row=[];
                  $(v).find("td").each(function(ih,vh){
                    row.push({ k: abc[ih+1], v: $(vh).html() });
                  })
                  rows.push(Addrow(i+3, row));
              });

              rows.splice(-1,1);//remover el ultimo renglon "No hay coincidencias"
              sheet.childNodes[0].childNodes[1].innerHTML = sheet.childNodes[0].childNodes[1].innerHTML+ rows.toString();
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
                  $(win.document.body).find('tbody').html($("#tblPlantillashistorialnomina tbody").html())
                  $(win.document.body).find('thead th:first').remove()

                  /*var innerHtmlData = //'<img src="http://datatables.net/media/images/logo-fade.png" style="position:absolute; top:0; left:0;">'
                    '<h1>'+ $('#custom-modal-2 #myModalLabel').html()
                    + '</h1><div></div>'
                    + '<table class="table table-striped table-bordered table-sm row-border hover dataTable no-footer compact" style="font-size: inherit;">'
                      + '<thead><tr>'
                          + '<th>RFC</th><th>Personal</th><th>Nombramiento</th><th>Expedición</th><th>Inicio</th><th>Fin</th>'
                      + '</tr></thead>'
                    + '<tbody>'
                      + $("#tblPlantillashistorialnomina tbody").html()
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
      columns: this.headersAdmin,
      //columnDefs:[{"visible": false, "targets": [0]}]//ID, tipo
    };

  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.plantillasSvc.remove(this.id); //idModal
      this.elementModal.remove();
  }


  // open modal
  open(idItem: string, accion: string):  void {
    this.actionForm=accion;

    this.plantillasSvc.getRecordPersonal(idItem).subscribe(resp => {
      this.tituloForm="Historial - " + resp.numeemp + " - " +  resp.rfc + " " + (resp.nombre + " " + resp.apellidopaterno+ " " + resp.apellidomaterno);
      this.record_id_personal=parseInt(resp.id);

      this.reDraw();


      this.basicModalDocs.show();
    })
  }

  // close modal
  close(): void {
      this.basicModalDocs.hide();
  }

  reDraw(): void {
    this.dtOptionsAdicional.raw++;
    this.dtOptionsAdicional.id_personal=this.record_id_personal;
    //this.dtOptionsAdicional.fkeyvalue=this.record_id_plantillas;
    this.dataTablesParameters.opcionesAdicionales = this.dtOptionsAdicional;

    this.plantillashistorialnominaService.getHistorial(this.dataTablesParameters).subscribe(resp => {

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

  //abrir modal detalle
  openDetalle(idx): void {
    this.record_detalle={
      "descempfuncion":this.Members[idx]["descempfuncion"]
      ,"nombrect":this.Members[idx]["nombrect"]
      ,"descplantelfisica":this.Members[idx]["descplantelfisica"]
      ,"descplantelplaza":this.Members[idx]["descplantelplaza"]
      ,"desctiponomina":this.Members[idx]["desctiponomina"]
      ,"desccategoria":this.Members[idx]["desccategoria"]
      ,"siglassindicato":this.Members[idx]["siglassindicato"]
      ,"desctipoemp":this.Members[idx]["desctipoemp"]
      ,"tratarcomobase":(this.Members[idx]["tratarcomobase"]==1?"SÍ":"NO")
      ,"interinopuro":(this.Members[idx]["interinopuro"]==1?"SÍ":"NO")
      ,"nomemptitular":(this.Members[idx]["nomemptitular"]==null?"SIN DEFINIR":this.Members[idx]["nomemptitular"])
      ,"nombrefuncionpri":this.Members[idx]["nombrefuncionpri"]
      ,"nombrefuncionsec":this.Members[idx]["nombrefuncionsec"]
      ,"qnaini":this.Members[idx]["qnaini"]
      ,"qnafin":this.Members[idx]["qnafin"]
      ,"descmotgralbaja":this.Members[idx]["descmotgralbaja"]
      ,"tiposemestre":this.Members[idx]["tiposemestre"]
      ,"descesquemapago":this.Members[idx]["descesquemapago"]
  };
    this.detalleModal.show();
  }

  closeDetalle():void{
    this.detalleModal.hide();
  }
}
