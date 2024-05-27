import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seeker-application-form-confirm',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './seeker-application-form-confirm.component.html',
  styleUrl: './seeker-application-form-confirm.component.css'
})
export class SeekerApplicationFormConfirmComponent {
  constructor(private router: Router) {}

  viewapplication(){
    this.router.navigate(['seeker/home/applicationReview']);
  }

  back(){
    this.router.navigate(['seeker/']);
  }
}
