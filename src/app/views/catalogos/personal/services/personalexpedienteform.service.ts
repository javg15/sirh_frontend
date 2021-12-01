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
export class PersonalexpedienteFormService {
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
          this.API_URL + '/personalexpediente/getAdmin',
          { solocabeceras: 1, opcionesAdicionales: { raw: 0 } }, {}
        ).subscribe(resp => {
          //if(resp.data.length>0)
          o.next(JSON.parse(resp.data[0].cabeceras));
          /*else{
            o.next(JSON.parse('[{"data":"id","name":"a_id","title":"ID"},{"data":"categoria","name":"ctc_denominacion","title":"Categoria"},{"data":"plantel","name":"Plantel","title":"Plantel"},{"data":"centro_trabajo","name":"ctt_descripcion","title":"Centro Trabajo"},{"data":"zona_eco","name":"ze_descripcion","title":"Zona Eco"},{"data":"zona_geo","name":"zg_descripcion","title":"Zona Geo"},{"data":"acciones","name":"Accionesbotones>","title":"Acciones","render":"botones"}]'))
          }*/
        })
      }, 200)
    })
  }

  public getAdmin(dataTablesParameters): Observable<any> {
    return this.http.post(this.API_URL + '/personalexpediente/getAdmin',
      { dataTablesParameters }
      , httpOptions);
  }

  /* El siguiente método lee los datos de un registro seleccionado para edición. */
  public getRecord(id: any): Observable<any> {
    return this.http.post(this.API_URL + '/personalexpediente/getRecord',
      { id }
      , httpOptions);
  }

  /* El siguiente método graba un registro nuevo, o uno editado. */
  public setRecord(dataPack, actionForm): Observable<any> {

    return this.http.post(this.API_URL + '/personalexpediente/setRecord',
      { dataPack, actionForm }
      , httpOptions);
  }

  public getRecordTitularEnLicencia( id_catplanteles, id_gruposclase,id_materiasclase,id_semestre): Observable<any> {
    return this.http.post(this.API_URL + '/personalexpediente/getRecordTitularEnLicencia',
      { id_catplanteles, id_gruposclase,id_materiasclase,id_semestre }
      , httpOptions);
  }

  // array de modales
  public add(modal: any) {
    this.modals.push(modal);
  }

  public remove(id: string) {
    this.modals = this.modals.filter(x => x.id !== id);
  }

  public open(id: string, accion: string, idItem: number, idPersonal: number) {
    let modal: any = this.modals.filter(x => x.id === id)[0];
    modal.open(idItem, accion, idPersonal);
  }

  public close(id: string) {
    let modal: any = this.modals.filter(x => x.id === id)[0];
    modal.close();
  }
}
