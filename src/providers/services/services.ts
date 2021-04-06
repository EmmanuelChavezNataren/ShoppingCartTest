import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/timeout';

/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
/**
 * Clase que obtiene la l&oacute;gica para consumir los m&eacute;todos http
 * @author Emmanuel Ch&aacute;vez
 */
@Injectable()
export class ServicesProvider {
  readonly DEFAULT_TIMEOUT = 120000;

  private REST_SERVER_ADDRESS = 'https://run.mocky.io/v3';

  constructor(public http: HttpClient) {    
  }

  /**
   * M&eacute;todo que obtiene las cabeceras para las peticiones de los metodos http
   * @returns HttpHeaders Object
   */
  private getDefaultHeaders(): HttpHeaders {
    let headerJson = {
      'Acces-Control-Allow-Origin': '*',
      'Acces-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, HEAD',
      'Acces-Control-Allow-Headers': 'Content-Type, Authorization'
    };
    let httpHeaders = new HttpHeaders(headerJson);
    return httpHeaders;
  }

  /**
   * M&eacute;todo que concatena la URL del host con el path del servicio a consumir
   * @param path Ruta del servicio web a consultar
   * @returns Ruta final del servicio web
   */
  private buildCompletePath(path: string): string {
    return this.REST_SERVER_ADDRESS + path;
  }

  /** 
   * M&eacute;todo para realizar una petici&oacute;n http/get al servicio rest
   * @param resourcePath direcci&oacute;n url del servicio a invocar, sin host, contextpath ni puerto.
   * @param filterObject objeto json con los datos que se usar&aacute;n para filtrar los registros.
   * @return objeto json con el resultado de la operaci&oacute;n.
   */
   doGet(resourcePath: string, filterObject: any): Observable<any> {
    localStorage.setItem('resourcePath', resourcePath);
    let headers = this.getDefaultHeaders();
    let completPath = this.buildCompletePath(resourcePath);
    return this.http.get(completPath, { headers: headers, params: filterObject }).timeout(this.DEFAULT_TIMEOUT);
  }
  
  /**
   * M&eacute;todo para realizar una petici&oacute;n http/post al servicio rest
   * @param resourcePath direcci&oacute;n url del servicio a invocar, sin host, contextpath ni puerto.
   * @param newRegister objeto json con los datos que se registrar&aacute;n.
   * @return objeto json con el resultado de la operaci&oacute;n.
   */
   doPost(resourcePath: string, newRegister: any): any {
    localStorage.setItem('resourcePath', resourcePath);
    let headers = this.getDefaultHeaders();
    let completPath = this.buildCompletePath(resourcePath);
    return this.http.post(completPath, newRegister, { headers: headers }).timeout(this.DEFAULT_TIMEOUT);;
  }

    /**
   * M&eacute;todo para realizar una petici&oacute;n http/put al servicio rest
   * @param resourcePath direcci&oacute;n url del servicio a invocar, sin host, contextpath ni puerto
   * @param updateRegister objeto json con los datos que se actualizar&aacute;n
   * @return objeto json con el resultado de la operaci&oacute;n
   */
     doPut(resourcePath: string, updateRegister: any): any {
      localStorage.setItem('resourcePath', resourcePath);
      let headers = this.getDefaultHeaders();
      let completPath = this.buildCompletePath(resourcePath);
      return this.http.put(completPath, updateRegister, { headers: headers }).timeout(this.DEFAULT_TIMEOUT);
    }


}
