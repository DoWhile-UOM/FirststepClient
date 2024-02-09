import { Routes } from '@angular/router';
import { ManageRolesComponent } from './CompanyPortal/CompanyAdmin/manage-roles/manage-roles.component';

import { EditRoleComponent } from './CompanyPortal/CompanyAdmin/edit-role/edit-role.component';
import { AdminDashboardComponent } from './CompanyPortal/CompanyAdmin/admin-dashboard/admin-dashboard.component';
import { AddrolesPopupComponent } from './CompanyPortal/CompanyAdmin/addroles-popup/addroles-popup.component';
import { AdvertisementViewComponent } from './shared/advertisement-view/advertisement-view.component';
import { AdvertisementHeaderComponent } from './shared/advertisement-header/advertisement-header.component';


export const routes: Routes = [
    {path:'ManageRoles',component:ManageRolesComponent},
    {path:'AddRole',component:AddrolesPopupComponent},
    {path:'EditRole',component:EditRoleComponent},
    {path:'AdminDashBoard',component:AdminDashboardComponent},
    {path:'Advertisement',component:AdvertisementViewComponent},
    {path:'AdvertisementHeader',component:AdvertisementHeaderComponent}
]

