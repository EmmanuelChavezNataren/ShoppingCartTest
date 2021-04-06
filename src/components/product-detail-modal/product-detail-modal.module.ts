import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { StarRatingModule } from 'ionic3-star-rating';
import { ProductDetailModalPage } from './product-detail-modal';

@NgModule({
  declarations: [
    ProductDetailModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductDetailModalPage),
    TranslateModule.forChild(),
    StarRatingModule
  ],
})
export class ProductDetailModalPageModule {}
