import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Product, ProductData } from '../../dto/request-response/product-dto';
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

  constructor(private utilities: UtilitiesProvider,
    public navCtrl: NavController) {
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


  openAddCart(index: number){

  }

}
