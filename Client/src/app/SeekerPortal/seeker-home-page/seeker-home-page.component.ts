import { Component, OnInit } from '@angular/core';
import { AdvertisementCardComponent } from '../advertisement-card/advertisement-card.component';
import { CommonModule } from '@angular/common';
import { AdvertisementServices } from '../../../services/advertisement.service';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { UserStoreService } from '../../services/user-store.service';

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
  imports: [AdvertisementCardComponent, CommonModule, NavBarComponent],
  templateUrl: './seeker-home-page.component.html',
  styleUrl: './seeker-home-page.component.css'
})
export class SeekerHomePageComponent implements OnInit {
  jobList: Job[] = [];
  users: any;

  public fullName: string = "";

  constructor(private userStore:UserStoreService,private advertisementService: AdvertisementServices, private api: ApiService,private authService:AuthService) {

  }

  signOut(){
    this.authService.signOut()
    //this.auth.signup(this.myForm.value)
  }

  ngOnInit() {

    this.api.getUsers()
      .subscribe(res => {
        this.users = res;
      });

      this.userStore.getFullNameFromStore()
      .subscribe(val=>{
        const fullNameFromToken = this.authService.getFullName();
        this.fullName = val || fullNameFromToken
      });



/*
    await this.advertisementService.getAllAdvertisements()
      .then((response) => {
        this.jobList = response;

        if (this.jobList.length == 0) {
          console.log("No advertisements found");
        }
      });*/
  
}

}