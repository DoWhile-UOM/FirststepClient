import { Routes } from '@angular/router';
import { ManageRolesComponent } from './CompanyPortal/CompanyAdmin/manage-roles/manage-roles.component';

import { EditRoleComponent } from './CompanyPortal/CompanyAdmin/edit-role/edit-role.component';

import { AdminDashboardComponent } from './CompanyPortal/CompanyAdmin/admin-dashboard/admin-dashboard.component';
import { AddrolesPopupComponent } from './CompanyPortal/CompanyAdmin/addroles-popup/addroles-popup.component';
import { AdvertisementViewPageComponent } from './SeekerPortal/advertisement-view-page/advertisement-view-page.component';
import { SeekerHomePageComponent } from './SeekerPortal/seeker-home-page/seeker-home-page.component';
import { NewJobComponent } from './CompanyPortal/shared/new-job/new-job.component';

import { LoginComponent } from './Login/login/login.component'; // Fix the import path
import { ForgotPasswordComponent } from './Login/forgot-password/forgot-password.component';
import { CompanyProfileEditComponent } from './CompanyPortal/CompanyAdmin/company-profile-edit/company-profile-edit.component';
import { CompanyAdminRegistrtionFormComponent } from './CompanyPortal/CompanyAdmin/company-admin-registrtion-form/company-admin-registrtion-form.component';


import { AddrolesPopupComponent } from './CompanyPortal/CompanyAdmin/addroles-popup/addroles-popup.component';

export const routes: Routes = [

    // company portal
    {path:'ManageRoles',component:ManageRolesComponent},
    {path:'AddRole',component:AddrolesPopupComponent},
    {path:'EditRole',component:EditRoleComponent},
    {path:'AdminDashBoard',component:AdminDashboardComponent},
    {path:'newJob',component:NewJobComponent},

    // seeker portal
    {path:'jobdetails',component:AdvertisementViewPageComponent},
    {path:'home',component:SeekerHomePageComponent},
  
  
    // nethmi
     {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'forgot-password',
      component: ForgotPasswordComponent,
    },
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
      component: CompanyProfileEditComponent,
    },
]

