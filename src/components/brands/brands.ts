import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { timestamp } from 'rxjs/operators';
import { Cart } from '../../dto/request-response/cart-dto';
import { Product, ProductData } from '../../dto/request-response/product-dto';
import { ApiInteractionProvider } from '../../providers/services/api-interaction';
import { UtilitiesProvider } from '../../providers/utilities/utilities';

/**
 * Generated class for the BrandsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'brands',
  templateUrl: 'brands.html'
})
export class BrandsComponent {
  readonly CLASS_NAME = 'BrandsComponent';

  @Input()
  productsList: Product;

  @Input()
  isPageHome: boolean;

  @Input()
  isOpenAddCartList: Array<boolean> =  new Array<boolean>();

  constructor(private utilities: UtilitiesProvider,
    public navCtrl: NavController,
    public api: ApiInteractionProvider) {
    localStorage.setItem('CLASS_NAME', this.CLASS_NAME);
    console.log('Hello BrandsComponent Component');
  }

  
  /**
   * M&eacute;todo que agrega el producto a favoritos
   * @param isFavorite Variable de entrada tipo boolean que indica si el producto esta en favoritos o no
   * @param index indice del la lista de productos
   */
   addFavorite(isFavorite: boolean, index: number){
    if(!this.utilities.isNull(isFavorite)){
      if(isFavorite){
        this.productsList.data[index].is_favorite = false;
      }else{
        this.productsList.data[index].is_favorite = true;
      }
    }
  }

  getProductDetail(selectedProduct: ProductData){
    this.utilities.createModal('ProductDetailModalPage',
      {selectedProduct: selectedProduct },
      (data: any) => {

      },
      { cssClass: 'modal-fullscreen' }
    );
  }

  /**
   * M&eacute;todo que establece el valor de la bandera de isOpenAddCart
   * @param index Indice de la lista de productos seleccionado
   */
  setIsOpenAddCart(index: number){
    if(this.isOpenAddCartList[index]){
      this.isOpenAddCartList[index] = false;
    }else{
      this.isOpenAddCartList[index] = true;
    }
  }

  /**
 * M&eacute;todo que se encarga de agregar un producto al carrito de compras
 * @param product Objecto de tipo ProductData Que tiene la informaci&oacute;n del producto a agregar
 * @param index Indice seleccionado de la lista de productos
 * @param colorSelected Color seleccionado, campo opcional si viene vacio
 * toma el color de la posici&oacute;n [0] del Array de tipo Colors
 */
  addToCart(product: ProductData, index: number,  colorSelected?: string){
    this.api.addCart(product, colorSelected).then((shoppingCart: Cart) => {
      localStorage.setItem('shoppingCartList', JSON.stringify(shoppingCart));      
    });
    this.setIsOpenAddCart(index);
  }

}
