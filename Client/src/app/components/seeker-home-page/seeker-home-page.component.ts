import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { AdvertisementCardComponent } from '../advertisement-card/advertisement-card.component';
import { CommonModule } from '@angular/common';
import { AdvertisementServices } from '../../../services/advertisement.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { SearchBasicComponent } from '../search-basic/search-basic.component';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { UserStoreService } from '../../../services/user-store.service';

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

  constructor(private advertisementService: AdvertisementServices, private api: ApiService,private authService:AuthService) {

  }

  ngOnInit(){
    var org=this.authService.getUserId();
    console.log(org);
  }


  seekerID: number = 3; // sample seekerID

  changeJobList(newJobList: Job[]){
    this.jobList = newJobList;
  }

  signOut(){
    this.authService.signOut()
    //this.auth.signup(this.myForm.value)
  }



}