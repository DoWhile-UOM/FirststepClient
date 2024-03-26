import { Routes } from '@angular/router';

import { ManageRolesComponent } from '../components/manage-roles/manage-roles.component';
import { NewJobComponent } from '../components/new-job/new-job.component';
import { JobOfferListComponent } from '../components/job-offer-list/job-offer-list.component';
import { AdminDashboardComponent } from '../components/admin-dashboard/admin-dashboard.component';
import { HrAssistantApplicationListingComponent } from '../components/hr-assistant-application-listing/hr-assistant-application-listing.component';


export const caRoutes: Routes = [
  { path: '', redirectTo: 'jobOfferList', pathMatch: 'full' },
  { path: 'ManageRoles', component: ManageRolesComponent },
  { path: 'jobOfferList', component: JobOfferListComponent },
  { path: 'jobOfferList/newJob', component: NewJobComponent },
  { path: 'jobOfferList/updateJobDetails', component: NewJobComponent },
  { path: 'adminDashboard', component: AdminDashboardComponent},
  { path: 'hrAssistantApplicationListing', component: HrAssistantApplicationListingComponent},

];