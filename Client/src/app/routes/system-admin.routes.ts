import { Routes } from '@angular/router';
import { CompanyApplicationComponent } from '../components/company-application/company-application.component';
import { CompanyApplicationListComponent } from '../components/company-application-list/company-application-list.component';

export const saRoutes: Routes = [
  { path: '', redirectTo: 'company-application', pathMatch: 'full' },
  { path: 'company-application', component: CompanyApplicationListComponent },
  { path: 'company-application/:id', component: CompanyApplicationComponent },
];
