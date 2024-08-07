import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch())
    ,provideRouter(routes), 
    provideClientHydration(),
     provideAnimations(),
     importProvidersFrom(HttpClientModule),
     {provide:HTTP_INTERCEPTORS,useClass:tokenInterceptor,multi:true
    }]
 
};
