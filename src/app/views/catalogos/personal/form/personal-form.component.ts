import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTablesResponse } from '../../../../classes/data-tables-response';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { PersonalService } from '../services/personal.service';
import { PersonalexpedienteFormService } from '../services/personalexpedienteform.service';
import { CatestadosService } from '../../../catalogos/catestados/services/catestados.service';
import { CatmunicipiosService } from '../../../catalogos/catmunicipios/services/catmunicipios.service';
import { CatlocalidadesService } from '../../../catalogos/catlocalidades/services/catlocalidades.service';
import { CatestadocivilService } from '../../../catalogos/catestadocivil/services/catestadocivil.service';
import { CatbancosService } from '../../../catalogos/catbancos/services/catbancos.service';
import { UsuariosService } from '../../../autenticacion/usuarios/services/usuarios.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Personal,  Catestados, Catmunicipios, Catlocalidades, Catestadocivil, Usuarios, Catbancos } from '../../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';

import { Archivos } from '../../../../_models';
import { ArchivosService } from '../../../catalogos/archivos/services/archivos.service';

import { ListUploadComponent } from '../../../_shared/upload/list-upload.component';
import { FormUploadComponent } from '../../../_shared/upload/form-upload.component';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.css']
})

export class PersonalFormComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor

  @Input() dtOptions: DataTables.Settings = {};
  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción
  @Output() redrawEvent = new EventEmitter<any>();
  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;

  private elementModal: any;
  @ViewChild('basicModal') basicModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;
  @ViewChild(ListUploadComponent) listUpload: ListUploadComponent;
  @ViewChild(FormUploadComponent) formUpload: FormUploadComponent;
  @ViewChild('input_action') input_action:ElementRef;

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
    datosBusqueda: { campo: 0, operador: 0, valor: '' }
    , raw: 0
    , fkey: 'id_personal'
    , fkeyvalue: [0]
    , modo: 22
  };

  headersAdmin: any;

  NumberOfMembers = 0;

  record: Personal;
  recordFile:Archivos;
  catestadosCat:Catestados[];
  catmunicipiosNaciCat:Catmunicipios[];
  catlocalidadesNaciCat: Catlocalidades[];
  catmunicipiosResiCat:Catmunicipios[];
  catlocalidadesResiCat: Catlocalidades[];
  catestadocivilCat: Catestadocivil[];
  catbancosCat: Catbancos[];
  usuariosCat:Usuarios[];
  recordantiguedad_catquincena_ingreso:number;
  recordantiguedad_anios:number;
  recordantiguedad_meses:number;
  recordantiguedad_dias:number;

  existeSegunCURP:boolean=false;

  public customPatterns = { 'S': { pattern: new RegExp('\[A-ZÑa-zñ\]')} };

  constructor(private isLoadingService: IsLoadingService,
    private personalService: PersonalService, private el: ElementRef,
      private catestadosSvc: CatestadosService,
      private catmunicipiosSvc: CatmunicipiosService,
      private catlocalidadesSvc: CatlocalidadesService,
      private catestadocivilSvc: CatestadocivilService,
      private catbancosSvc: CatbancosService,
      private usuariosSvc: UsuariosService,
      private archivosSvc:ArchivosService,
      private personalexpedienteformSvc: PersonalexpedienteFormService,
      private route: ActivatedRoute
      ) {
      this.elementModal = el.nativeElement;
      this.catestadosSvc.getCatalogo().subscribe(resp => {
        this.catestadosCat = resp;
      });
      this.catestadocivilSvc.getCatalogo().subscribe(resp => {
        this.catestadocivilCat = resp;
      });
      this.catbancosSvc.getCatalogo().subscribe(resp => {
        this.catbancosCat = resp;
      });
      this.usuariosSvc.getCatalogo().subscribe(resp => {
        this.usuariosCat = resp;
      });

  }

  newRecord(): Personal {
    this.existeSegunCURP=false;

    return {
      id: 0,curp: '', rfc: '',  homoclave: '',
      state: '', nombre: '', apellidopaterno: '', apellidomaterno:'',id_catestadocivil:0,
      fechanacimiento: null, id_catestadosnaci: 0, id_catmunicipiosnaci: 0, id_catlocalidadesnaci: 0,
      id_archivos_avatar:0,id_usuarios_sistema:0,numeemp:'',
      telefono: '', email: '', emailoficial:'',observaciones:'',sexo:0,
      id_catestadosresi: 0, id_catmunicipiosresi: 0, id_catlocalidadesresi: 0,
      domicilio:'',colonia:'',cp:'',telefonomovil:'',numimss:'',numissste:'',otronombre:'', numotro:'',tipopension:'',
      created_at: new Date(),  updated_at: new Date(), id_usuarios_r: 0,fechaingreso:null,primaantiguedad:0,
      id_catbanco_deposito:0,cuentadeposito:'',formacobro:0,
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
      modal.personalService.add(modal);

      //loading
      this.userFormIsPending =this.isLoadingService.isLoading$({ key: 'loading' });

      //subtabla datatable
    this.headersAdmin = JSON.parse(this.route.snapshot.data.userdataExpediente); // get data from resolver

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
      columnDefs:[{"visible": false, "targets": [0]},
                {"width": "20%", "targets": [1]}]//ID, tipo
    };
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.personalService.remove(this.id); //idModal
      this.elementModal.remove();
  }

  onSelectEntidadNaci(id_catestados) {
    this.record.id_catestadosnaci=id_catestados;
    this.record.id_catmunicipiosnaci=0;
    this.catlocalidadesNaciCat=[];
    //console.log(this.catmunicipiosNaciCat);
    this.catmunicipiosSvc.getCatalogoSegunEntidad(id_catestados).subscribe(resp => {
      this.catmunicipiosNaciCat = resp;
    });
  }

  onSelectMunicipioNaci(id_municipio) {
    this.record.id_catmunicipiosnaci=id_municipio;
    this.record.id_catlocalidadesnaci=0;
    this.catlocalidadesSvc.getCatalogo(id_municipio).subscribe(resp => {
      this.catlocalidadesNaciCat = resp;
    });
  }

  onSelectEntidadResi(id_catestados) {
    this.record.id_catestadosresi=id_catestados;
    this.record.id_catmunicipiosresi=0;
    this.catlocalidadesResiCat=[];
    //console.log(this.catmunicipiosNaciCat);
    this.catmunicipiosSvc.getCatalogoSegunEntidad(id_catestados).subscribe(resp => {
      this.catmunicipiosResiCat = resp;
    });
  }

  onSelectMunicipioResi(id_municipio) {
    this.record.id_catmunicipiosresi=id_municipio;
    this.record.id_catlocalidadesresi=0;
    this.catlocalidadesSvc.getCatalogo(id_municipio).subscribe(resp => {
      this.catlocalidadesResiCat = resp;
    });
  }

  onSelectSexo(id_sexo) {
    this.record.sexo=id_sexo;
    this.record.id_catestadocivil=0;
    this.catestadocivilCat=[];
    //console.log(this.catmunicipiosNaciCat);
    this.catestadocivilSvc.getCatalogoSegunSexo(id_sexo).subscribe(resp => {
      this.catestadocivilCat = resp;
    });
  }

  onChangeCurp(curp){
    //revisar si existe personal con la curp
    this.personalService.getRecordSegunCURP(curp).subscribe(resp => {
      //si existe y la accion es de nuevo, cambiar a modalidad de editar y mostrar el registro

      if(resp!=null && (this.input_action.nativeElement.value.toLowerCase()=="nuevo" || this.input_action.nativeElement.value.toLowerCase()=="editar")){
        this.input_action.nativeElement.value="editar";
        this.open(resp.id, "editar");
        this.existeSegunCURP=true;
      }
      else{
        if(this.input_action.nativeElement.value.toLowerCase()=="editar")
          this.input_action.nativeElement.value="nuevo";

        this.open("0","nuevo");

        this.record.curp=curp.toUpperCase();
        let rfc=this.record.curp.toString().substring(0,10);
        this.record.rfc=rfc;

        let fechanacimiento=curp.toString().substring(4,10);
        //console.log("fechanacimiento=",fechanacimiento)
        let fecha="";
        if(parseInt(fechanacimiento.substring(0,2))>20)
          fecha="19" +fechanacimiento.substring(0,2) + "-" + fechanacimiento.substring(2,4) + "-" + fechanacimiento.substring(4,6);
        else
          fecha="20" +fechanacimiento.substring(0,2) + "-" + fechanacimiento.substring(2,4) + "-" + fechanacimiento.substring(4,6);

        let fechaTxt=fecha
        fecha+="T00:00:00"
        this.record.fechanacimiento=new Date(fecha);
        setTimeout(()=>{ $('#txtFechanacimiento').val(fechaTxt) }, 100)
        this.existeSegunCURP=false;

        let sexo=curp.toString().substring(10,11);
        if(sexo=="M")
          this.record.sexo=1;
        else if(sexo=="H")
          this.record.sexo=2;
        else
          this.record.sexo=3;
        this.onSelectSexo(this.record.sexo);

        let estado=curp.toString().substring(11,13);
        this.record.id_catestadosnaci=this.catestadosCat.find(a=>a.clave_curp==estado).id;
        this.onSelectEntidadNaci(this.record.id_catestadosnaci);
      }
    });
  }

  onChangeFechaIngreso(fechaIngreso){

    /*this.personalService.getRecordAntiguedad(fechaIngreso).subscribe(resp => {
      this.recordantiguedad_catquincena_ingreso=resp.quincena;
      this.recordantiguedad_anios=resp.anios;
      this.recordantiguedad_meses=resp.meses;
      this.recordantiguedad_dias=resp.dias;

    });*/
  }

  getAntiguedad(id_personal){
    if(id_personal>0){
      this.personalService.getAntiguedadEnQuincenas(id_personal).subscribe(resp => {
        this.recordantiguedad_catquincena_ingreso=resp.quincena_ini;
        this.recordantiguedad_anios=resp.anios;
        this.recordantiguedad_meses=resp.meses;
        this.recordantiguedad_dias=resp.dias;
      });
    }
    else{
      this.recordantiguedad_catquincena_ingreso=0;
      this.recordantiguedad_anios=0;
      this.recordantiguedad_meses=0;
      this.recordantiguedad_dias=0;
    }
  }

  async submitAction(form) {

    if(this.actionForm.toUpperCase()!=="VER"){
      this.validSummary.resetErrorMessages(form);

      await this.isLoadingService.add(
        this.personalService.setRecord(this.record,this.actionForm).subscribe(async resp => {
          if (resp.hasOwnProperty('error')) {
            this.validSummary.generateErrorMessagesFromServer(resp.message);
          }
          else if(resp.message=="success"){
            if(this.actionForm.toUpperCase()=="NUEVO") this.actionForm="editar";
            this.record.id=resp.id;

            //actualizar el registro de la tabla archivos
            if(this.record.id_archivos_avatar>0){
              this.recordFile={id:this.record.id_archivos_avatar,
                    tabla:"personal",
                    id_tabla:this.record.id,ruta:"",
                    tipo: null,  nombre:  null,  datos: null,  id_usuarios_r: 0,
                    state: '',  created_at: null,   updated_at: null
                  };


              await this.isLoadingService.add(this.archivosSvc.setRecordReferencia(this.recordFile,this.actionForm).subscribe(resp => {
                  this.successModal.show();
                  setTimeout(()=>{ this.successModal.hide(); this.close();}, 2000)
                }),{ key: 'loading' });
            }
            else{
              this.successModal.show();
              setTimeout(()=>{ this.successModal.hide(); this.close();}, 2000)
            }
          }
        }),{ key: 'loading' });
    }
  }

  //Archivo cargado
  onLoadedFile(idFile:number){
    this.record.id_archivos_avatar=idFile;
    this.listUpload.showFiles(this.record.id_archivos_avatar);
  }

  // open de este form
  open(idItem: string, accion: string):  void {
    this.actionForm=accion;
    this.botonAccion=actionsButtonSave[accion];
    this.tituloForm="Personas - " + titulosModal[accion] + " registro";

    if(idItem=="0"){
      this.record =this.newRecord();
      this.getAntiguedad(0);
    } else {

      this.personalService.getRecord(idItem).subscribe(async resp => {
        this.onSelectEntidadNaci(resp.id_catestadosnaci);
        this.onSelectMunicipioNaci(resp.id_catmunicipiosnaci);
        this.onSelectEntidadResi(resp.id_catestadosresi);
        this.onSelectMunicipioResi(resp.id_catmunicipiosresi);
        this.record = resp;
        this.listUpload.showFiles(this.record.id_archivos_avatar);
        this.reDraw(null);
      });

      this.getAntiguedad(idItem);
    }

    this.reDraw(null);
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

  //Sub formulario
  openModal(id: string, accion: string, idItem: number, idPersonal:number) {
    this.personalexpedienteformSvc.open(id, accion, idItem, idPersonal);
  }

  closeModal(id: string) {
    this.personalexpedienteformSvc.close(id);
  }

  reDraw(parametro:any): void {
    this.dtOptionsAdicional.raw++;
    this.dtOptionsAdicional.fkeyvalue = [this.record.id];
    //this.dtOptionsAdicional.fkeyvalue=this.record_id_personal;
    this.dataTablesParameters.opcionesAdicionales = this.dtOptionsAdicional;

    this.personalexpedienteformSvc.getAdmin(this.dataTablesParameters).subscribe(resp => {

      this.ColumnNames = resp.columnNames;
      this.Members = resp.data;
      this.NumberOfMembers = resp.data.length;
      $('.dataTables_length>label>select, .dataTables_filter>label>input').addClass('form-control-sm');
      //$('#tblHorasasignacionAdmin').dataTable({searching: false, paging: false, info: false});
      if (this.NumberOfMembers > 0) {
        $('.dataTables_empty').css('display', 'none');
      }
    }
    );
  }

  // log contenido de objeto en formulario
  get diagnosticValidate() { return JSON.stringify(this.record); }
}
