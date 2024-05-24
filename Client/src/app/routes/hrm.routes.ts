import { Routes } from '@angular/router';

import { JobOfferListComponent } from '../components/job-offer-list/job-offer-list.component';
import { RoleProfileEditComponent } from '../components/role-profile-edit/role-profile-edit.component';

export const hrmRoutes: Routes = [
  { path: '', redirectTo: 'jobOfferList', pathMatch: 'full' },

  { path: 'jobOfferList', component: JobOfferListComponent },
  { path: 'editRoleProfile', component: RoleProfileEditComponent },
];