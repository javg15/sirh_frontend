import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class HorasasignacionFormService {
  public API_URL = environment.APIS_URL;
  private modals: any[] = [];


  /* En el constructor creamos el objeto http de la clase HttpClient,
  que estará disponible en toda la clase del servicio.
  Se define como public, para que sea accesible desde los componentes necesarios */
  constructor(public http: HttpClient) { }


  /* El siguiente método lee los datos de un registro seleccionado para edición. */
  public getRecord(id: any): Observable<any> {
    return this.http.post(this.API_URL + '/personalhoras/getRecord',
      { id }
      , httpOptions);
  }

  /* El siguiente método graba un registro nuevo, o uno editado. */
  public setRecord(dataPack, actionForm): Observable<any> {

    return this.http.post(this.API_URL + '/personalhoras/setRecord',
      { dataPack, actionForm }
      , httpOptions);
  }

  public getRecordTitularEnLicencia( id_catplanteles, id_gruposclase,id_materiasclase,id_semestre): Observable<any> {
    return this.http.post(this.API_URL + '/personalhoras/getRecordTitularEnLicencia',
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

  public open(id: string, accion: string, idItem: number, idPersonal: number, idSemestre: number, idPlantel:number) {
    let modal: any = this.modals.filter(x => x.id === id)[0];
    modal.open(idItem, accion, idPersonal, idSemestre, idPlantel);
  }

  public close(id: string) {
    let modal: any = this.modals.filter(x => x.id === id)[0];
    modal.close();
  }
}
