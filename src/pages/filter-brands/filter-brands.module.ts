import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterBrandsPage } from './filter-brands';

@NgModule({
  declarations: [
    FilterBrandsPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterBrandsPage),
  ],
})
export class FilterBrandsPageModule {}
