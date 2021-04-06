import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { UtilitiesProvider } from '../providers/utilities/utilities';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'WelcomeTutorialPage';
  @ViewChild(Nav) nav: Nav;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private translate: TranslateService,
    private utilities: UtilitiesProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();      
      splashScreen.hide();  
      localStorage.clear();    
      this.initTranslate(null);
    });
  }

  /**
   * M&eacute;todo para inicializar idioma de la aplicaci&oacute;n
   * Valida si es primera vez abriendo la app para ejecutar tutorial
   * @param language Lenguaje a usar en la app
   */
  initTranslate(language: string) {
    let isFirtsTimeOpenApp: boolean = false;
    if(language == null){
      if (this.utilities.isNull(localStorage.getItem('language'))) {
        language = 'es';
        localStorage.setItem('language', language);
        localStorage.setItem('locale', 'es-MX');
        localStorage.setItem('idiomText', 'English');
      } else {
        language = localStorage.getItem('language');
      }

      if (this.utilities.isNull(localStorage.getItem('isFirtsTimeOpenApp'))) {
        isFirtsTimeOpenApp = true;
        localStorage.setItem('isFirtsTimeOpenApp', String(isFirtsTimeOpenApp));
      } else {
        isFirtsTimeOpenApp = false;
        localStorage.setItem('isFirtsTimeOpenApp', String(isFirtsTimeOpenApp));
      }

      if (isFirtsTimeOpenApp) {
        this.nav.setRoot(this.rootPage);
      } else {
        this.nav.setRoot('HomePage');
      }
      
    }
      
    if (language == 'es') {
      localStorage.setItem('locale', 'es-MX');
    } else {
      localStorage.setItem('locale', 'en-US');
    }

    this.translate.use(language); // Se define lenguaje  

  }
}
