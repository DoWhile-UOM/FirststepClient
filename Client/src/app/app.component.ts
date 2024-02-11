import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ManageRolesComponent } from "./CompanyPortal/CompanyAdmin/manage-roles/manage-roles.component";
import { SignUpSecondPageComponent } from "./SeekerPortal/sign-up-second-page/sign-up-second-page.component";
import { AddrolesPopupComponent } from './CompanyPortal/CompanyAdmin/addroles-popup/addroles-popup.component';





@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, ManageRolesComponent, SignUpSecondPageComponent,AddrolesPopupComponent ]
})
export class AppComponent {
  title = 'Client';
}

