import { Routes } from '@angular/router';
import { ManageRolesComponent } from './CompanyPortal/CompanyAdmin/manage-roles/manage-roles.component';
import { AddrolesPopupComponent } from './CompanyPortal/CompanyAdmin/addroles-popup/addroles-popup.component';


export const routes: Routes = [
    {path:'manageRoles',component:ManageRolesComponent},
    {path:'AddRole',component:AddrolesPopupComponent}
]