import { Injectable } from '@angular/core';
import { Cart } from '../../dto/request-response/cart-dto';
import { Product } from '../../dto/request-response/product-dto';
import { User } from '../../dto/request-response/user-dto';
import { ResourcesProvider } from '../constants/resources';
import { UtilitiesProvider } from '../utilities/utilities';
import { ServicesProvider } from './services';

/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
/**
 * Clase que obtiene el consumo a los m&eacute;todos de la api
 * @author Emmanuel Ch&aacute;vez
 */
@Injectable()
export class ApiInteractionProvider {
readonly CLASS_NAME= "ApiInteractionProvider";
    constructor(private utilities: UtilitiesProvider,
        private services: ServicesProvider) {    
    }

     /**
   * M&eacute;todo que obtienene la informaci&oaute;n del perfil de usuario mediante una API.
   * @returns Regresa una promesa con el objeto del perfil del usuario
   */
  getUserProfile(): Promise<User> {
    const METHOD_NAME = "getUserProfile";
    localStorage.setItem('METHOD_NAME', METHOD_NAME);
    return new Promise<User>((resolve, reject) => {
      this.utilities.networkStatus(() => {
        this.services.doGet(ResourcesProvider.user_profile, null).subscribe(
          response => {
            console.info("Response User Data " + JSON.stringify(response));
            resolve(response);
          },
          error => {
            this.utilities.hideLoader(() => {
              this.utilities.error(this.CLASS_NAME, METHOD_NAME, JSON.stringify(error));
            });
            reject(null);
          }
        );
      });
    });
  }

  /**
   * M&eacute;todo que consutla todo el catalogo de los productos por medio de una API
   * @returns Regresa una promesa con el objeto del catalogo de todos los productso
   */
  getAllProducts(): Promise<Product> {
    const METHOD_NAME = "getAllProducts";
    localStorage.setItem('METHOD_NAME', METHOD_NAME);
    return new Promise<Product>((resolve, reject) => {
      this.utilities.networkStatus(() => {
        this.services.doGet(ResourcesProvider.all_products, null).subscribe(
          response => {            
            console.info("Response All Product " + JSON.stringify(response));
            resolve(response);
          },
          error => {
            this.utilities.hideLoader(() => {
              this.utilities.error(this.CLASS_NAME, METHOD_NAME, JSON.stringify(error));
            });
            reject(null);
          }
        );
      });
    });
  }

  getShoppingCart(): Promise<Cart> {
    const METHOD_NAME = "getShoppingCart";
    localStorage.setItem('METHOD_NAME', METHOD_NAME);
    return new Promise<Cart>((resolve, reject) => {
        this.utilities.networkStatus(() => {
            this.services.doGet(ResourcesProvider.shopping_cart, null).subscribe(
                response => {
                    console.info("Response Shopping Cart Data " + JSON.stringify(response));
                    resolve(response);
                },
                error => {
                    this.utilities.hideLoader(() => {
                        this.utilities.error(this.CLASS_NAME, METHOD_NAME, JSON.stringify(error));
                      });
                      reject(null);
                }
            )
        });
    });
  }
}
