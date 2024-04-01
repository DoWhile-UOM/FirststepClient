import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';

@Component({
  selector: 'app-company-admin-registrtion-form',
  standalone: true,
  templateUrl: './company-admin-registrtion-form.component.html',
  styleUrl: './company-admin-registrtion-form.component.css',
  imports: [
    NavBarComponent,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutServerModule,
  ],
})
export class CompanyAdminRegistrtionFormComponent {
  hide = true;
}
