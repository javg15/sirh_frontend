import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DataTablesResponse } from '../../../../classes/data-tables-response';

import { environment } from '../../../../../../src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class CategoriaspercepcionesService {
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
          this.API_URL + '/categoriaspercepciones/getAdmin',
          {solocabeceras:1,opcionesAdicionales:{raw:0}}, {}
        ).subscribe(resp => {
            if(resp.data.length>0)
              o.next(JSON.parse(resp.data[0].cabeceras));
            else{
              o.next(JSON.parse('[{"data":"id","name":"a_id","title":"ID"}]'))
            }
          })
      }, 200)
    })
  }
  /* Devuelve el ID y Descripcion de la tabla, comunmente usado para los SELECT */
  public getCatalogo(id_region): Observable<any> {
    return this.http.post(this.API_URL + '/categoriaspercepciones/getCatalogo',
      { id_region }
      , httpOptions);
  }

  /* Devuelve el ID y Descripcion de la tabla, comunmente usado para los SELECT */
  public getAdmin(dataTablesParameters): Observable<any> {
    return this.http.post(this.API_URL + '/categoriaspercepciones/getAdmin',
      { dataTablesParameters }
      , httpOptions);
  }


  /* El siguiente método lee los datos de un registro seleccionado para edición. */
  public getRecord(id: any): Observable<any> {
    return this.http.post(this.API_URL + '/categoriaspercepciones/getRecord',
      { id }
      , httpOptions);
  }


public getRecordSegunCategoria(id_categorias: any): Observable<any> {
  return this.http.post(this.API_URL + '/categoriaspercepciones/getRecordSegunCategoria',
    { id_categorias }
    , httpOptions);
}

  /* El siguiente método graba un registro nuevo, o uno editado. */
  public setRecord(dataPack,actionForm): Observable<any> {

    return this.http.post(this.API_URL + '/categoriaspercepciones/setRecord',
      { dataPack,actionForm }
      , httpOptions);
  }

// array de modales
  public add(modal: any) {
        this.modals.push(modal);
    }

  public remove(id: string) {
        this.modals = this.modals.filter(x => x.id !== id);
    }

  public open(id: string, accion: string, idItem: number,idParent:number) {
        let modal: any = this.modals.filter(x => x.id === id)[0];
        modal.open(idItem, accion,idParent);
    }

  public close(id: string) {
        let modal: any = this.modals.filter(x => x.id === id)[0];
        modal.close();
    }
}