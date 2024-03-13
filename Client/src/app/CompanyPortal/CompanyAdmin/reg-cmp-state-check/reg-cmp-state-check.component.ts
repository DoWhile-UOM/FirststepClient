import { Component } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { CompanyService } from '../../../../services/company.service';

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

  constructor(private company: CompanyService) { }

  //Fetch data from the database when the component initializes
  ngOnInit(): void {
    this.fetchData();
  }

  async fetchData() {
    await this.company.getCompnayRegState(this.company_id);
  }
  //end of fetch data


}
