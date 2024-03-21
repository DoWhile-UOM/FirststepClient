import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }
  
}
