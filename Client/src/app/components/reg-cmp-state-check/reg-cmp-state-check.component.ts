import { Component } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { CompanyService } from '../../../services/company.service';
import { ActivatedRoute } from '@angular/router';

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
}


@Component({
  selector: 'app-reg-cmp-state-check',
  standalone: true,
  imports: [MatStepperModule, MatIcon, MatFormField, MatLabel],
  templateUrl: './reg-cmp-state-check.component.html',
  styleUrl: './reg-cmp-state-check.component.css'
})
export class RegCmpStateCheckComponent {

  company_id: number = 8; // sample company_id
  //cmpData: CmpyData[] = [];

  cmpData:CmpyData={} as CmpyData

  constructor(private route:ActivatedRoute,private company: CompanyService) { }

  //Fetch data from the database when the component initializes
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params =>{
      const id = params.get('id');
      if (id) {  // Check if 'id' parameter exists
        this.company_id = parseInt(id, 10); // convert string to integer 10 is base
        console.log('Company ID:', this.company_id);
        this.fetchData(this.company_id);
      }
    }); // output:
    //this.fetchData();
    //console.log(this.cmpData);
    
  }

  async fetchData(company_id:number) {
    console.log('Calling getCompnayRegState with company_id:', company_id);
    try {
      this.cmpData = await this.company.getCompnayRegState(company_id);
      console.log('Fetched data:', this.cmpData);
    } catch (error) {
      console.error('Error:', error);
    }
  //end of fetch data
  }

}
