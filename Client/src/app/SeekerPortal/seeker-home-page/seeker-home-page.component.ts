import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { AdvertisementCardComponent } from '../advertisement-card/advertisement-card.component';
import { CommonModule } from '@angular/common';
import { AdvertisementServices } from '../../../services/advertisement.service';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { SearchBasicComponent } from '../search-basic/search-basic.component';

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
  imports: [ AdvertisementCardComponent, CommonModule, NavBarComponent, SearchBasicComponent],
  templateUrl: './seeker-home-page.component.html',
  styleUrl: './seeker-home-page.component.css'
})
export class SeekerHomePageComponent{
  jobList: Job[] = [];

  seekerID: number = 4; // sample seekerID

  constructor(private advertisementService: AdvertisementServices) {
    
  }

  changeJobList(newJobList: Job[]){
    this.jobList = newJobList;
  }
}

