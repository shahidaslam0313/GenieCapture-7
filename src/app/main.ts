import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import {enableProdMode} from '@angular/core';
import { environment } from '../environments/environment';

if (environment.production) {
    enableProdMode();
    if(window){
      window.console.log=function(){};
      window.console.error = function(){};
    }
  }
platformBrowserDynamic().bootstrapModule(AppModule);


