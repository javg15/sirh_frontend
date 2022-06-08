
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DataTablesResponse } from '../../../../classes/data-tables-response';

import { environment } from '../../../../../../src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  public API_URL = environment.APIS_URL;
  private modals: any[] = [];


  /* En el constructor creamos el objeto http de la clase HttpClient,
  que estará disponible en toda la clase del servicio.
  Se define como public, para que sea accesible desde los componentes necesarios */
  constructor(public http: HttpClient) {}

  getHeaders(): Observable<any>{
    return new Observable((o)=>{
      setTimeout(()=>{
        this.http.post<DataTablesResponse>(
          // this.API_URL + '/a6b_apis/read_records_dt.php',
          this.API_URL + '/categorias/getAdmin',
          {solocabeceras:1,opcionesAdicionales:{raw:0}}, {}
        ).subscribe(resp => {
              o.next(resp.data[0]);
          })
      }, 200)
    })
  }

  public getCatalogo(): Observable<any> {
    return this.http.post(this.API_URL + '/categorias/getCatalogo',
      {  }
      , httpOptions);
  }

  public getCatalogoDocentes(): Observable<any> {
    return this.http.post(this.API_URL + '/categorias/getCatalogoDocentes',
      {  }
      , httpOptions);
  }

  public getHorasprogramadas(id_categorias): Observable<any> {
    return this.http.post(this.API_URL + '/categorias/getHorasprogramadas',
      { id_categorias }
      , httpOptions);
  }

  public getEstaEnTablaHomologadas(id_categorias): Observable<any> {
    return this.http.post(this.API_URL + '/categorias/getEstaEnTablaHomologadas',
      { id_categorias }
      , httpOptions);
  }

  

  /* Devuelve el ID y Descripcion de la tabla, segun plantel */
  public getCatalogoSegunPlantel(tipoplantel): Observable<any> {
    return this.http.post(this.API_URL + '/categorias/getCatalogoSegunPlantel',
      { tipoplantel }
      , httpOptions);
  }

  /* Devuelve las categorias disponibles, segun plantel en plantillas*/
  public getCatalogoDisponibleEnPlantilla(id_catplanteles,id_plazas,id_catplantillas): Observable<any> {
    return this.http.post(this.API_URL + '/categorias/getCatalogoDisponibleEnPlantilla',
      { id_catplanteles,id_plazas,id_catplantillas }
      , httpOptions);
  }

  /* Devuelve las categorias vigentes, segun plantilla*/
  public getCatalogoVigenteEnPlantilla(id_catplantillas): Observable<any> {
    return this.http.post(this.API_URL + '/categorias/getCatalogoVigenteEnPlantilla',
      { id_catplantillas }
      , httpOptions);
  }
  

  /** Devuelve el registro con formato para select2 (incluye text) */
  public getRecordParaCombo(id_categoria): Observable<any> {
    return this.http.post(this.API_URL + '/categorias/getRecordParaCombo',
      { id_categoria }
      , httpOptions);
  }
  

  /* El siguiente método lee los datos de un registro seleccionado para edición. */
  public getRecord(id: any): Observable<any> {
    return this.http.post(this.API_URL + '/categorias/getRecord',
      { id }
      , httpOptions);
  }


  /* El siguiente método graba un registro nuevo, o uno editado. */
  public setRecord(dataPack,actionForm): Observable<any> {

    return this.http.post(this.API_URL + '/categorias/setRecord',
      { dataPack,actionForm }
      , httpOptions);
  }

  public getReporte(url,id_ze){
    let params = new HttpParams().set("id_ze", id_ze);

    this.http.get(this.API_URL + url, {responseType: 'arraybuffer',params: params}).subscribe( data => {
      var file = new Blob([data], {type: 'application/pdf'});
      var fileURL = window.URL.createObjectURL(file);
      window.open(fileURL);
  });
  }


// array de modales
  public add(modal: any) {
        this.modals.push(modal);
    }

  public remove(id: string) {
        this.modals = this.modals.filter(x => x.id !== id);
    }

  public open(id: string, accion: string, idItem: number) {
        let modal: any = this.modals.filter(x => x.id === id)[0];
        modal.open(idItem, accion);
    }

  public close(id: string) {
        let modal: any = this.modals.filter(x => x.id === id)[0];
        modal.close();
    }
}
