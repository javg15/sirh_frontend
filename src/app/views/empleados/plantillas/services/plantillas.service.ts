
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DataTablesResponse } from '../../../../classes/data-tables-response';

import { environment } from '../../../../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class PlantillasService {
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
          this.API_URL + '/plantillaspersonal/getAdmin',
          {solocabeceras:1,opcionesAdicionales:{raw:0}}, {}
        ).subscribe(resp => {
              o.next(resp.data[0]);
          })
      }, 200)
    })
  }

  public getAdmin(opcionesAdicionales): Observable<any> {
    return this.http.post(this.API_URL + '/plantillaspersonal/getAdmin',
      { solocabeceras:0,opcionesAdicionales }
      , httpOptions);
  }

  public getCatalogo(): Observable<any> {
    return this.http.post(this.API_URL + '/plantillaspersonal/getCatalogo',
      {  }
      , httpOptions);
  }

  public getCatalogoSegunPlantel(id_catplanteles): Observable<any> {
    return this.http.post(this.API_URL + '/plantillaspersonal/getCatalogoSegunPlantel',
      { id_catplanteles }
      , httpOptions);
  }

  public getRecordPersonal(id: any): Observable<any> {
    return this.http.post(this.API_URL + '/plantillaspersonal/getRecordPersonal',
      { id }
      , httpOptions);
  }


  /* El siguiente método lee los datos de un registro seleccionado para edición. */
  public getRecord(id: any): Observable<any> {
    return this.http.post(this.API_URL + '/plantillaspersonal/getRecord',
      { id }
      , httpOptions);
  }

  /* El siguiente método graba un registro nuevo, o uno editado. */
  public setRecord(dataPack,actionForm,record_id_catquincena): Observable<any> {

    return this.http.post(this.API_URL + '/plantillaspersonal/setRecord',
      { dataPack,actionForm,record_id_catquincena }
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

  public getConsecutivo(idCatplanteles,idCatplantillas): Observable<any> {
    return this.http.post(this.API_URL + '/plantillaspersonal/getConsecutivo',
      { idCatplanteles,idCatplantillas }
      , httpOptions);
  }

  // array de modales
  public add(modal: any) {
    this.modals.push(modal);
  }

  public remove(id: string) {
      this.modals = this.modals.filter(x => x.id !== id);
  }

  public open(id: string, accion: string, idItem: number,idCatplanteles:number,idCatplantillas:number,tipoDocumento:number) {
    let modal: any = this.modals.filter(x => x.id === id)[0];
    modal.open(idItem, accion,idCatplanteles,idCatplantillas,tipoDocumento);
  }

  public close(id: string) {
      let modal: any = this.modals.filter(x => x.id === id)[0];
      modal.close();
  }
}
