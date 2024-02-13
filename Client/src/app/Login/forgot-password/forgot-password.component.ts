import { Component } from '@angular/core';
import { NavBarComponent } from "../../shared/nav-bar/nav-bar.component";
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FlexLayoutServerModule} from '@angular/flex-layout/server';
@Component({
    selector: 'app-forgot-password',
    standalone: true,
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.css',
    imports: [NavBarComponent,MatCardModule,MatGridListModule,FlexLayoutModule,MatFormFieldModule,MatInputModule,FlexLayoutServerModule]
})
export class ForgotPasswordComponent {

}
