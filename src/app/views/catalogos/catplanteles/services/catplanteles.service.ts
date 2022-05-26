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
export class CatplantelesService {
  public API_URL = environment.APIS_URL;
  private modals: any[] = [];


  /* En el constructor creamos el objeto http de la clase HttpClient,
  que estará disponible en toda la clase del servicio.
  Se define como public, para que sea accesible desde los componentes necesarios */
  constructor(public http: HttpClient) { }

  getHeaders(): Observable<any> {
    return new Observable((o) => {
      setTimeout(() => {
        this.http.post<DataTablesResponse>(
          // this.API_URL + '/a6b_apis/read_records_dt.php',
          this.API_URL + '/catplanteles/getAdmin',
          { solocabeceras: 1, opcionesAdicionales: { raw: 0 } }, {}
        ).subscribe(resp => {
          o.next(resp.data[0]);
        })
      }, 200)
    })
  }
  /* El siguiente método lee los datos de un registro seleccionado para edición. */
  public getRecord(id: any): Observable<any> {
    return this.http.post(this.API_URL + '/catplanteles/getRecord',
      { id }
      , httpOptions);
  }

  public getCatalogoSegunPersonal(id_personal: any): Observable<any> {
    return this.http.post(this.API_URL + '/catplanteles/getCatalogoSegunPersonal',
      { id_personal }
      , httpOptions);
  }
  public getCatalogoOpen(id_catzonageografica,id_catplanteles): Observable<any> {
    return this.http.post(this.API_URL + '/catplanteles/getCatalogoOpen',
      { id_catzonageografica,id_catplanteles }
      , httpOptions);
  }


  /* El siguiente método graba un registro nuevo, o uno editado. */
  public setRecord(dataPack, actionForm): Observable<any> {

    return this.http.post(this.API_URL + '/catplanteles/setRecord',
      { dataPack, actionForm }
      , httpOptions);
  }

  public setRecord2(dataPack, campoEdit): Observable<any> {

    return this.http.post(this.API_URL + '/catplanteles/setRecord2',
      { dataPack, campoEdit }
      , httpOptions);
  }

  public getCatalogoSinAdmin(id_usuario:number): Observable<any> {
    return this.http.post(this.API_URL + '/catplanteles/getCatalogoSinAdmin',
      {id_usuario}
      , httpOptions);
  }

  public getCatalogo(id_usuario:number=0): Observable<any> {
    return this.http.post(this.API_URL + '/catplanteles/getCatalogo',
      {id_usuario}
      , httpOptions);
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
