import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { AdvertisementHeaderComponent } from "../advertisement-header/advertisement-header.component";
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

//interface application status

interface Application{
  status: string;
  submitted_date: Date;
  screening_date: Date;
  finalize_date: Date;
  CVurl: string;
}

interface Job {
  title: string;
  field_name: string;
  company_name: string;
}

@Component({
    selector: 'app-seeker-application-status',
    standalone: true,
    templateUrl: './seeker-application-status.component.html',
    styleUrl: './seeker-application-status.component.css',
    imports: [MatCardModule, MatDividerModule, AdvertisementHeaderComponent,MatStepperModule,MatInputModule,FormsModule, ReactiveFormsModule,MatButtonModule]
})
export class SeekerApplicationStatusComponent {

  jobData: Job = {
    title: 'Software Developer',
    field_name: 'Software Development',
    company_name: 'Google',
  }
  user_id: number = 2;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });


  constructor(private _formBuilder: FormBuilder) {}


async ngOnInit() {
  this.fetchSeekerDetails(); 
}

async fetchSeekerDetails() {

}

}