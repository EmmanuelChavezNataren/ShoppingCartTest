import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ConstantsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConstantsProvider {
  static readonly LOG_FILE="ShoppingCartTestLog.txt";
  static readonly DEFAULT_MESSAGE_LOADING = "Cargando por favor espere...";

  constructor(public http: HttpClient) {
  }

}
