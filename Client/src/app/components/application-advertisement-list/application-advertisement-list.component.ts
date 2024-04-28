import { Component } from '@angular/core';
import { AdvertisementCardComponent } from '../advertisement-card/advertisement-card.component';
import { CommonModule } from '@angular/common';
import { AdvertisementServices } from '../../../services/advertisement.service';

interface Job {
  advertisement_id: number;
  title: string;
  company_name: string;
  company_id: number;
  field_name: string;
  country: string;
  city: string;
  employeement_type: string;
  arrangement: string;
  posted_date: string;
  is_saved: boolean;
  is_expired: boolean;
}

@Component({
  selector: 'app-application-advertisement-list',
  standalone: true,
  imports: [AdvertisementCardComponent, CommonModule],
  templateUrl: './application-advertisement-list.component.html',
  styleUrl: './application-advertisement-list.component.css'
})
export class ApplicationAdvertisementListComponent {
  jobList: Job[] = [];

  seekerID: number = 3; // sample seekerID

  constructor(private advertisementService: AdvertisementServices) {}

  async ngOnInit(){
    await this.advertisementService.getSavedAdvertisements(String(this.seekerID))
      .then((response) => {
        this.jobList = response;

        if (this.jobList.length == 0) {
          console.log("No advertisements found");
        }
      });
  }
}
