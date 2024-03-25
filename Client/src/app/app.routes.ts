import { Routes } from '@angular/router';
import { ManageRolesComponent } from './CompanyPortal/CompanyAdmin/manage-roles/manage-roles.component';
import { EditRoleComponent } from './CompanyPortal/CompanyAdmin/edit-role/edit-role.component';
//import { AdminDashboardComponent } from './CompanyPortal/CompanyAdmin/admin-dashboard/admin-dashboard.component';
import { AddrolesPopupComponent } from './CompanyPortal/CompanyAdmin/addroles-popup/addroles-popup.component';
import { AdvertisementViewPageComponent } from './SeekerPortal/advertisement-view-page/advertisement-view-page.component';
import { SeekerHomePageComponent } from './SeekerPortal/seeker-home-page/seeker-home-page.component';
import { NewJobComponent } from './CompanyPortal/shared/new-job/new-job.component';
import { CompanyProfileComponent } from './SeekerPortal/company-profile/company-profile.component';
import { JobOfferListComponent } from './CompanyPortal/shared/job-offer-list/job-offer-list.component';

import { NewJobUploadedComponent } from './CompanyPortal/shared/new-job-uploaded/new-job-uploaded.component';
import { LoginComponent } from './Login/login/login.component';
import { CompanyProfileEditComponent } from './CompanyPortal/CompanyAdmin/company-profile-edit/company-profile-edit.component';
import { RoleProfileEditComponent } from './CompanyPortal/shared/role-profile-edit/role-profile-edit.component';
import { CompanyAdminRegistrtionFormComponent } from './CompanyPortal/CompanyAdmin/company-admin-registrtion-form/company-admin-registrtion-form.component';
import { LandingPageComponent } from './shared/landing-page/landing-page.component';
import { CompanyApplicationListComponent } from './SystemAdminPortal/company-application-list/company-application-list.component';
import { CompanyApplicationComponent } from './SystemAdminPortal/company-application/company-application.component';

export const routes: Routes = [
  // company portal
  { path: 'ManageRoles', component: ManageRolesComponent },
  { path: 'AddRole', component: AddrolesPopupComponent },
  { path: 'EditRole', component: EditRoleComponent },
  {
    path: 'company-admin/profile-edit',
    component: CompanyProfileEditComponent,
  },
  {
    path: 'company-registration/company-admin-registration',
    component: CompanyAdminRegistrtionFormComponent,
  },
  {
    path: 'company-registration/company-roleEdit',
    component: RoleProfileEditComponent,
  },
  //{path:'AdminDashBoard',component:AdminDashboardComponent},
  { path: 'jobOfferList/newJob', component: NewJobComponent },
  { path: 'jobOfferList/updateJobDetails', component: NewJobComponent },
  { path: 'jobOfferList', component: JobOfferListComponent },

  // seeker portal
  { path: 'jobdetails', component: AdvertisementViewPageComponent },
  { path: 'home', component: SeekerHomePageComponent },
  { path: 'company-profile', component: CompanyProfileComponent },
  { path: 'newJobUploaded', component: NewJobUploadedComponent },

  //common
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'first-step',
    component: LandingPageComponent,
  },
  {
    path: 'companyRegistrationList',
    component: CompanyAdminRegistrtionFormComponent,
  },

  //SystemAdmin
  {
    path: 'systemAdmin/companyApplicationList',
    component: CompanyApplicationListComponent,
  },
  {
    path: 'systemAdmin/companyApplicationView',
    component: CompanyApplicationComponent,
  },
];
