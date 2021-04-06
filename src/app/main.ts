import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { LOCALE_ID } from '@angular/core';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule, {
    providers: [{ provide: LOCALE_ID, useValue: 'en-MX' }]
});
