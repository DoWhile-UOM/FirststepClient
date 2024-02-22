import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ManageRolesComponent } from "./CompanyPortal/CompanyAdmin/manage-roles/manage-roles.component";
import { AddrolesPopupComponent } from './CompanyPortal/CompanyAdmin/addroles-popup/addroles-popup.component';
import { SeekerEditProfileComponent } from './SeekerPortal/seeker-edit-profile/seeker-edit-profile.component';
import { SeekersignupComponent } from './SeekerPortal/seekersignup/seekersignup.component';
import { AdmindashboardComponent } from './CompanyPortal/CompanyAdmin/admindashboard/admindashboard.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, ManageRolesComponent, AddrolesPopupComponent,SeekerEditProfileComponent,SeekersignupComponent,AdmindashboardComponent] 
})
export class AppComponent {
  title = 'Client';


}




