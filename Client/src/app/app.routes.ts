import { Routes } from '@angular/router';
import { ManageRolesComponent } from './CompanyPortal/CompanyAdmin/manage-roles/manage-roles.component';
import { EditRoleComponent } from './CompanyPortal/CompanyAdmin/edit-role/edit-role.component';
//import { AdminDashboardComponent } from './CompanyPortal/CompanyAdmin/admin-dashboard/admin-dashboard.component';
import { AddrolesPopupComponent } from './CompanyPortal/CompanyAdmin/addroles-popup/addroles-popup.component';
import { AdvertisementViewPageComponent } from './SeekerPortal/advertisement-view-page/advertisement-view-page.component';
import { SeekerHomePageComponent } from './SeekerPortal/seeker-home-page/seeker-home-page.component';
import { SavedAdvertisementListComponent } from './SeekerPortal/saved-advertisement-list/saved-advertisement-list.component';
import { NewJobComponent } from './CompanyPortal/shared/new-job/new-job.component';
import { FileUploadComponent } from './CompanyPortal/shared/file-upload/file-upload.component';
import { SeekerApplicationFormComponent } from './SeekerPortal/seeker-application-form/seeker-application-form.component';
import { CompanyProfileComponent } from './SeekerPortal/company-profile/company-profile.component';
import { JobOfferListComponent } from './CompanyPortal/shared/job-offer-list/job-offer-list.component';
import { NewJobUploadedComponent } from './CompanyPortal/shared/new-job-uploaded/new-job-uploaded.component';
import { LoginComponent } from './Login/login/login.component';

import { SignupComponent } from './signup/signup.component';
import { authGuard } from './guards/auth.guard';

import { RegisterCompanyComponent } from './CompanyPortal/CompanyAdmin/register-company/register-company.component';

import { RegCmpStateCheckComponent } from './CompanyPortal/CompanyAdmin/reg-cmp-state-check/reg-cmp-state-check.component';


export const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  // company portal
  {path:'ManageRoles',component:ManageRolesComponent},
  {path:'AddRole',component:AddrolesPopupComponent},
  {path:'EditRole',component:EditRoleComponent},
  //{path:'AdminDashBoard',component:AdminDashboardComponent},
  {path:'jobOfferList/newJob',component:NewJobComponent},
  {path:'jobOfferList/updateJobDetails',component:NewJobComponent},
  {path:'jobOfferList',component:JobOfferListComponent},
  {path:'applicationForm',component:SeekerApplicationFormComponent},
    
  {path:'RegisterCompany',component:RegisterCompanyComponent},
  {path:'RegCheck',component:RegCmpStateCheckComponent},
  
  // seeker portal
  {path:'jobdetails',component:AdvertisementViewPageComponent},
  {path:'home',component:SeekerHomePageComponent,canActivate:[authGuard]},
  {path:'home/saved',component:SavedAdvertisementListComponent},
  {path:'company-profile',component:CompanyProfileComponent},
  {path:'newJobUploaded',component:NewJobUploadedComponent},
  
  {path:'file',component:FileUploadComponent}
];