import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';
import { BrandsComponent } from './brands/brands';
import { StarRatingModule } from 'ionic3-star-rating'
@NgModule({
	declarations: [BrandsComponent],
	imports: [
		IonicModule,
		TranslateModule.forChild(),
		StarRatingModule
	],
	exports: [BrandsComponent]
})
export class ComponentsModule {}
