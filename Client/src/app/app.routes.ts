import { Routes } from '@angular/router';
import { LoginComponent } from './Login/login/login.component'; // Fix the import path
import { ForgotPasswordComponent } from './Login/forgot-password/forgot-password.component';
import { CompanyProfileEditComponent } from './CompanyPortal/CompanyAdmin/company-profile-edit/company-profile-edit.component';
import { CompanyAdminRegistrtionFormComponent } from './CompanyPortal/CompanyAdmin/company-admin-registrtion-form/company-admin-registrtion-form.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'login', 
        component: LoginComponent
    },
    {
        path: 'forgot-password', 
        component: ForgotPasswordComponent
    },
    {
        path: 'company-admin/profile-edit', 
        component: CompanyProfileEditComponent
    },
    {
        path: 'company-registration/company-admin-registration', 
        component: CompanyAdminRegistrtionFormComponent
    }
    
    
];
