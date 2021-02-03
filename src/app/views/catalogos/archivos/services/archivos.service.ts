import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DataTablesResponse } from '../../../../classes/data-tables-response';

import { environment } from '../../../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ArchivosService {
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
          this.API_URL + '/archivos/getAdmin',
          {solocabeceras:1,opcionesAdicionales:{raw:0}}, {}
        ).subscribe(resp => {
              o.next(JSON.parse(resp.data[0].cabeceras));
          })
      }, 200)
    })
  }
  /* Devuelve el ID y Descripcion de la tabla, comunmente usado para los SELECT */
  public getCatalogo(): Observable<any> {
    return this.http.post(this.API_URL + '/archivos/getCatalogo',
      {  }
      , httpOptions);
  }

  public getCatalogoSegunSexo(id_sexo): Observable<any> {
    return this.http.post(this.API_URL + '/archivos/getCatalogoSegunSexo',
      { id_sexo }
      , httpOptions);
  }


  /* El siguiente método lee los datos de un registro seleccionado para edición. */
  public getRecord(id: any): Observable<any> {
    return this.http.post(this.API_URL + '/archivos/getRecord',
      { id }
      , httpOptions);
  }

  //obtiene el registro con los campos de referencia
  public getRecordReferencia(id: any): Observable<any> {
    return this.http.post(this.API_URL + '/archivos/getRecordReferencia',
      { id }
      , httpOptions);
  }


  /* El siguiente método graba un registro nuevo, o uno editado. */
  public setRecord(dataPack,actionForm): Observable<any> {

    return this.http.post(this.API_URL + '/archivos/setRecord',
      { dataPack,actionForm }
      , httpOptions);
  }

  /* El siguiente método graba un registro nuevo, o uno editado. */
  public setRecordReferencia(dataPack,actionForm): Observable<any> {

    return this.http.post(this.API_URL + '/archivos/setRecordReferencia',
      { dataPack,actionForm }
      , httpOptions);
  }

  /* El siguiente método comprueba si un DOI está repetido y, por tanto, no puede usarse. */
  public checkRepeatedDoi$(id, doi): Observable<string> {
    return this.http.post(
      this.API_URL + 'check_doi.php',
      { id, doi },
      { responseType: 'text' }
    );
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
