import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServicesProvider } from '../providers/services/services';
import { ResourcesProvider } from '../providers/constants/resources';
import { ConstantsProvider } from '../providers/constants/constants';
import { UtilitiesProvider } from '../providers/utilities/utilities';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { registerLocaleData } from '@angular/common';
import es_MX from '@angular/common/locales/es-MX';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Network } from '@ionic-native/network';
import { Toast } from '@ionic-native/toast';
import { File } from '@ionic-native/file';
import { EmailComposer } from '@ionic-native/email-composer';
import { ApiInteractionProvider } from '../providers/services/api-interaction';
import { StarRatingModule }  from 'ionic3-star-rating';

registerLocaleData(es_MX);

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,    
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    StarRatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-MX' },
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesProvider,
    ResourcesProvider,
    UtilitiesProvider,
    ConstantsProvider,
    ApiInteractionProvider,
    Network,
    Toast,
    File,
    EmailComposer
  ]
})
export class AppModule {}
