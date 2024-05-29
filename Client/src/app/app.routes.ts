import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegCmpStateCheckComponent } from './components/reg-cmp-state-check/reg-cmp-state-check.component';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';
import { CompanyAdminRegistrtionFormComponent } from './components/company-admin-registrtion-form/company-admin-registrtion-form.component';
import { SeekerSignupComponent } from './components/seeker-signup/seeker-signup.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { EmailVerificationBoxComponent } from './components/email-verification-box/email-verification-box.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  { path: 'home', component: LandingPageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SeekerSignupComponent },
  { path: 'CompanyReg', component: RegisterCompanyComponent },
  { path: 'RegCheck', component: RegCmpStateCheckComponent },
  { path: 'RegCompanyAdmin', component: CompanyAdminRegistrtionFormComponent },
  { path: 'emailVerification', component: EmailVerificationBoxComponent },
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
  { path: 'notfound', component: PageNotFoundComponent }
];