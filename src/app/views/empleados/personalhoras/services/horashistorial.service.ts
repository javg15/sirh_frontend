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
export class HorashistorialService {
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
          this.API_URL + '/personalhoras/getHistorialMateria',
          { dataTablesParameters: { solocabeceras: 1, opcionesAdicionales: { raw: 0 } } }, {}
        ).subscribe(resp => {
          o.next(resp.data[0]);
        })
      }, 200)
    })
  }


  public getHistorial(dataTablesParameters): Observable<any> {
    if(dataTablesParameters.opcionesAdicionales.tiporeporte.toUpperCase()=="MATERIAS")
      return this.http.post(this.API_URL + '/personalhoras/getHistorialMateria',
        { dataTablesParameters }
        , httpOptions);
    else if(dataTablesParameters.opcionesAdicionales.tiporeporte.toUpperCase()=="GRUPOS")
      return this.http.post(this.API_URL + '/personalhoras/getHistorialGrupo',
        { dataTablesParameters }
        , httpOptions);
    else if(dataTablesParameters.opcionesAdicionales.tiporeporte.toUpperCase()=="DOCENTES")
        return this.http.post(this.API_URL + '/personalhoras/getHistorialDocente',
          { dataTablesParameters }
          , httpOptions);

      
  }



  // array de modales
  public add(modal: any) {
    this.modals.push(modal);
  }

  public remove(id: string) {
    this.modals = this.modals.filter(x => x.id !== id);
  }

  public open(id: string, tipo:string, id_horasclase:number, id_personal: number, id_gruposclase: number, id_materiasclase: number, id_semestre: number) {
    let modal: any = this.modals.filter(x => x.id === id)[0];
    modal.open(tipo, id_horasclase, id_personal, id_gruposclase, id_materiasclase, id_semestre);
  }

  public close(id: string) {
    let modal: any = this.modals.filter(x => x.id === id)[0];
    modal.close();
  }
}
