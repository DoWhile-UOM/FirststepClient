import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  
  {
    path: 'ca',
    loadChildren: () => import('./routes/company-admin.routes').then(m => m.caRoutes),
    // example link: http://localhost:4200/ca/jobOfferList
  },

  {
    path: 'seeker',
    loadChildren: () => import('./routes/seeker.routes').then(m => m.routes),
    // example link: http://localhost:4200/seeker/home
  },
];
