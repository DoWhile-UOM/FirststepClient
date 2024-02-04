import { Component } from '@angular/core';
import { NavBarComponent } from "../../shared/nav-bar/nav-bar.component";
import {MatCardModule} from '@angular/material/card';
@Component({
    selector: 'app-forgot-password',
    standalone: true,
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.css',
    imports: [NavBarComponent,MatCardModule]
})
export class ForgotPasswordComponent {

}
