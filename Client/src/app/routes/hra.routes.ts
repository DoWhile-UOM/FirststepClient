import { Routes } from '@angular/router';

import { HrassistantJobOfferListComponent } from '../components/hrassistant-job-offer-list/hrassistant-job-offer-list.component';
import { RoleProfileEditComponent } from '../components/role-profile-edit/role-profile-edit.component';

export const hraRoutes: Routes = [
  { path: '', redirectTo: 'jobOfferList', pathMatch: 'full' },

  { path: 'jobOfferList', component: HrassistantJobOfferListComponent },
  { path: 'editRoleProfile', component: RoleProfileEditComponent },
];