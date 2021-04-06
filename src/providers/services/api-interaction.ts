import { Injectable } from '@angular/core';
import { Colors } from '../../dto/colors-dto';
import { Cart } from '../../dto/request-response/cart-dto';
import { Product, ProductData } from '../../dto/request-response/product-dto';
import { User } from '../../dto/request-response/user-dto';
import { ConstantsProvider } from '../constants/constants';
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
  readonly CLASS_NAME = "ApiInteractionProvider";
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

  /**
 * M&eacute;todo que se encarga de agregar un producto al carrito de compras
 * @param product Objecto de tipo ProductData Que tiene la informaci&oacute;n del producto a agregar
 */
  addCart(product: ProductData, colorSelected?: string): Promise<Cart> {
    return new Promise<Cart>((resolve, reject) => {
      let shoppingCartList: Cart = new Cart();
      this.utilities.showMessage(
        "Producto agregado correctamente",
        this.utilities.translate("ADD_CART_MESSAGE"),
        "7000"
      );

      if (!this.utilities.isNull(localStorage.getItem('shoppingCartList'))) {
        shoppingCartList = JSON.parse(localStorage.getItem('shoppingCartList'));

        this.validateSelectedColor(product, colorSelected, () => {
          shoppingCartList = this.validateAddCart(product, shoppingCartList);
          resolve(shoppingCartList);
        });

      } else {
        this.utilities.showLoader(ConstantsProvider.DEFAULT_MESSAGE_LOADING, this.utilities.translate('LOADING_MESSAGE'));
        this.getShoppingCart().then((response: Cart) => {
          shoppingCartList = response;
          this.validateSelectedColor(product, colorSelected, () => {
            shoppingCartList = this.validateAddCart(product, shoppingCartList);
            resolve(shoppingCartList);
            this.utilities.hideLoader();
          });
        }).catch(error => {
          this.utilities.hideLoader(() => {
            console.error(error);
          });
        });
      }
    });


  }

  private validateSelectedColor(product: ProductData, colorSelected?: string, onSuccess?: any) {
    if (!this.utilities.isNull(colorSelected)) {
      const colorFilter = product.colors.find((_findColor: Colors) => { return _findColor.name == colorSelected });
      if (!this.utilities.isNull(colorFilter)) {
        product.color = colorFilter;
        if (onSuccess) onSuccess();
      }
    } else {
      product.color = product.colors[0];
      if (onSuccess) onSuccess();
    }
  }

  private validateAddCart(product: ProductData, shoppingCartList: Cart): Cart {
    shoppingCartList.data.products.push(product);
    return shoppingCartList;
  }
}
