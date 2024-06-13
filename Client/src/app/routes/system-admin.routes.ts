import { Routes } from '@angular/router';
import { CompanyApplicationComponent } from '../components/company-application/company-application.component';
import { CompanyApplicationListComponent } from '../components/company-application-list/company-application-list.component';
import { SystemAdminDashboardComponent } from '../components/system-admin-dashboard/system-admin-dashboard.component';

export const saRoutes: Routes = [
  { path: '', redirectTo: 'admin-dashboard', pathMatch: 'full' },
  
  { path: 'company-application', component: CompanyApplicationListComponent },
  { path: 'company-application/:id', component: CompanyApplicationComponent },
  { path: 'admin-dashboard', component: SystemAdminDashboardComponent}
];
