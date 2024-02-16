import { Component } from '@angular/core';
import { AdvertisementHeaderComponent } from '../../shared/advertisement-header/advertisement-header.component';
import { AdvertisementViewComponent } from '../../shared/advertisement-view/advertisement-view.component';
import { ViewAdvertisement } from '../../../models/view-advertisement';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Apipaths } from '../../apipaths/apipaths';
import { ActivatedRoute } from '@angular/router';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';

@Component({
  selector: 'app-advertisement-view-page',
  standalone: true,
  imports: [AdvertisementHeaderComponent, AdvertisementViewComponent, HttpClientModule,NavBarComponent],
  templateUrl: './advertisement-view-page.component.html',
  styleUrl: './advertisement-view-page.component.css'
})
export class AdvertisementViewPageComponent {
  adData!: ViewAdvertisement;

  constructor(private httpClient: HttpClient, private router: ActivatedRoute) {
    this.adData = {} as ViewAdvertisement;
  }
  
  ngOnInit() {
    let jobID: string | null = this.router.snapshot.paramMap.get('jobID');

    this.httpClient.get(Apipaths.getJobDetails + jobID).subscribe((res: any) => {
      this.adData = res;

      try {
        var postDate = new Date(this.adData.posted_date);
        console.log(this.adData.posted_date);
        this.adData.posted_date = postDate.toLocaleString('default', { month: 'short' }) + " " + postDate.getDate() + ", " + postDate.getFullYear();
        
        var submissionDate = new Date(this.adData.submission_deadline);
        this.adData.submission_deadline = submissionDate.toLocaleString('default', { month: 'short' }) + " " + submissionDate.getDate() + ", " + submissionDate.getFullYear();

        if (this.adData.is_experience_required == "1") {
          this.adData.is_experience_required = "Required";
        }
        else{
          this.adData.is_experience_required = "Not Required";
        }
        
      } catch (error) {
        console.log("No advertisement found");
      }

    });
  }
}
