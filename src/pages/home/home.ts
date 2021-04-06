import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Cart } from '../../dto/request-response/cart-dto';
import { Product } from '../../dto/request-response/product-dto';
import { User } from '../../dto/request-response/user-dto';
import { ConstantsProvider } from '../../providers/constants/constants';
import { ApiInteractionProvider } from '../../providers/services/api-interaction';
import { ServicesProvider } from '../../providers/services/services';
import { UtilitiesProvider } from '../../providers/utilities/utilities';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  readonly CLASS_NAME: "HomePage";
  public userData: User = new User();
  public productsList: Product = new Product();
  public shoppingCartList: Cart = new Cart();

  constructor(public navCtrl: NavController,
    private services: ServicesProvider,
    private utilities: UtilitiesProvider,
    private api: ApiInteractionProvider
  ) {
  }

  ionViewWillEnter() {
    localStorage.setItem('CLASS_NAME', this.CLASS_NAME);
    if (!this.utilities.isNull(localStorage.getItem('shoppingCartList'))) {
      this.shoppingCartList = JSON.parse(localStorage.getItem('shoppingCartList'));
    }

    this.init();
  }

  ionViewDidLeave() {
    this.utilities.hideLoader();
  }

  async init() {
    this.utilities.showLoader(ConstantsProvider.DEFAULT_MESSAGE_LOADING, this.utilities.translate('LOADING_MESSAGE'));
    let promises: any = [
      this.api.getUserProfile(),
      this.api.getAllProducts()
    ];

    try {
      let results = await Promise.all(promises);
      this.userData = results[0] as User;
      this.productsList = results[1] as Product;
      this.utilities.hideLoader();
    } catch (_err) {
      this.utilities.hideLoader(() => {
        console.error(_err);
      });
    }

  }

}
