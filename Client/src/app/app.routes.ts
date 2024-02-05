import { Routes } from '@angular/router';
import { LoginComponent } from './Login/login/login.component'; // Fix the import path
import { ForgotPasswordComponent } from './Login/forgot-password/forgot-password.component';

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
    }
    
];
