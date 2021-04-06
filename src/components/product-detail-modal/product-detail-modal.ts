import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Cart } from '../../dto/request-response/cart-dto';
import { ProductData } from '../../dto/request-response/product-dto';
import { ApiInteractionProvider } from '../../providers/services/api-interaction';
import { UtilitiesProvider } from '../../providers/utilities/utilities';

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
  public shoppingCartList: Cart = new Cart();
  public colorSelected: string = '';
  public isBigPicture: boolean = false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    public utilities: UtilitiesProvider,
    public api: ApiInteractionProvider) {

    localStorage.setItem('CLASS_NAME', this.CLASS_NAME);
    this.product = this.navParams.get('selectedProduct');
    //this.getDimensionsProdImg();

    if(!this.utilities.isNull(localStorage.getItem('shoppingCartList'))){
      this.shoppingCartList = JSON.parse(localStorage.getItem('shoppingCartList'));      
    }
  }

  ionViewDidLeave(){
    
  }


  /**
   * M&eacute;todo que actualiza la bandera de favoritos
   * @param isFavorite Bandera {true} or {false} si el producto es favorito
   */
  addFavorite(isFavorite: boolean){
    if(isFavorite){
      this.product.is_favorite = false;
    }else{
      this.product.is_favorite = true;
    }
  }

  /**
 * M&eacute;todo que se encarga de agregar un producto al carrito de compras
 * @param product Objecto de tipo ProductData Que tiene la informaci&oacute;n del producto a agregar
 * @param colorSelected Color seleccionado, campo opcional si viene vacio
 * toma el color de la posici&oacute;n [0] del Array de tipo Colors
 */
  addToCart(product: ProductData, colorSelected?: string){
    this.api.addCart(product, colorSelected).then((shoppingCart: Cart) => {
      this.shoppingCartList = shoppingCart;
      localStorage.setItem('shoppingCartList', JSON.stringify(this.shoppingCartList));
    });
  }

  /**
   * M&eacute;todo que cierra el modal controller
   */
  closeModal(){
    this.viewCtrl.dismiss();
  }

  /**
   * M&eacute;todo que establece el color selecionado a la variable colorSelected
   * @param colorName Color seleccionado
   */
  onColorChange(colorName: string){
    this.colorSelected = colorName;
  }

  getDimensionsProdImg(){    
    this.utilities.convertToDataURLviaCanvas(this.product.product_image, "image/png").then(
      base64 => {
        console.log(base64);
      }
      );
  }

}
