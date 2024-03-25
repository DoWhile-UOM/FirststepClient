import { Routes } from '@angular/router';

import { CompanyApplicationListComponent } from '../SystemAdminPortal/company-application-list/company-application-list.component';


export const saRoutes: Routes = [
  { path: '', redirectTo: 'applicationList', pathMatch: 'full' },
  { path: 'applicationList', component: CompanyApplicationListComponent },
];