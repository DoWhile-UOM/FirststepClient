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
  selector: 'app-seeker-home-page',
  standalone: true,
  imports: [ AdvertisementCardComponent, CommonModule,NavBarComponent],
  templateUrl: './seeker-home-page.component.html',
  styleUrl: './seeker-home-page.component.css'
})
export class SeekerHomePageComponent implements OnInit{
  jobList: Job[] = [];

  seekerID: number = 4; // sample seekerID

  constructor(private advertisementService: AdvertisementServices) {
    
  }

  async ngOnInit(){
    await this.advertisementService.getAllAdvertisements(String(this.seekerID))
      .then((response) => {
        this.jobList = response;

        if (this.jobList.length == 0) {
          console.log("No advertisements found");
        }
      });
  }
}

