import { Routes } from '@angular/router';

import { ManageRolesComponent } from '../components/manage-roles/manage-roles.component';
import { NewJobComponent, NewJobUploadedComponent } from '../components/new-job/new-job.component';
import { JobOfferListComponent } from '../components/job-offer-list/job-offer-list.component';
import { CompanyProfileEditComponent } from '../components/company-profile-edit/company-profile-edit.component';
import { RoleProfileEditComponent } from '../components/role-profile-edit/role-profile-edit.component';
import { HrManagerApplicationListingComponent } from '../components/hr-manager-application-listing/hr-manager-application-listing.component';

export const caRoutes: Routes = [
  { path: '', redirectTo: 'jobOfferList', pathMatch: 'full' },
  { path: 'manageRoles', component: ManageRolesComponent },
  { path: 'jobOfferList', component: JobOfferListComponent },
  { path: 'jobOfferList/newJob', component: NewJobComponent },
  { path: 'jobOfferList/updateJobDetails', component: NewJobComponent },
  { path: 'jobOfferList/Uploaded', component: NewJobUploadedComponent},
  { path: 'jobOfferList/applicationList', component: HrManagerApplicationListingComponent },
  { path: 'companyProfile', component: CompanyProfileEditComponent },
  { path: 'editRoleProfile', component: RoleProfileEditComponent },
];