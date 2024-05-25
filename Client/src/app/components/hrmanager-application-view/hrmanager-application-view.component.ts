import { Component,OnInit,Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';
import { SeekerService } from '../../../services/seeker.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


interface Seeker {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number;
  bio: string;
  description: string;
  university: string;
  linkedin: string;
  field_name: string;
  user_id: number;
}

interface HRAssistant {
  name: string;
  company: string;
}

@Component({
  selector: 'app-hrmanager-application-view',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatLabel, MatToolbar, MatButton, CommonModule],
  templateUrl: './hrmanager-application-view.component.html',
  styleUrl: './hrmanager-application-view.component.css',
})
export class HrmanagerApplicationViewComponent {
  @Input() showComments: boolean = true;

  seekerDetails: Seeker = {} as Seeker;

  constructor(private seekerService: SeekerService ,private route: ActivatedRoute ) {}
  user_id: number = 2095;

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.showComments = params['showComments'] !== 'false';
    });
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
