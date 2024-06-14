import { Routes } from '@angular/router';

import { HrassistantJobOfferListComponent } from '../components/hrassistant-job-offer-list/hrassistant-job-offer-list.component';
import { RoleProfileEditComponent } from '../components/role-profile-edit/role-profile-edit.component';
import { HrManagerApplicationListingComponent } from '../components/hr-manager-application-listing/hr-manager-application-listing.component';
import { HrmanagerApplicationViewComponent } from '../components/hrmanager-application-view/hrmanager-application-view.component';
import { SeekerProfileViewComponent } from '../components/seeker-profile-view/seeker-profile-view.component';

export const hraRoutes: Routes = [
  { path: '', redirectTo: 'jobOfferList', pathMatch: 'full' },

  { path: 'jobOfferList', component: HrassistantJobOfferListComponent },
  { path: 'editRoleProfile', component: RoleProfileEditComponent },
  { path: 'jobOfferList/applicationList', component: HrManagerApplicationListingComponent },
  { path: 'jobOfferList/applicationList/applicationView', component: HrmanagerApplicationViewComponent },
  { path: 'profile-view', component: SeekerProfileViewComponent }
];