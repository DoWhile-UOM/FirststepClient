import { Component } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { CompanyService } from '../../../services/company.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { StylemanageService } from '../../../services/stylemanage.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { MatOptionModule } from '@angular/material/core';

//interface to fetch company data
export interface CmpyData {
  company_id: string;//
  company_name: string;
  company_website: string;
  company_email: string;
  company_description: string;
  company_logo: string;
  company_city: string;//not needed
  company_province: string;//not needed
  company_business_scale: string;
  business_reg_certificate: string;
  company_registered_date: string;
  certificate_of_incorporation:string;
  company_phone_number:number
  business_reg_no:number;
  comment: string;
  verification_status: any;
  
}


@Component({
  selector: 'app-reg-cmp-state-check',
  standalone: true,
  imports: [MatOptionModule,MatDividerModule, MatGridListModule, MatCardModule, MatButtonModule, MatInputModule, ReactiveFormsModule, MatStepperModule, MatIcon, MatFormField, MatLabel],
  templateUrl: './reg-cmp-state-check.component.html',
  styleUrl: './reg-cmp-state-check.component.css'
})
export class RegCmpStateCheckComponent {

  company_id: string = 'nmIkuA6ZIO'; // sample company_id
  regState: string = 'Pending'; // sample registration state
  isNoInput: boolean = true;
  //cmpData: CmpyData[] = [];

  cmpData: CmpyData = {} as CmpyData

  companyReg = this._formBuilder.group({
    company_name: new FormControl({value: this.cmpData.company_name, disabled: true}),//
    company_website: new FormControl({value: this.cmpData.company_website, disabled: false}),//
    company_email: new FormControl({value: this.cmpData.company_email, disabled: true}),//
    company_description: new FormControl({value: this.cmpData.company_description, disabled: false}),//
    company_logo: new FormControl({value: this.cmpData.company_logo, disabled: false}),//
    company_business_scale: new FormControl({value: this.cmpData.company_business_scale, disabled: false}),//
    business_reg_certificate: new FormControl({value: this.cmpData.business_reg_certificate, disabled: false},Validators.required),//
    company_registered_date: new FormControl({value: this.cmpData.company_registered_date, disabled: false},Validators.required),///
    certificate_of_incorporation: new FormControl({value: this.cmpData.certificate_of_incorporation, disabled: false}),//
    company_phone_number: new FormControl({value: this.cmpData.company_phone_number, disabled: false},Validators.required),//
    business_reg_no: new FormControl({value: this.cmpData.business_reg_no, disabled: false},Validators.required),//
  });

  constructor(private _formBuilder: FormBuilder,private popup: MatDialog, private styleService: StylemanageService, private route: ActivatedRoute, private company: CompanyService) { }



  //Fetch data from the database when the component initializes
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (id) {  // Check if 'id' parameter exists
        this.company_id = id; // convert string to integer 10 is base
        console.log('Company ID:', this.company_id);
        this.fetchData(this.company_id);
      }
    });

  }

  async fetchData(company_id: string) {
    console.log('Calling getCompnayRegState with company_id:', company_id);
    try {
      this.cmpData = await this.company.getCompnayRegState(company_id);

      if (this.cmpData) {
        this.styleService.setStyle('circle-border-color', '#ffbf00');
        this.styleService.setStyle('number-color', '#ffbf00');
        this.cmpData.company_registered_date = this.cmpData.company_registered_date.split('T')[0];
        let evalstate = this.cmpData.verification_status;
        let approvelstate = this.cmpData.comment;

        if (evalstate) {
          this.onApproved();
        } else if (approvelstate) {
          this.onRejected();
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
    //end of fetch data
  }

  onRejected() {
    this.styleService.setStyle('circle-border-color', '#ff0000');
    this.styleService.setStyle('number-color', '#ff0000');
    this.regState = 'Rejected';
    this.isNoInput = false;
  }

  onApproved() {
    this.popup.open(PopUpComponent);
    this.styleService.setStyle('circle-border-color', '#00ff1a');
    this.styleService.setStyle('number-color', '#00ff1a');
    console.log('Company Approved');
    this.regState = 'Already Approved';
  }

  OnResubmit() {
    this.styleService.setStyle('circle-border-color', '#ffbf00');
    this.styleService.setStyle('number-color', '#ffbf00');
    this.isNoInput = true;

    //this.company.updateUnregCompanyDetails(this.companyReg.value,this.cmpData.company_id);

  }

}