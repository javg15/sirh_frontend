import { Component, ElementRef, OnInit, Input, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../../../../_services/token-storage.service';

import { DataTablesResponse } from '../../../../classes/data-tables-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { PlantillasService } from '../services/plantillas.service';
import { Plantillaspersonal, Catplantillas, Catplanteles,Personal,Categorias,Catestatusplaza } from '../../../../_models';
import { CatplantillasService } from '../../../catalogos/catplantillas/services/catplantillas.service';
import { CatplantelesService } from '../../../catalogos/catplanteles/services/catplanteles.service';
import { PersonalService } from '../../../catalogos/personal/services/personal.service';
import { CategoriasService } from '../../../catalogos/categorias/services/categorias.service';
import {CatestatusplazaService}from '../../../catalogos/catestatusplaza/services/catestatusplaza.service';
import { AutocompleteComponent } from 'angular-ng-autocomplete';
import { CatquincenaService } from '../../../catalogos/catquincena/services/catquincena.service';

import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';

import { environment } from '../../../../../environments/environment';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-plantillas-admin',
  templateUrl: './plantillas-admin.component.html',
  styleUrls: ['./plantillas-admin.component.css']
})


export class PlantillasAdminComponent implements OnInit {
  @Input() dtOptions: DataTables.Settings = {};
  usuario:any=this.tokenStorage.getUser();
  /* El decorador @ViewChild recibe la clase DataTableDirective, para luego poder
  crear el dtElement que represente la tabla que estamos creando. */
  @ViewChild('id_personal') id_personal:AutocompleteComponent;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtTrigger: Subject<DataTableDirective> = new Subject();

  Members: any[];
  ColumnNames: string[];

  NumberOfMembers = 0;
  API_URL = environment.APIS_URL;

  private dtOptionsAdicional = {
    datosBusqueda: {campo: 0, operador: 0, valor: ''},
    raw:0
    ,fkey:'id_catplanteles,id_catplantillas,id_personal,tipoDocumento,id_categoria,id_catestatusplaza'
    ,fkeyvalue:[0,0,0,0,0,0]
    ,modo:22
  };

  nombreModulo = 'Plantillas';

  headersAdmin: any;
  loadingService:boolean=false;

  tipoDocumento:number=0;
  id_categoria:number=0;
  id_catestatusplaza:number=0;
  record:Plantillaspersonal={
      id: 0,  id_catplanteles: 0, id_personal:0, id_catplantillas: 0, consecutivo:'',id_usuarios_autoriza:0,
      fechaingreso:null, state: '', created_at: new Date(),  updated_at: new Date(), id_usuarios_r: 0
    }
  ;
  catplantillasCat:Catplantillas[];
  catplantelesCat:Catplanteles[];
  catpersonalCat:Personal[];
  categoriasCat:Categorias[];
  catestatusplazaCat:Catestatusplaza[];
  documentosCat:any=[];
  keywordSearch = 'full_name';
  isLoadingSearch:boolean;
  esInicio:boolean=true;
  record_quincena_activa:string;
  verBotonExcel:boolean=false;
  /* En el constructor creamos el objeto plantillasService,
  de la clase HttpConnectService, que contiene el servicio mencionado,
  y estará disponible en toda la clase de este componente.
  El objeto es private, porque no se usará fuera de este componente. */
  constructor(
    private tokenStorage: TokenStorageService,
    private isLoadingService: IsLoadingService,
    private plantillasService: PlantillasService,private route: ActivatedRoute,
    private catplantillasSvc: CatplantillasService,
    private catplantelesSvc: CatplantelesService,
    private personalSvc: PersonalService,
    private categoriasSvc: CategoriasService,
    private catquincenaSvc: CatquincenaService,
    private catestatusplazaSvc:CatestatusplazaService
  ) {
    this.catplantillasSvc.getCatalogo().subscribe(resp => {
      this.catplantillasCat = resp;
      this.esInicio=false; //si ya se cargó el catalogo, entonces, ya paso la carga inicial
    });
    this.catplantelesSvc.getCatalogo(this.usuario.id).subscribe(resp => {
      this.catplantelesCat = resp;
    });
    this.categoriasSvc.getCatalogo().subscribe(resp => {
      this.categoriasCat = resp;
    });
    this.catestatusplazaSvc.getCatalogo().subscribe(resp => {
      this.catestatusplazaCat = resp;
    });
    this.catquincenaSvc.getQuincenaActiva().subscribe(async resp => {
      //quincena activa
      this.record_quincena_activa = resp.anio+resp.quincena.toString().padStart(2 , '0');
    });
    this.documentosCat.push({id:1,text:"Preparación profesional"});
    this.documentosCat.push({id:2,text:"Nombramiento administrativo"});
    this.documentosCat.push({id:10,text:"Licencia administrativa"});
    this.documentosCat.push({id:12,text:"Baja administrativa"});
    this.documentosCat.push({id:11,text:"Adhesión sindical"});
    this.documentosCat.push({id:3,text:"Seguro institucional (Beneficiarios)"});
    this.documentosCat.push({id:4,text:"Pensiones, juicios (Beneficiarios)"});
    this.documentosCat.push({id:5,text:"Datos de familiares"});
    this.documentosCat.push({id:6,text:"Permisos y licencias"});
    this.documentosCat.push({id:7,text:"Cursos y actualizaciones"});
    this.documentosCat.push({id:8,text:"Horario laboral"});
    this.documentosCat.push({id:9,text:"Datos clínicos"});

  }

  ngOnInit(): void {
    this.headersAdmin = JSON.parse(this.route.snapshot.data.userdata.cabeceras);
    this.verBotonExcel=this.route.snapshot.data.userdata.excel=="1";

      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        serverSide: true,
        processing: true,
        //destroy : true,
        searching : false,
        info: true,
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
        ajax: (dataTablesParameters: any, callback) => {
          this.dtOptionsAdicional.raw++;
          dataTablesParameters.opcionesAdicionales = this.dtOptionsAdicional;

          this.plantillasService.http
            .post<DataTablesResponse>(
              // this.API_URL + '/a6b_apis/read_records_dt.php',
              this.API_URL + '/plantillaspersonal/getAdmin',
              dataTablesParameters, {}
            ).subscribe(resp => {

              this.ColumnNames = resp.columnNames;
              this.Members = resp.data;
              this.NumberOfMembers = resp.data.length;
              $('.dataTables_length>label>select, .dataTables_filter>label>input').addClass('form-control-sm');
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: []
              });
              if (this.NumberOfMembers > 0) {
                $('.dataTables_empty').css('display', 'none');
              }
            }
          );
        },

        columns: this.headersAdmin,
        columnDefs:[{"visible": false, "targets": 0}, //state
                {"width": "5%", "targets": [1,2,3,4]},
                {"width": "10%", "targets": [this.headersAdmin-1]}
              ]
      };

  }
  openModal(id: string, accion: string, idItem: number,idCatplanteles:number,idCatplantillas:number,tipoDocumento:number) {
    this.plantillasService.open(id, accion, idItem,idCatplanteles,idCatplantillas,tipoDocumento);
  }

  closeModal(id: string) {
    this.plantillasService.close(id);
  }


  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Hay que dessuscribirse del evento dtTrigger, para poder recrear la tabla.
    this.dtTrigger.unsubscribe();
  }

  reDraw(datosBusqueda: any = null): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      if(datosBusqueda!=null){
        this.dtOptionsAdicional.datosBusqueda = datosBusqueda;
        // Destruimos la tabla
        dtInstance.destroy();
        // dtTrigger la reconstruye
        this.dtTrigger.next();
      }
      else{
        dtInstance.clear().draw(false); // viene de form, solo actualiza la vista actual (current page)
      }
    });
  }

  exportExcel() {
    this.loadingService=true;

      this.plantillasService.http
      .post<DataTablesResponse>(
        // this.API_URL + '/a6b_apis/read_records_dt.php',
        this.API_URL + '/plantillaspersonal/getAdmin',
        {
          columns:this.dtOptions.columns,
          length: 10000,
          opcionesAdicionales: this.dtOptionsAdicional,
          order: [{column: 0, dir: "asc"}],
          search: {value: "", regex: false},
          start: 0
        }, {}
      ).subscribe(resp => {
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet('PlantillasSheet');
        worksheet.addTable({
          name: "MyTable",
          ref: "A1",
          headerRow: true,
          totalsRow: false,
          style: {
            theme: 'TableStyleLight1',
            showRowStripes: true,
            showColumnStripes: false,
          },
          columns: [
            { name: "-" },//inicializar
          ],
          rows: [],
        });


        const table = worksheet.getTable("MyTable");
        this.headersAdmin.forEach(e => {
          if(e.title.toUpperCase()!="ACCIONES" 
            && e.title.toUpperCase()!="ID"
            && e.title.toUpperCase()!="FOTO"
            )
            table.addColumn({
                name: e.title,
              },[],e.index);

        });

        for(let e of resp.data) {
          let row=[""];
        
          for(let i=0,j=0;i<this.headersAdmin.length;i++){ //=1 para quitar ID, -1 para quitar acciones
            if(this.headersAdmin[i].title.toUpperCase()!="ACCIONES" 
              && this.headersAdmin[i].title.toUpperCase()!="ID"
              && this.headersAdmin[i].title.toUpperCase()!="FOTO"
              )
              row[++j]=e[this.headersAdmin[i].data] //agregar dato de campo
          }
          table.addRow(row)
        }
        table.commit();
        

        this.loadingService=false;

        workbook.xlsx.writeBuffer().then((data) => {
          let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          fs.saveAs(blob, 'Plantillas.xlsx');
        })
      })
      
  }
/**
 * Abre el modal de la plantilla cadena
 */
  openCadena(id_plantillaCadena){
      this.plantillasService.open("custom-modal-2", "ver", id_plantillaCadena,0,0,0);
  }

  onClickBuscar() {
    if(this.id_personal.query=="") this.record.id_personal=0;

    this.dtOptionsAdicional.fkeyvalue=[
      (this.record.id_catplanteles==null?0:this.record.id_catplanteles),
      (this.record.id_catplantillas==null?0:this.record.id_catplantillas),
      this.record.id_personal,
      (this.tipoDocumento==null?0:this.tipoDocumento),
      (this.id_categoria==null?0:this.id_categoria),
      (this.id_catestatusplaza==null?0:this.id_catestatusplaza),
    ];

    //si no es la carga inicial
    if(!(this.esInicio && this.dtOptionsAdicional.fkeyvalue[0]==0
      && this.dtOptionsAdicional.fkeyvalue[1]==0
      && this.dtOptionsAdicional.fkeyvalue[2]==0
      && this.dtOptionsAdicional.fkeyvalue[3]==0
      && this.dtOptionsAdicional.fkeyvalue[4]==0))
      {
        this.reDraw();
      }
  }

  onSelectPlantel(select_plantel){
    this.record.id_catplanteles=select_plantel;
    if(select_plantel!=0)
      this.onClickBuscar();
  }
  onSelectPlantilla(select_plantilla){
    this.record.id_catplantillas=select_plantilla;
    if(select_plantilla!=0)
      this.onClickBuscar();
  }
  onSelectCategorias(val){
    this.id_categoria = val;
    if(val!=0)
      this.onClickBuscar();
  }
  onSelectCatestatusplaza(val){
    this.id_catestatusplaza = val;
    if(val!=0)
      this.onClickBuscar();
  }
  /*********************
   autocomplete id_personal
   *********************/
  onChangeSearchIdPersonal(val: string) {
    this.isLoadingSearch = true;
    this.personalSvc.getCatalogoSegunBusqueda(val).subscribe(resp => {
      this.catpersonalCat = resp;
      this.isLoadingSearch = false;
    });
  }

  onCleared(){
    this.record.id_personal=0;
    this.onClickBuscar();
  }

  onSelectIdPersonal(val: any) {
    let items=val["full_name"].split(" -- ");
    this.record.id_personal=parseInt(items[2]);
    if(this.record.id_personal!=0)
      this.onClickBuscar();
  }

  onSelectDocumentos(val: any){
    this.tipoDocumento = val;
    this.onClickBuscar();
  }
}
