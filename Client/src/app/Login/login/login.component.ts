import { Component } from '@angular/core';
import { NavBarComponent } from "../../shared/nav-bar/nav-bar.component";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [NavBarComponent]
})
export class LoginComponent {

}
