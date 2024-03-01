import { Component, OnInit } from '@angular/core';
import { AdvertisementCardComponent } from '../advertisement-card/advertisement-card.component';
import { CommonModule } from '@angular/common';
import { AdvertisementServices } from '../../../services/advertisement.service';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';

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
}

@Component({
  selector: 'app-saved-advertisement-list',
  standalone: true,
  imports: [NavBarComponent, AdvertisementCardComponent, CommonModule],
  templateUrl: './saved-advertisement-list.component.html',
  styleUrl: './saved-advertisement-list.component.css'
})
export class SavedAdvertisementListComponent {
  jobList: Job[] = [];

  seekerID: number = 4; // sample seekerID

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
