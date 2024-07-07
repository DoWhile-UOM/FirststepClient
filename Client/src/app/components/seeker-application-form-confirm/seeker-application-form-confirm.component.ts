import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seeker-application-form-confirm',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './seeker-application-form-confirm.component.html',
  styleUrl: './seeker-application-form-confirm.component.css'
})
export class SeekerApplicationFormConfirmComponent {
  companyName: string = 'Company';

  constructor(private router: Router, private a_router: ActivatedRoute) {
    this.companyName = this.a_router.snapshot.paramMap.get('company') ?? '';
  }

  viewapplication(){
    this.router.navigate(['seeker/applied']);
  }

  back(){
    this.router.navigate(['seeker/']);
  }
}
