import { Routes } from '@angular/router';
import { ManageRolesComponent } from './components/manage-roles/manage-roles.component';
import { EditRoleComponent } from './components/edit-role/edit-role.component';
import { AddrolesPopupComponent } from './components/addroles-popup/addroles-popup.component';
import { NewJobComponent } from './components/new-job/new-job.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { JobOfferListComponent } from './components/job-offer-list/job-offer-list.component';
import { LoginComponent } from './components/login/login.component';

import { SignupComponent } from './signup/signup.component';
import { authGuard } from './guards/auth.guard';

import { RegisterCompanyComponent } from './components/register-company/register-company.component';

import { RegCmpStateCheckComponent } from './components/reg-cmp-state-check/reg-cmp-state-check.component';


export const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  
  {
    path: 'company/admin',
    loadChildren: () => import('./portals/company-admin-portal/company-admin.module').then(m => m.caRoutes),
    // example link: http://localhost:4200/company/admin/jobOfferList
  },

  {
    path: 'seeker',
    loadChildren: () => import('./portals/seeker-portal/seeker.module').then(m => m.seekerRoutes),
    // example link: http://localhost:4200/seeker/home
  },

  //shared
  { path: 'file', component: FileUploadComponent },
];
