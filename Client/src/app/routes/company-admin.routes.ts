import { Routes } from '@angular/router';

import { ManageRolesComponent } from '../components/manage-roles/manage-roles.component';
import { NewJobComponent } from '../components/new-job/new-job.component';
import { JobOfferListComponent } from '../components/job-offer-list/job-offer-list.component';
import { NewJobUploadedComponent } from '../components/new-job-uploaded/new-job-uploaded.component';


export const caRoutes: Routes = [
  { path: '', redirectTo: 'jobOfferList', pathMatch: 'full' },
  { path: 'ManageRoles', component: ManageRolesComponent },
  { path: 'jobOfferList', component: JobOfferListComponent },
  { path: 'jobOfferList/newJob', component: NewJobComponent },
  { path: 'jobOfferList/updateJobDetails', component: NewJobComponent },
  { path: 'jobOfferList/Uploaded', component: NewJobUploadedComponent}
];