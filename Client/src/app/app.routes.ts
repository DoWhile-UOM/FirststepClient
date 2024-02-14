import { Routes } from '@angular/router';
import { ManageRolesComponent } from './CompanyPortal/CompanyAdmin/manage-roles/manage-roles.component';
import { EditRoleComponent } from './CompanyPortal/CompanyAdmin/edit-role/edit-role.component';
import { AddrolesPopupComponent } from './CompanyPortal/CompanyAdmin/addroles-popup/addroles-popup.component';
import { AdvertisementViewPageComponent } from './SeekerPortal/advertisement-view-page/advertisement-view-page.component';
import { SeekerHomePageComponent } from './SeekerPortal/seeker-home-page/seeker-home-page.component';
import { NewJobComponent } from './CompanyPortal/shared/new-job/new-job.component';

export const routes: Routes = [
    // company portal
    {path:'ManageRoles',component:ManageRolesComponent},
    {path:'AddRole',component:AddrolesPopupComponent},
    {path:'EditRole',component:EditRoleComponent},
    //{path:'AdminDashBoard',component:AdminDashboardComponent},
    {path:'newJob',component:NewJobComponent},

    // seeker portal
    {path:'jobdetails',component:AdvertisementViewPageComponent},
    {path:'home',component:SeekerHomePageComponent},
];