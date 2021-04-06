import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Cart } from '../../dto/request-response/cart-dto';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private api: ApiInteractionProvider,
    private utilities: UtilitiesProvider) {  
      localStorage.setItem('CLASS_NAME', this.CLASS_NAME);
      this.init();  
  }

  ionViewDidLeave(){
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
      console.log('this.shoppingCartList ' + JSON.stringify(this.shoppingCartList));            
    } catch (_err) {
      this.utilities.hideLoader(() => {
        console.error(_err);
      });      
    }

  }

}
