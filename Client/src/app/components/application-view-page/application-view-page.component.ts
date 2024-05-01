import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';
import { SeekerService } from '../../../services/seeker.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';

interface Seeker {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number,
  bio: string,
  description: string,
  university: string,
  linkedin: string,  
  field_name: string,
  user_id: number
}

interface HRAssistant {
  name: string;
  company: string;
}


@Component({
  selector: 'app-application-view-page',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,MatLabel,MatToolbar,MatButton],
  templateUrl: './application-view-page.component.html',
  styleUrl: './application-view-page.component.css'
})
export class ApplicationViewPageComponent {
  seekerDetails: Seeker = {} as Seeker;
  

  constructor(private seekerService: SeekerService) {}
  user_id: number = 2095;

  async ngOnInit() {
    this.fetchSeekerDetails();
  }

  //get
  async fetchSeekerDetails() {
    try {
      const response = await this.seekerService.getSeekerDetails(this.user_id);
      this.seekerDetails = response;
    } catch (error) {
      console.error('Error fetching seeker details:', error);
    }
  }

}
