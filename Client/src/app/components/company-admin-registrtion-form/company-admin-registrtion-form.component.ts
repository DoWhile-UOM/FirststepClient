import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../../services/company.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
interface CmpAdminReg {
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
}

@Component({
  selector: 'app-company-admin-registrtion-form',
  standalone: true,
  templateUrl: './company-admin-registrtion-form.component.html',
  styleUrl: './company-admin-registrtion-form.component.css',
  imports: [

    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutServerModule, CommonModule, FormsModule, MatGridListModule, MatDividerModule
  ],
})
export class CompanyAdminRegistrtionFormComponent {
  hide = true;
  cmpID: string = 'tmNBrgAyfM'; // sample company_id
  type: string = 'CA'; // or whatever the type should be

  constructor(private route: ActivatedRoute, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (id) {  // Check if 'id' parameter exists
        this.cmpID = id; // convert string to integer 10 is base
        console.log('Company ID:', this.cmpID);
      }
    });
  }

  async onSubmit(formValue: any) {
    const adminRegData: CmpAdminReg = {
      email: formValue.email,
      password_hash: formValue.password,
      first_name: formValue.firstName,
      last_name: formValue.lastName,

    };
    try {
      console.log('Company Admin Registration Started');
      await this.companyService.postCompanyAdminReg(adminRegData, this.type, this.cmpID);
      console.log('Company Admin Registration Successful');
    } catch (error) {
      console.error(error);
    }
  }
}
