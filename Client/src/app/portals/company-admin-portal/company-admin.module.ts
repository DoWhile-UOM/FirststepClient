import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

import { ManageRolesComponent } from '../../components/manage-roles/manage-roles.component';
import { NewJobComponent } from '../../components/new-job/new-job.component';
import { JobOfferListComponent } from '../../components/job-offer-list/job-offer-list.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CompanyAdminModule { }

export const caRoutes: Routes = [
  { path: 'ManageRoles', component: ManageRolesComponent },
  { path: 'jobOfferList', component: JobOfferListComponent },
  { path: 'jobOfferList/newJob', component: NewJobComponent },
  { path: 'jobOfferList/updateJobDetails', component: NewJobComponent },
];