import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Permgrupos } from '../../../../_models';
import { ValidationSummaryComponent } from '../../../_shared/validation/validation-summary.component';
import { actionsButtonSave, titulosModal } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IsLoadingService } from '../../../../_services/is-loading/is-loading.service';
import { PermgruposService } from '../services/permgrupos.service';
import { TreeNode, TreeModel, ITreeOptions } from '@circlon/angular-tree-component';


declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-permgrupos-form',
  templateUrl: './permgrupos-form.component.html',
  styleUrls: ['./permgrupos-form.component.css']
})

export class PermgruposFormComponent implements OnInit, OnDestroy {
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
  @ViewChild('tree') tree;

  record: Permgrupos;
  isLoadingSearch:boolean;
  keywordSearch = 'full_name';

  nodes = [
    {
      id:'1', 
      name:'Root',
      checked: true,
      checkbox: false,
      children: [
        {
          id:'2',
          name:'First Child',
          checked: true,
          checkbox: true,
        },
        {
          id:'3',
          name:'Second Child',
          checked: false,
          checkbox: true,
        }
      ]
    },
    {
      id:'4', 
      name:'Root2', 
      checked: false,
      checkbox: false,
      children: [
        {
          id:'5',
          name:'First Child',
          checked: false,
          checkbox: false,
          children: [
            { id: '7', name: 'grandchild', checked: false,checkbox: true }
          ]
        },
        {
          id:'6',
          name:'Second Child',
          checked: false,
          checkbox: true,
        }
      ]
    },
  ];

  options: ITreeOptions = {
    
  };

  constructor(private isLoadingService: IsLoadingService,
      private permgruposService: PermgruposService, private el: ElementRef,
      ) {
      this.elementModal = el.nativeElement;
  }

  newRecord(): Permgrupos {
    return {
      id: 0,  icode: '',   idesc: '',
      created_at: new Date(),  updated_at: new Date(),
      id_usuarios_r: 0, state: ''
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
      modal.permgruposService.add(modal);

      //loading
      this.userFormIsPending =this.isLoadingService.isLoading$({ key: 'loading' });
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.permgruposService.remove(this.id); //idModal
      this.elementModal.remove();
  }


  async submitAction(form) {

    if(this.actionForm.toUpperCase()!=="VER"){
      this.validSummary.resetErrorMessages(form);

      await this.isLoadingService.add(
      this.permgruposService.setRecord(this.record,this.actionForm).subscribe(async resp => {
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

  /**treview \./ */
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
    console.log("tree.treeModel=>",this.tree.treeModel)
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
  
  /** treview /.\ */

  // open modal
  open(idItem: string, accion: string):  void {
    this.actionForm=accion;
    this.botonAccion=actionsButtonSave[accion];
    this.tituloForm="Roles de usuario - " +titulosModal[accion] + " registro";

    if(idItem=="0"){
      this.record =this.newRecord();
    } else {
      this.permgruposService.getRecord(idItem).subscribe(resp => {
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
