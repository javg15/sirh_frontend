import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Usuarios,  Personal,Catzonageografica, Permgrupos } from '../../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';
import { Archivos } from '../../../../_models';
import { ArchivosService } from '../../../catalogos/archivos/services/archivos.service';
import { UsuariosService } from '../services/usuarios.service';
import { UsuarioszonasService } from '../../../autenticacion/usuarioszonas/services/usuarioszonas.service';
import { CatzonageograficaService } from '../../../catalogos/catzonageografica/services/catzonageografica.service';
import { PermgruposService } from '../../../autenticacion/permgrupos/services/permgrupos.service';
import { PersonalService } from '../../../catalogos/personal/services/personal.service';

import { AutocompleteComponent } from 'angular-ng-autocomplete';
import { TreeNode, TreeModel, ITreeOptions } from '@circlon/angular-tree-component';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})

export class UsuariosFormComponent implements OnInit, OnDestroy {
  userFormIsPending: Observable<boolean>; //Procesando información en el servidor
  @Input() id: string; //idModal
  @Input() botonAccion: string; //texto del boton según acción
  @Output() redrawEvent = new EventEmitter<any>();
  actionForm: string; //acción que se ejecuta (nuevo, edición,etc)
  tituloForm: string;

  private elementModal: any;
  @ViewChild('id_personal') id_personal:AutocompleteComponent;
  @ViewChild('basicModal') basicModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild(ValidationSummaryComponent) validSummary: ValidationSummaryComponent;
  @ViewChild(TabsetComponent) tabSet: TabsetComponent;

  record: Usuarios;
  passConfirm:String="";
  pass:String="";
  passActual:String="";
  recordFile:Archivos;
  record_personal:String;
  catzonageograficaCat:Catzonageografica[];
  permgruposCat:Permgrupos[];
  personalCat:Personal[];
  record_id_personal:number=0;
  isLoadingSearch:boolean;
  keywordSearch = 'full_name';

  nodes = [];
  options: ITreeOptions = {

  };
  //se usa en el html
  dropdownSettings = {
    singleSelection: false,
    text:"",
    selectAllText:'Todas',
    unSelectAllText:'Ninguna',
    enableSearchFilter: false,
    classes:"myclass custom-class"
  };

  optionsSelect: any={multiple: true, closeOnSelect: false, width: '300'};

  constructor(private isLoadingService: IsLoadingService,
      private usuariosService: UsuariosService, private el: ElementRef,
      private archivosSvc:ArchivosService,
      private catzonageograficaSvc: CatzonageograficaService,
      private permgruposSvc: PermgruposService,
      private usuarioszonasSvc:UsuarioszonasService,
      private personalSvc: PersonalService,
      ) {
      this.elementModal = el.nativeElement;
      this.catzonageograficaSvc.getCatalogo().subscribe(resp => {
        this.catzonageograficaCat = resp;
      });
      this.permgruposSvc.getCatalogo().subscribe(resp => {
        this.permgruposCat = resp;
      });
  }

  newRecord(): Usuarios {
    return {
      id: 0,  username: '',   pass: '',
      uPassenc: '',  perfil: 0,  nombre: '',   numemp: '',   created_at: new Date(),  updated_at: new Date(),
      record_catzonasgeograficas:[],
      id_permgrupos: 0, id_usuarios_r: 0, state: '',  email: '', id_archivos_avatar:0
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
      modal.usuariosService.add(modal);

      //loading
      this.userFormIsPending =this.isLoadingService.isLoading$({ key: 'loading' });
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.usuariosService.remove(this.id); //idModal
      this.elementModal.remove();
  }


  async submitAction(form) {

    if(this.actionForm.toUpperCase()!=="VER"){
      this.validSummary.resetErrorMessages(form);

      await this.isLoadingService.add(
      this.usuariosService.setPerfil(this.record,this.actionForm,this.passConfirm,this.passActual,0,this.record_id_personal).subscribe(async resp => {
        if (resp.hasOwnProperty('error')) {
          this.validSummary.generateErrorMessagesFromServer(resp.message);
        }
        else if(resp.message=="success"){
          if(this.actionForm.toUpperCase()=="NUEVO") this.actionForm="editar";
          this.record.id=resp.id;

          //actualizar el registro de la tabla archivos
          if(this.record.id_archivos_avatar>0){
            this.recordFile={id:this.record.id_archivos_avatar,
                  tabla:"usuarios",
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


  // open modal
  open(idItem: string, accion: string):  void {
    this.actionForm=accion;
    this.botonAccion=actionsButtonSave[accion];
    this.tituloForm="Usuarios - " +titulosModal[accion] + " registro";
    this.passConfirm="";
    this.tabSet.tabs[0].active = true;

    this.record_personal="";
    //limpiar autocomplete
    this.id_personal.clear();this.id_personal.close();

    if(idItem=="0"){
      this.record =this.newRecord();
      this.nodes =[];
    } else {

      this.usuariosService.getRecord(idItem).subscribe(resp => {
        this.record = resp;
  //obtener las zonas seleccionadas
        this.usuarioszonasSvc.getRecord(idItem).subscribe(resp => {
          this.record.record_catzonasgeograficas = resp.map(rec=>rec.id.toString());
        });
        this.usuariosService.getTreePermisos(idItem).subscribe(resp => {
          this.nodes = resp;
        });

        this.usuariosService.getTreePermisos(idItem).subscribe(resp => {
          this.nodes = resp;
        });
        this.personalSvc.getRecordSegunUsuario(this.record.id).subscribe(resp => {
          if(resp!=null){
            this.record_personal =resp.numeemp + " - "
                +  resp.nombre + " " + resp.apellidopaterno
                + " " + resp.apellidomaterno + " - " + resp.curp;

            this.id_personal.initialValue = this.record_personal;
            this.id_personal.searchInput.nativeElement.value = this.record_personal;
            this.record_id_personal=resp.id;
          }
        });

            

        //this.listUpload.showFiles(this.record.id_archivos_avatar);
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

  onClickBuscar() {
    if(this.id_personal.query=="") this.record_id_personal=0;
    if(this.record_id_personal>0)
      this.record.username=this.personalCat.find(a=>a.id==this.record_id_personal).numeemp;
    else
      this.record.username="";
  }

  /**treview \./ */
  /*update(node: TreeNode) {
    this.traverse(this.nodes,this.process,node);
  }

  traverse(o,func,node) {
    for (var i in o) {
        if(i=="checked" && o[i]==true)
          func.apply(this,[i,o[i],o]);
        if (o[i] !== null && typeof(o[i])=="object") {
            //going one step down in the object tree!!
            this.traverse(o[i],func,node);
        }
    }
  }

  process(key,value,node) {
    console.log(key + " : "+value,"node=>",node);
  }*/

  selectNode(node: TreeNode): void{

    node.data.checked = !node.data.checked;

    let father: TreeNode[] = this.deepSearchFather(node, []);

    if (father != null) {
      father.forEach((nodePai: TreeNode) => {
        if(nodePai.data.checkbox){
          let inputValue: HTMLInputElement = <HTMLInputElement>document.getElementById('check-' + nodePai.id);
          inputValue.indeterminate = node.data.checked;
          nodePai.data.checked = node.data.checked;
          nodePai.data.checkbox = !node.data.checked;
        }
      });
    }
  }

  private deepSearchFather(node: TreeNode, parents: TreeNode[]): TreeNode[] {

    if (node.parent) {

      if (node.parent.parent) {
        this.deepSearchFather(node.parent, parents);
      }

      if (node.parent.data.virtual) {
        return null;
      }

      parents.push(node.parent);

    } else {
      return null;
    }

    return parents;

  }
  onChangeGrupo(valor){
    this.usuariosService.getTreePermisos( valor).subscribe(resp => {
      this.nodes = resp;
    });
  }
  /** treview /.\ */

  /*********************
   autocomplete id_personal
   *********************/
   onChangeSearchIdPersonal(val: string) {
    this.isLoadingSearch = true;
    this.personalSvc.getCatalogoSegunBusqueda(val).subscribe(resp => {
      this.personalCat = resp;
      this.isLoadingSearch = false;
    });
  }

  onCleared(){
    this.record_id_personal=0;
    this.onClickBuscar();
  }

  onSelectIdPersonal(val: any) {
    let items=val["full_name"].split(" -- ");
    this.record_id_personal=parseInt(items[2]);
    this.onClickBuscar();
  }
}
