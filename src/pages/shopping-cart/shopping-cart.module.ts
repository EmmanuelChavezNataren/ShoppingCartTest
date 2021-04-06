import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingCartPage } from './shopping-cart';

@NgModule({
  declarations: [
    ShoppingCartPage,
  ],
  imports: [
    IonicPageModule.forChild(ShoppingCartPage),
    TranslateModule.forChild(),  
  ],
})
export class ShoppingCartPageModule {}
