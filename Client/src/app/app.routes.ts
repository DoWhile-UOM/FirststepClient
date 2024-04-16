import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegCmpStateCheckComponent } from './components/reg-cmp-state-check/reg-cmp-state-check.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'RegCheck',component:RegCmpStateCheckComponent},
  
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
  {
    path: 'sa',
    loadChildren: () => import('./routes/system-admin.routes').then(m => m.saRoutes),
    // example link: http://localhost:4200/sa/applicationList
  },

  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
  { path: 'notfound', component: PageNotFoundComponent}
];