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
export class PlazasService {
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
          this.API_URL + '/plazas/getAdmin',
          { solocabeceras: 1, opcionesAdicionales: { raw: 0 } }, {}
        ).subscribe(resp => {
          //if(resp.data.length>0)
          o.next(resp.data[0]);
          /*else{
            o.next(JSON.parse('[{"data":"id","name":"a_id","title":"ID"},{"data":"categoria","name":"ctc_denominacion","title":"Categoria"},{"data":"plantel","name":"Plantel","title":"Plantel"},{"data":"centro_trabajo","name":"ctt_descripcion","title":"Centro Trabajo"},{"data":"zona_eco","name":"ze_descripcion","title":"Zona Eco"},{"data":"zona_geo","name":"zg_descripcion","title":"Zona Geo"},{"data":"acciones","name":"Accionesbotones>","title":"Acciones","render":"botones"}]'))
          }*/
        })
      }, 200)
    })
  }
  /* El siguiente método lee los datos de un registro seleccionado para edición. */
  public getRecord(id: any): Observable<any> {
    return this.http.post(this.API_URL + '/plazas/getRecord',
      { id }
      , httpOptions);
  }

  /* Obtiene la clave de la plaza */
  public getClave(id_plazas: any): Observable<any> {
    return this.http.post(this.API_URL + '/plazas/getClave',
      { id_plazas }
      , httpOptions);
  }

  /* obtener la plaza segun el personal */
  public getPlazaSegunPersonal(id_personal: any): Observable<any> {
    return this.http.post(this.API_URL + '/plazas/getPlazaSegunPersonal',
      { id_personal }
      , httpOptions);
  }


  /* El siguiente método graba un registro nuevo, o uno editado. */
  public setRecord(dataPack, actionForm): Observable<any> {

    return this.http.post(this.API_URL + '/plazas/setRecord',
      { dataPack, actionForm }
      , httpOptions);
  }

  /* Obtener informacion extra de plazas */
  public getRecordPlazasInfo(id_categorias: any, id_catplanteles: any): Observable<any> {
    return this.http.post(this.API_URL + '/plazas/getRecordPlazasInfo',
      { id_categorias, id_catplanteles }
      , httpOptions);
  }

  /* Obtiene el consecutivo de categorias*/
  public getConsecutivo(idCategorias: any): Observable<any> {
    return this.http.post(this.API_URL + '/plazas/getConsecutivo',
      { idCategorias }
      , httpOptions);
  }

  /* Obtiene las plazas disponibloes segun la categoria*/
  public getCatalogoDisponibleSegunCategoria(id_categorias: any, id_plazas, id_catplanteles): Observable<any> {
    return this.http.post(this.API_URL + '/plazas/getCatalogoDisponibleSegunCategoria',
      { id_categorias, id_plazas, id_catplanteles }
      , httpOptions);
  }

  /*public getBaseClave(id_personal: any, id_semestre): Observable<any> {
    return this.http.post(this.API_URL + '/plazas/getBaseClave',
      { id_personal, id_semestre }
      , httpOptions);
  }*/
  public getNombramientosVigentes(id_personal: any, id_semestre): Observable<any> {
    return this.http.post(this.API_URL + '/plazas/getNombramientosVigentes',
      { id_personal, id_semestre }
      , httpOptions);
  }

  public getNombramientosBase(id_personal: any, id_semestre): Observable<any> {
    return this.http.post(this.API_URL + '/plazas/getNombramientosBase',
      { id_personal, id_semestre }
      , httpOptions);
  }

  public getTitularPlaza(id_plazas: any): Observable<any> {
    return this.http.post(this.API_URL + '/plazas/getTitularPlaza',
      { id_plazas }
      , httpOptions);
  }  

  public getRecordParaCombo(id_plazas): Observable<any> {
    return this.http.post(this.API_URL + '/plazas/getRecordParaCombo',
      { id_plazas }
      , httpOptions);
  }

  public getHorasDisponibleSegunPlaza(id_personal:number, id_planteles:number, id_semestre:number, id_plazas:number): Observable<any> {
    return this.http.post(this.API_URL + '/plazas/getHorasDisponibleSegunPlaza',
      { id_personal, id_planteles, id_semestre, id_plazas }
      , httpOptions);
  }

  public getCatalogoVigenteSegunCategoria(id_categorias: any, id_plantillaspersonal:any): Observable<any> {
    return this.http.post(this.API_URL + '/plazas/getCatalogoVigenteSegunCategoria',
      { id_categorias, id_plantillaspersonal }
      , httpOptions);
  }

  public getListado(url, id_catplanteles = 0, id_cattiponomina = 0, id_categorias = 0, id_catestatusplaza = 0) {
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

  // array de modales
  public add(modal: any) {
    this.modals.push(modal);
  }

  public remove(id: string) {
    this.modals = this.modals.filter(x => x.id !== id);
  }

  public open(id: string, accion: string, idItem: number,id_plantillasdocsnombramiento_actual:number,id_estatus:number) {
    let modal: any = this.modals.filter(x => x.id === id)[0];
    modal.open(idItem, accion,id_plantillasdocsnombramiento_actual,id_estatus);
  }

  public close(id: string) {
    let modal: any = this.modals.filter(x => x.id === id)[0];
    modal.close();
  }
}
