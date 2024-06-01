import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';
import { SeekerService } from '../../../services/seeker.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';

interface Seeker {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number;
  bio: string;
  description: string;
  university: string;
  linkedin: string;
  field_id: string;
  user_id: number;
}
@Component({
  selector: 'app-seeker-profile-view',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatLabel,
    MatToolbar,
    MatButton,
    CommonModule,
  ],
  templateUrl: './seeker-profile-view.component.html',
  styleUrl: './seeker-profile-view.component.css',
})
export class SeekerProfileViewComponent implements OnInit {
  seekerDetails: Seeker = {} as Seeker;
  seekerId!: number;

  constructor(
    private seekerService: SeekerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('seekerId');
    this.seekerId = id !== null ? +id : 0;
    this.fetchSeekerDetails();
  }

  async fetchSeekerDetails() {
    try {
      const response = await this.seekerService.getSeekerDetailsforSeekerView(
        this.seekerId
      );
      this.seekerDetails = response;
    } catch (error) {
      console.error('Error fetching seeker details:', error);
    }
  }
}
