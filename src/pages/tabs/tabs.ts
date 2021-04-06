import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Tab, Tabs } from 'ionic-angular';
import { ConstantsProvider } from '../../providers/constants/constants';
import { UtilitiesProvider } from '../../providers/utilities/utilities';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('tabsShoppingCart') tabsShoppingCart: Tabs;
  home = 'HomePage';
  filter = 'FilterBrandsPage';
  shoppingCart = 'ShoppingCartPage';

  public tabIndex: number = 0;
  

  constructor(private utilities: UtilitiesProvider,
    public navCtrl: NavController) {
      
  }

  ionViewDidLoad(){
   this.utilities.hideLoader();
  }

  rootShoppingCart(selectedIndex: number){
    this.tabIndex = selectedIndex;
    this.tabsShoppingCart.select(selectedIndex, {}, false);
    this.utilities.showLoader(ConstantsProvider.DEFAULT_MESSAGE_LOADING, this.utilities.translate('LOADING_MESSAGE'));
  }
}
