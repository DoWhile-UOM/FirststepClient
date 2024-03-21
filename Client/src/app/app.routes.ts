import { Routes } from '@angular/router';
import { ManageRolesComponent } from './components/manage-roles/manage-roles.component';
import { EditRoleComponent } from './components/edit-role/edit-role.component';
//import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddrolesPopupComponent } from './components/addroles-popup/addroles-popup.component';
import { AdvertisementViewPageComponent } from './components/advertisement-view-page/advertisement-view-page.component';
import { SeekerHomePageComponent } from './components/seeker-home-page/seeker-home-page.component';
import { SavedAdvertisementListComponent } from './components/saved-advertisement-list/saved-advertisement-list.component';
import { NewJobComponent } from './components/new-job/new-job.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { SeekerApplicationFormComponent } from './components/seeker-application-form/seeker-application-form.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { JobOfferListComponent } from './components/job-offer-list/job-offer-list.component';
import { NewJobUploadedComponent } from './components/new-job-uploaded/new-job-uploaded.component';
import { LoginComponent } from './components/login/login.component';

import { SignupComponent } from './signup/signup.component';
import { authGuard } from './guards/auth.guard';

import { RegisterCompanyComponent } from './components/register-company/register-company.component';

import { RegCmpStateCheckComponent } from './components/reg-cmp-state-check/reg-cmp-state-check.component';


export const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  // company portal
  { path: 'ManageRoles', component: ManageRolesComponent },
  { path: 'AddRole', component: AddrolesPopupComponent },
  { path: 'EditRole', component: EditRoleComponent },
  //{path:'AdminDashBoard',component:AdminDashboardComponent},
  { path: 'jobOfferList/newJob', component: NewJobComponent },
  { path: 'jobOfferList/updateJobDetails', component: NewJobComponent },
  { path: 'jobOfferList', component: JobOfferListComponent }, //get styles

  // seeker portal
  { path: 'jobdetails', component: AdvertisementViewPageComponent },
  { path: 'home', component: SeekerHomePageComponent },
  { path: 'home/saved', component: SavedAdvertisementListComponent },
  { path: 'company-profile', component: CompanyProfileComponent },
  { path: 'newJobUploaded', component: NewJobUploadedComponent },
  { path: 'applicationForm', component: SeekerApplicationFormComponent },
  { path: 'applicationFormconfirm', component: SeekerApplicationFormComponent },

  //shared
  { path: 'file', component: FileUploadComponent },
];
