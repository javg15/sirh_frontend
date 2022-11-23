import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
/* Importamos los environments, para determinar la URL base de las API's */
import { environment } from '../../../../../src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  public API_URL = environment.APIS_URL;
  private modals: any[] = [];


  /* En el constructor creamos el objeto http de la clase HttpClient,
  que estará disponible en toda la clase del servicio.
  Se define como public, para que sea accesible desde los componentes necesarios */
  constructor(public http: HttpClient) { }

  public getMenuReportes(id: any): Observable<any> {
    return this.http.post(this.API_URL + '/reportes/getMenuReportes',
      { id }
      , httpOptions);
  }

  public getReportePlantilla(url, id_catplanteles = 0, id_semestre = 0, plantel = "") {
    let params = new HttpParams().set("id_catplanteles", (id_catplanteles == null ? 0 : id_catplanteles).toString())
      .set("id_semestre", (id_semestre == null ? 0 : id_semestre).toString())
      .set("plantel", (plantel == null ? "" : plantel).toString())
      ;

    this.http.get(this.API_URL + url, { responseType: 'arraybuffer', params: params }).subscribe(data => {
      var file = new Blob([data], { type: 'application/pdf' });
      var fileURL = window.URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  public getReportePlantillaMateria(url, id_catplanteles = 0, id_semestre = 0, plantel = "") {
    let params = new HttpParams().set("id_catplanteles", (id_catplanteles == null ? 0 : id_catplanteles).toString())
      .set("id_semestre", (id_semestre == null ? 0 : id_semestre).toString())
      .set("plantel", (plantel == null ? "" : plantel).toString())
      ;

    this.http.get(this.API_URL + url, { responseType: 'arraybuffer', params: params }).subscribe(data => {
      var file = new Blob([data], { type: 'application/pdf' });
      var fileURL = window.URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  public getPlazasListado(url, id_catplanteles = 0, id_cattiponomina = 0, id_categorias = 0, id_catestatusplaza = 0) {
    let params = new HttpParams().set("id_catplanteles", (id_catplanteles == null ? 0 : id_catplanteles).toString())
      .set("id_cattiponomina", (id_cattiponomina == null ? 0 : id_cattiponomina).toString())
      .set("id_categorias", (id_categorias == null ? 0 : id_categorias).toString())
      .set("id_catestatusplaza", (id_catestatusplaza == null ? 0 : id_catestatusplaza).toString())
      ;

    this.http.get(this.API_URL + url, { responseType: 'arraybuffer', params: params }).subscribe(data => {
      var file = new Blob([data], { type: 'application/pdf' });
      var fileURL = window.URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  public getCategoriasListado(url,id_ze){
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

  public open(id: string, idItem: number) {
    let modal: any = this.modals.filter(x => x.id === id)[0];
    modal.open(idItem);
  }

  public close(id: string) {
    let modal: any = this.modals.filter(x => x.id === id)[0];
    modal.close();
  }
}
