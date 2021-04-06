import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _throw as throwError } from 'rxjs/observable/throw';
import { map, catchError } from 'rxjs/operators';
import { TimeoutError } from "rxjs";
import { UtilitiesProvider } from "../../providers/utilities/utilities";
import { ServicesProvider } from "../../providers/services/services";

@Injectable()
export class GlobalErrorHandler implements HttpInterceptor {

  public buttonAcept;

  constructor(public utils: UtilitiesProvider,
    public services: ServicesProvider) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const className = localStorage.getItem('CLASS_NAME');
    const methodName = localStorage.getItem('METHOD_NAME');
    const resourcePath = localStorage.getItem('resourcePath');

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.utils.hideLoader();
        let errorTitle = "";
        let errMsg = "";
        this.buttonAcept = this.utils.translate('BUTTON_OK');
        this.utils.error(className, methodName, JSON.stringify(error));
        this.utils.hideLoader();
        if (error instanceof TimeoutError) {
          errorTitle = this.utils.translate('NETWORK_ERROR');
          errMsg = this.utils.translate('ERR_LONG_REQUEST');
          this.utils.showBasicAlert(errorTitle, errMsg, this.buttonAcept);
        } else if (error) {
          if (error.status == 408 || error.status == 401) {
            errorTitle = this.utils.translate('ERR_LOGIN');
            errMsg = error.error.errors[0].errorMessage;
            this.utils.showBasicAlert(errorTitle, errMsg, this.buttonAcept);
          } else if (error.status == 404) {
            if (this.utils.isNull(error.error.errors)) {
              errorTitle = this.utils.translate('NETWORK_ERROR');
              errMsg = this.utils.translate('NETWORK_MESSAGE');
            } else {
              errMsg = error.error.errors[0].errorMessage;
            }
            this.utils.showBasicAlert(errorTitle, errMsg, this.buttonAcept);
            this.utils.createError(className, methodName, JSON.stringify(error), resourcePath, errorTitle, errMsg);
          } else if (error.status == 401) {
            // Error de autorización
            errorTitle = this.utils.translate('ERR_LOGIN');
            errMsg = this.utils.translate('SERVICE_UNAUTHORIZED', { _code: 401 });
            this.utils.showBasicAlert(errorTitle, errMsg, this.buttonAcept);
          } else if (error.status == 403) {
            // Error forbbiden
            errorTitle = this.utils.translate('ERR_FORBIDDEN');
            errMsg = this.utils.translate('SERVICE_FORBIDDEN', { _code: 403 });
            this.utils.showBasicAlert(errorTitle, errMsg, this.buttonAcept);
          } else if (error.status == 400) {
            // Error: falta de parámetros, tipos de datos no compatibles o validaciones erroneas.
            errorTitle = this.utils.translate('ERR_BAD_REQUEST');
            if (this.utils.isNull(error.error.errors)) {
              errMsg = this.utils.translate('ERR_BAD_REQUEST_MSG', { _code: 400, _msg: "" });
            } else {
              errMsg = this.utils.translate('ERR_BAD_REQUEST_MSG', { _code: 400, _msg: error.error.errors[0].errorMessage });
            }
            this.utils.createError(className, methodName, JSON.stringify(error), resourcePath, errorTitle, errMsg);
          }
          else if (error.status == 500) {
            // Error interno del servidor
            errorTitle = this.utils.translate('ERR_INTERNAL');
            if (this.utils.isNull(error.error.errors)) {
              errMsg = '';//this.utils.translate('ERR_INTERNAL_MSG', { _code: error.status, _msg: '' });
            } else {
              errMsg = error.error.errors[0].errorMessage;//this.utils.translate('ERR_INTERNAL_MSG', { _code: error.status, _msg: error.error.errors[0].errorMessage });
            }

            this.utils.createError(className, methodName, JSON.stringify(error), resourcePath, errorTitle, errMsg);
          } else if (error.status == 0) {
            if (this.utils.isNull(error.error.errors)) {
              errorTitle = this.utils.translate('NETWORK_ERROR');
              errMsg = this.utils.translate('NETWORK_MESSAGE');
            } else {
              errMsg = error.error.errors[0].errorMessage;
            }
            this.utils.showBasicAlert(errorTitle, errMsg, this.buttonAcept);
            this.utils.createError(className, methodName, JSON.stringify(error), resourcePath, errorTitle, errMsg);
          }
          else if (error.status == 1) {
            if (this.utils.isNull(error.error.errors)) {
              errorTitle = this.utils.translate('NETWORK_ERROR');
              errMsg = this.utils.translate('NETWORK_MESSAGE');
            } else {
              errMsg = error.error.errors[0].errorMessage;
            }
            this.utils.showBasicAlert(errorTitle, errMsg, this.buttonAcept);
            this.utils.createError(className, methodName, JSON.stringify(error), resourcePath, errorTitle, errMsg);
          }
        } else {
          // Error que no sabíamos que podía pasar.
          errMsg = this.utils.translate('ERR_UNEXPECTED');
          this.utils.createError(className, methodName, JSON.stringify(error), resourcePath, errorTitle, errMsg);
          this.utils.error(className, methodName, JSON.stringify(error));
        }

        return throwError(error);
      }));
  }
}