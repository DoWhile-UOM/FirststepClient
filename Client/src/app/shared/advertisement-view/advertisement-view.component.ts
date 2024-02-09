import { Component } from '@angular/core';
import { AdvertisementHeaderComponent } from '../advertisement-header/advertisement-header.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Apipaths } from '../../apipaths/apipaths';
import { ViewAdvertisement } from '../../../models/view-advertisement';

@Component({
  selector: 'app-advertisement-view',
  standalone: true,
  templateUrl: './advertisement-view.component.html',
  styleUrl: './advertisement-view.component.css',
  imports: [HttpClientModule, AdvertisementHeaderComponent]
})
export class AdvertisementViewComponent {
  public jobID: number = 4;

  adData!: ViewAdvertisement;

  constructor(private httpClient: HttpClient) {
    this.adData = {} as ViewAdvertisement;
  }
  
  ngOnInit() {
    this.httpClient.get(Apipaths.getJobDetails + this.jobID).subscribe((res: any) => {
      this.adData = res;

      if (this.adData == null) {
        console.log("No advertisement found");
      }

      var postDate = new Date(this.adData.posted_date);
      console.log(this.adData.posted_date);
      this.adData.posted_date = postDate.toLocaleString('default', { month: 'short' }) + " " + postDate.getDate() + ", " + postDate.getFullYear();
      
      var submissionDate = new Date(this.adData.submission_deadline);
      this.adData.submission_deadline = submissionDate.toLocaleString('default', { month: 'short' }) + " " + submissionDate.getDate() + ", " + submissionDate.getFullYear();
      
    });
  }
}
