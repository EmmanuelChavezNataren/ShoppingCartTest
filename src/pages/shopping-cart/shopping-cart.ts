import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Cart } from '../../dto/request-response/cart-dto';
import { ProductData } from '../../dto/request-response/product-dto';
import { ConstantsProvider } from '../../providers/constants/constants';
import { ApiInteractionProvider } from '../../providers/services/api-interaction';
import { UtilitiesProvider } from '../../providers/utilities/utilities';

/**
 * Generated class for the ShoppingCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage {
  readonly CLASS_NAME = 'ShoppingCartPage';
  public shoppingCartList: Cart = new Cart();
  public isOpenInfoPayment: boolean = true;
  public subtotal: number = 0;
  public shipping: number = 0;
  public discount: number = 0;
  public total: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private api: ApiInteractionProvider,
    private utilities: UtilitiesProvider) {
  }


  ionViewWillEnter() {
    localStorage.setItem('CLASS_NAME', this.CLASS_NAME);
    if (!this.utilities.isNull(localStorage.getItem('shoppingCartList'))) {
      this.shoppingCartList = JSON.parse(localStorage.getItem('shoppingCartList'));
      this.calculateAmounts();
    } else {
      this.init();
    }
    this.isOpenInfoPayment = true;
  }

  ionViewDidLeave() {
    this.utilities.hideLoader();
  }


  async init() {
    let promises: any = [
      this.api.getShoppingCart()
    ];
    try {
      let results = await Promise.all(promises);
      this.shoppingCartList = results[0] as Cart;
      localStorage.setItem('shoppingCartList', JSON.stringify(this.shoppingCartList));
      this.calculateAmounts();
    } catch (_err) {
      this.utilities.hideLoader(() => {
        console.error(_err);
      });
    }

  }

  /**
   * M&eacute;todo que realiza los calculos correspondientes al pago
   * Con base a los productos agregados al carrito
   * Subtotal: Suma de todos los precios de los productos
   * Shipping: Costo del envio por cada 500 se suman 25 al envio
   * Discount: Descuento que se realiza al costo total
   * Total: Pago total aplicando el descuento
   */
  calculateAmounts() {
    this.subtotal = 0;
    this.shipping = 0;
    this.discount = 0;
    this.total = 0;
    this.shoppingCartList.data.products.forEach((product: ProductData) => {
      this.subtotal = this.subtotal + +product.product_price;
      if(!this.utilities.isNull(product.discount) && +product.discount > 0){
        this.discount = this.discount + +product.discount;
      }      
    });
    let subtotalCalShipping: number = Math.trunc((this.subtotal / 500));
    this.shipping = 25 * subtotalCalShipping;
    this.total = (this.subtotal + this.shipping) - this.discount;        

  }

  /**
   * Establece el valor a la bandera de isOpenInfoPayment
   * @param isOpenInfoPayment 
   */
  setIsOpenInfoPayment(isOpenInfoPayment: boolean){
    this.isOpenInfoPayment = isOpenInfoPayment;
  }

  /**
   * M&eacute;todo que elimina un producto de la lista del carrito de compras
   * @param index indice a eliminar
   */
  deleteProduct(index: number){
    this.utilities.confirmAlert(
      this.utilities.translate('CONFIRM_TITLE'),
      this.utilities.translate('CONFIRM_MESSAGE_DEL'),
       () => {
        this.utilities.showLoader(ConstantsProvider.DEFAULT_MESSAGE_LOADING, this.utilities.translate('LOADING_MESSAGE'));                
        this.shoppingCartList.data.products.splice(index, 1);
        console.log("this.shoppingCartList " + JSON.stringify(this.shoppingCartList));
        localStorage.setItem('shoppingCartList', JSON.stringify(this.shoppingCartList));
        this.calculateAmounts();  
        this.utilities.hideLoader();               
      }
    );

  }

}
