import { Component } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { CompanyService } from '../../../services/company.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';

//interface to fetch company data
export interface CmpyData {
  company_name: string;
  company_email: string;
  company_website: string;
  company_phone_number: number;
  company_logo: string;
  company_description: string;
  company_city: string;
  company_province: string;
  company_business_scale: string;
  comment:string;
  verification_status:any;
  company_registered_date: string;
}


@Component({
  selector: 'app-reg-cmp-state-check',
  standalone: true,
  imports: [MatDividerModule,MatGridListModule,MatCardModule,MatButtonModule,MatInputModule,ReactiveFormsModule,MatStepperModule, MatIcon, MatFormField, MatLabel],
  templateUrl: './reg-cmp-state-check.component.html',
  styleUrl: './reg-cmp-state-check.component.css'
})
export class RegCmpStateCheckComponent {

  company_id: string = 'nmIkuA6ZIO'; // sample company_id
  regState: string = 'Pending'; // sample registration state
  isNoInput: boolean = true;
  //cmpData: CmpyData[] = [];

  cmpData:CmpyData={} as CmpyData

  constructor(private route:ActivatedRoute,private company: CompanyService) { }



  //Fetch data from the database when the component initializes
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params =>{
      const id = params.get('id');
      if (id) {  // Check if 'id' parameter exists
        this.company_id = id; // convert string to integer 10 is base
        console.log('Company ID:', this.company_id);
        this.fetchData(this.company_id);
      }
    }); 
    
  }

  async fetchData(company_id:string) {
    console.log('Calling getCompnayRegState with company_id:', company_id);
    try {
      this.cmpData = await this.company.getCompnayRegState(company_id);

      if(this.cmpData){
        this.cmpData.company_registered_date=this.cmpData.company_registered_date.split('T')[0];
        let evalstate=this.cmpData.verification_status;
        let approvelstate=this.cmpData.comment;
  
        if(evalstate ){
          this.onApproved();
        }else if (approvelstate){
          this.onRejected();
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  //end of fetch data
  }

  onRejected(){
    console.log('Company Rejected');
    this.regState = 'Rejected';
    this.isNoInput = false;
  }

  onApproved(){
    console.log('Company Approved');
    this.regState = 'Already Approved';
  }

  OnResubmit(){
    this.isNoInput = true;
  }

}