import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { SignupComponent } from './signup/signup.component';


export const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  
  {
    path: 'company/admin',
    loadChildren: () => import('./portals/company-admin-portal/company-admin.module').then(m => m.caRoutes),
    // example link: http://localhost:4200/company/admin/jobOfferList
  },

  {
    path: 'seeker',
    loadChildren: () => import('./portals/seeker-portal/seeker.module').then(m => m.seekerRoutes),
    // example link: http://localhost:4200/seeker/home
  },
];
