import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { AdvertisementHeaderComponent } from "../advertisement-header/advertisement-header.component";
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { SeekerService } from '../../../services/seeker.service';


interface Seeker{
  email:string;
  first_name:string;
  last_name:string;
  phone_number:string;
  linkedin:string;
}

@Component({
    selector: 'app-seeker-application-status',
    standalone: true,
    templateUrl: './seeker-application-status.component.html',
    styleUrl: './seeker-application-status.component.css',
    imports: [MatCardModule, MatDividerModule, AdvertisementHeaderComponent,MatStepperModule,MatInputModule,FormsModule, ReactiveFormsModule,MatButtonModule]
})
export class SeekerApplicationStatusComponent {

  SeekerDetails: Seeker = {} as Seeker;
  user_id: number = 2;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder,private seekerService:SeekerService) {}


async ngOnInit() {
  this.fetchEmployeeDetails(); 
}

async fetchEmployeeDetails() {

  try {
    const seekerData = await this.seekerService.getSeekerDetails(this.user_id);
    this.SeekerDetails = seekerData;
  } catch (error) {
    console.error('Error fetching seeker details:', error);
   
  }
}

}