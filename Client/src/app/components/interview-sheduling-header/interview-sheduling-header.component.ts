import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-interview-sheduling-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule,MatLabel],
  templateUrl: './interview-sheduling-header.component.html',
  styleUrl: './interview-sheduling-header.component.css'
})
export class InterviewShedulingHeaderComponent {
  @Input() job_title: string = "";
  @Input() job_id: string = "";

constructor() { }

  onBackButtonClick(){
		window.history.back();
	}

  confirm() {
    // code to confirm the interview
  }

}
