import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-job-uploaded',
  standalone: true,
  imports: [ MatButtonModule],
  templateUrl: './new-job-uploaded.component.html',
  styleUrl: './new-job-uploaded.component.css'
})
export class NewJobUploadedComponent {
  constructor(private router: Router) {}

  navigateToJobList() {
    this.router.navigate(['ca/jobOfferList']);
  }
}