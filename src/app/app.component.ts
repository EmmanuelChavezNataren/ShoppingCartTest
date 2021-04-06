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
  isFirtsTimeOpenApp: boolean = false;
  @ViewChild(Nav) nav: Nav;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private translate: TranslateService,
    private utilities: UtilitiesProvider) {
    platform.ready().then(() => {
      platform.pause.subscribe(() => {
        if (this.utilities.isNull(localStorage.getItem('isFirtsTimeOpenApp'))) {
          this.isFirtsTimeOpenApp = true;          
        } else {
          this.isFirtsTimeOpenApp = false;
        }
        localStorage.clear();
        localStorage.setItem('isFirtsTimeOpenApp', String(this.isFirtsTimeOpenApp));
      });

      platform.registerBackButtonAction(() =>{
        if (this.utilities.isNull(localStorage.getItem('isFirtsTimeOpenApp'))) {
          this.isFirtsTimeOpenApp = true;          
        } else {
          this.isFirtsTimeOpenApp = false;
        }
        localStorage.clear();
        localStorage.setItem('isFirtsTimeOpenApp', String(this.isFirtsTimeOpenApp));
        return;
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();      
      splashScreen.hide();  
      this.initTranslate(null);
    });
  }

  /**
   * M&eacute;todo para inicializar idioma de la aplicaci&oacute;n
   * Valida si es primera vez abriendo la app para ejecutar tutorial
   * @param language Lenguaje a usar en la app
   */
  initTranslate(language: string) {
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
        this.isFirtsTimeOpenApp = true;
        localStorage.setItem('isFirtsTimeOpenApp', String(this.isFirtsTimeOpenApp));
      } else {
        this.isFirtsTimeOpenApp = false;
        localStorage.setItem('isFirtsTimeOpenApp', String(this.isFirtsTimeOpenApp));
      }

      if (this.isFirtsTimeOpenApp) {
        this.nav.setRoot(this.rootPage);
      } else {
        this.nav.setRoot('TabsPage');
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
