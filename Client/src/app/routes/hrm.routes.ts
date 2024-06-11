import { Routes } from '@angular/router';

import { JobOfferListComponent } from '../components/job-offer-list/job-offer-list.component';
import { RoleProfileEditComponent } from '../components/role-profile-edit/role-profile-edit.component';
import { HrManagerApplicationListingComponent } from '../components/hr-manager-application-listing/hr-manager-application-listing.component';
import { NewJobComponent, NewJobUploadedComponent } from '../components/new-job/new-job.component';
import { HrmanagerApplicationViewComponent } from '../components/hrmanager-application-view/hrmanager-application-view.component';
import { SeekerProfileViewComponent } from '../components/seeker-profile-view/seeker-profile-view.component';

export const hrmRoutes: Routes = [
  { path: '', redirectTo: 'jobOfferList', pathMatch: 'full' },

  { path: 'jobOfferList', component: JobOfferListComponent },
  { path: 'editRoleProfile', component: RoleProfileEditComponent },
  { path: 'jobOfferList/newJob', component: NewJobComponent },
  { path: 'jobOfferList/updateJobDetails', component: NewJobComponent },
  { path: 'jobOfferList/Uploaded', component: NewJobUploadedComponent},
  { path: 'jobOfferList/applicationList', component: HrManagerApplicationListingComponent },
  { path: 'jobOfferList/applicationList/applicationView', component: HrmanagerApplicationViewComponent },
  { path: 'seekerProfileView', component: SeekerProfileViewComponent }
];