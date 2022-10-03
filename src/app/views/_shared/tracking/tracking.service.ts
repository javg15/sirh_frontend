import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
/* Importamos los environments, para determinar la URL base de las API's */
import { environment } from '../../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  public API_URL = environment.APIS_URL;

  constructor(private http: HttpClient) { }

  public getTracking(tabla: any,id_record:any): Observable<any> {
    return this.http.post(this.API_URL + '/shared/getTracking',
      { tabla,id_record }
      , httpOptions);
  }
}
