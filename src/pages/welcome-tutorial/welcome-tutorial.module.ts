import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomeTutorialPage } from './welcome-tutorial';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    WelcomeTutorialPage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomeTutorialPage),
    TranslateModule.forChild()
  ],
})
export class WelcomeTutorialPageModule {}
