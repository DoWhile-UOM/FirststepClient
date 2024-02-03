import { Routes } from '@angular/router';
import { LoginComponent } from './Login/login/login.component'; // Fix the import path

export const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'login', 
        component: LoginComponent
    },
    
];
