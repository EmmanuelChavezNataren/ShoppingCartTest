import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ProductData } from '../../dto/request-response/product-dto';

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail-modal',
  templateUrl: 'product-detail-modal.html',
})
export class ProductDetailModalPage {
  readonly CLASS_NAME= 'ProductDetailModalPage';
  public product: ProductData = new ProductData();
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController) {

    localStorage.setItem('CLASS_NAME', this.CLASS_NAME);
    this.product = this.navParams.get('selectedProduct');
    console.log('product ' + JSON.stringify(this.product));
  }

  ionViewDidLeave(){
    
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
