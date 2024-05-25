import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegCmpStateCheckComponent } from './components/reg-cmp-state-check/reg-cmp-state-check.component';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';
import { CompanyAdminRegistrtionFormComponent } from './components/company-admin-registrtion-form/company-admin-registrtion-form.component';
import { SeekerSignupComponent } from './components/seeker-signup/seeker-signup.component';
import { HrmanagerApplicationViewComponent } from './components/hrmanager-application-view/hrmanager-application-view.component';
import { HrassistantApplicationViewComponent } from './components/hrassistant-application-view/hrassistant-application-view.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SeekerSignupComponent },
  { path: 'CompanyReg', component: RegisterCompanyComponent },
  { path: 'RegCheck', component: RegCmpStateCheckComponent },
  { path: 'RegCompanyAdmin', component: CompanyAdminRegistrtionFormComponent },
  { path: 'hrmanager-view', component: HrmanagerApplicationViewComponent },
  { path: 'hrassistant-view', component: HrassistantApplicationViewComponent },
  {
    path: 'ca',
    loadChildren: () => import('./routes/company-admin.routes').then(m => m.caRoutes),
  },
  {
    path: 'seeker',
    loadChildren: () => import('./routes/seeker.routes').then(m => m.routes),
  },
  {
    path: 'sa',
    loadChildren: () => import('./routes/system-admin.routes').then(m => m.saRoutes),
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
  { path: 'notfound', component: PageNotFoundComponent }
];
