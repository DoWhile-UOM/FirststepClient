import { Routes } from '@angular/router';
import { LoginComponent } from './Login/login/login.component'; // Fix the import path
import { ForgotPasswordComponent } from './Login/forgot-password/forgot-password.component';
import { AddSkillPopUpComponent } from './SeekerPortal/add-skill-pop-up/add-skill-pop-up.component';

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
        path: 'temp', 
        component: AddSkillPopUpComponent
    }
    
];
