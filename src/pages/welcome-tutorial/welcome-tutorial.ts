import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { ConstantsProvider } from '../../providers/constants/constants';
import { UtilitiesProvider } from '../../providers/utilities/utilities';

/**
 * Generated class for the WelcomeTutorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome-tutorial',
  templateUrl: 'welcome-tutorial.html',
})
export class WelcomeTutorialPage {
  readonly CLASS_NAME: "WelcomeTutorialPage";
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public component: MyApp,
    private utilities: UtilitiesProvider) {

  }

  ionViewDidLoad() {
    this.es();
  }

  /**
   * M&eacute;todo para configurar el idioma en español.
   */
  es() {
    localStorage.setItem("idiomText", "English");
    this.component.initTranslate('es');
  }

  /**
 * M&eacute;todo para configurar el idioma en iglés.
 */
  en() {
    localStorage.setItem("idiomText", "Español");
    this.component.initTranslate('en');
  }

  /**
   * M&eacute;todo que ejecuta el inicio de la app de carrito de compras
   */
  executeStart() {
    this.utilities.networkStatus(() => {
      this.utilities.showLoader(ConstantsProvider.DEFAULT_MESSAGE_LOADING, this.utilities.translate('LOADING_MESSAGE'));
      this.navCtrl.setRoot('TabsPage');
    })
    
  }

}
