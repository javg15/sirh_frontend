import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { ReportesService } from '../services/reportes.service';
import { TreeNode, TreeModel, ITreeOptions } from '@circlon/angular-tree-component';
/* Importamos los environments, para determinar la URL base de las API's */
import { environment } from '../../../../../src/environments/environment';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-reportes-admin',
  templateUrl: './reportes-admin.component.html',
  styleUrls: ['./reportes-admin.component.css']
})


export class ReportesAdminComponent implements OnInit {
  nodes = []; 
  options: ITreeOptions = {
  };
  usuario:any=this.tokenStorage.getUser();
  public API_URL = environment.APIS_URL;

  constructor(private tokenStorage: TokenStorageService,
    private reportesService: ReportesService,private route: ActivatedRoute,
  ) {
    this.reportesService.getMenuReportes(this.usuario.id).subscribe(resp => {
      this.nodes = resp;
    });
  }

  ngOnInit(): void {
    
  }

  clickNode(event: TreeNode): void{
    const node=event["node"].data;
    this.openModal(node.controller,node.url)
  }  

  openModal(id: string, idItem: number) {
    this.reportesService.open(id, idItem);
  }

  closeModal(id: string) {
    this.reportesService.close(id);
  }

  

}

