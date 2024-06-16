import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-interview-sheduling-back-action',
  standalone: true,
  imports: [MatIconModule, MatButtonModule,MatLabel],
  templateUrl: './interview-sheduling-back-action.component.html',
  styleUrl: './interview-sheduling-back-action.component.css'
})
export class InterviewShedulingBackActionComponent {

  onBackButtonClick(){
		window.history.back();
	}

}
