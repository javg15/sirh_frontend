import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, Output, EventEmitter} from '@angular/core';
import { SearchService } from '../../../_services/search.service';


declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-search-admin',
  templateUrl: './search-admin.component.html',
  styleUrls: ['./search-admin.component.css']
})

export class SearchAdminComponent implements OnInit {
  @Input() nombreModulo: string;
  @Output() buscarEvent = new EventEmitter<any>();

  isCollapsed: boolean = true;
  itemsCampos: Array<any> = [{id: 0, idesc: '', orden: 0}];
  itemsOperadores: Array<any> = [{id: 0, idesc: '', orden: 0}];

  selectedItemsCampos: any = {id: 0, idesc: '', orden: 0};
  selectedItemsOperadores: any = {id: 0, idesc: '', orden: 0};
  tipoEdicion:number;
  valorBuscar: string;
  comboCat:any={id:"---------",idesc:"----------"};

  constructor(private searchService: SearchService) {
  }

  ngOnInit(): void {

    this.searchService.getSearchcampos(this.nombreModulo).subscribe(resp => {
      for (let i = 0; i < resp.data.length; i++) {
        this.itemsCampos.push({
          id: resp.data[i].id,
          idesc: resp.data[i].idesc,
          orden: resp.data[i].orden,
          edicion:resp.data[i].edicion,
          valores:resp.data[i].valores,
        });
      }
    });

    this.onSelectCampos(this.selectedItemsCampos.id);
  }

  ngOnDestroy(): void {

  }

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  onSelectCampos(id_campo) {
    this.itemsOperadores = [{id: 0, idesc: '', orden: 0}];
    this.tipoEdicion=this.itemsCampos.find(a=>a.id==id_campo).edicion;
    this.valorBuscar="";
    if(this.tipoEdicion==1){//combo
      this.comboCat=JSON.parse(this.itemsCampos.find(a=>a.id==id_campo).valores);
    }

    this.searchService.getSearchoperadores(id_campo).subscribe(resp => {
      for (let i = 0; i < resp.data.length; i++) {
        if(i==0){
          this.selectedItemsOperadores.id=resp.data[0].id;
        }

        this.itemsOperadores.push({
          id: resp.data[i].id,
          idesc: resp.data[i].idesc,
          orden: resp.data[i].orden
        });
      }
    });
  }

  onSelectComboValor(valor){
    this.valorBuscar=valor;
  }


  onClickBuscar() {

    this.buscarEvent.emit({
        campo: this.selectedItemsCampos.id,
        operador: this.selectedItemsOperadores.id,
        valor: this.valorBuscar
      }
    );
  }

  onClickClear() {
    this.selectedItemsCampos = {id: 0, idesc: '', orden: 0};
    this.selectedItemsOperadores = {id: 0, idesc: '', orden: 0};
    this.valorBuscar = '';
    this.onClickBuscar();
  }
}
