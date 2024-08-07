import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-interview-sheduling-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule,MatLabel],
  templateUrl: './interview-sheduling-header.component.html',
  styleUrl: './interview-sheduling-header.component.css'
})
export class InterviewShedulingHeaderComponent {
  @Input() job_title: string = "";
  @Input() job_number: number = 0;
  @Input() job_id: number = 0;

  constructor(private router:Router,private auth:AuthService) { }

  onBackButtonClick(){
		window.history.back();
	}

  confirm() {
    this.router.navigate([`${this.auth.getRole()}/availableTimeSlot`], { queryParams: { id: this.job_id } });
  }
}
