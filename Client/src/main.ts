import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
registerLicense('Ngo9BigBOggjHTQxAR8/V1NAaF1cWmhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEFjW31acXBWQmBaVEV3Xg==');


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
  
