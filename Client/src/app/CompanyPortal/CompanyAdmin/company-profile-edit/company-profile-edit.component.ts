import { Component } from '@angular/core';
import { NavBarComponent } from "../../../shared/nav-bar/nav-bar.component";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';
import {MatSelectModule} from '@angular/material/select';

interface IBScale {
  scale: string;
}

@Component({
    selector: 'app-company-profile-edit',
    standalone: true,
    templateUrl: './company-profile-edit.component.html',
    styleUrl: './company-profile-edit.component.css',
    imports: [NavBarComponent,MatInputModule,MatFormFieldModule,FormsModule,CdkTextareaAutosize,TextFieldModule,MatSelectModule]
})
export class CompanyProfileEditComponent {
  scale: IBScale[] = [
    {scaleType: 'Small',viewValue: 'Small Scale'},
    {scaleType: 'Medium',viewValue: 'Medium Scale'},
    {scaleType: 'Large',viewValue: 'Large Scale'},
  ];
}
