import { Component, OnInit } from '@angular/core';
import { AdvertisementCardComponent } from '../advertisement-card/advertisement-card.component';
import { ViewAdvertisementCard } from '../../../models/view-advertisement-card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Apipaths } from '../../apipaths/apipaths';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seeker-home-page',
  standalone: true,
  imports: [ AdvertisementCardComponent, HttpClientModule, CommonModule ],
  templateUrl: './seeker-home-page.component.html',
  styleUrl: './seeker-home-page.component.css'
})
export class SeekerHomePageComponent implements OnInit{
  jobList: ViewAdvertisementCard[] = [];

  constructor(private http: HttpClient) {
    this.jobList = [] as ViewAdvertisementCard[];
  }

  ngOnInit() : void{
    this.http.get(Apipaths.getAdvertisements).subscribe((res: any) => {
      this.jobList = res;
      
      try{
        for (let i = 0; i < this.jobList.length; i++) {
          var postDate = new Date(this.jobList[i].posted_date);
          this.jobList[i].posted_date = postDate.toLocaleString('default', { month: 'short' }) + " " + postDate.getDate() + ", " + postDate.getFullYear();
        }
      }
      catch (error) {
        console.log("No advertisements found");
      }
    });
  }
}
