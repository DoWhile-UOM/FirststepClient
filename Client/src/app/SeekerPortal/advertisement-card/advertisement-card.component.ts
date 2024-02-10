import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AdvertisementActionsComponent } from '../advertisement-actions/advertisement-actions.component';
import { MatButtonModule } from '@angular/material/button';
import { ViewAdvertisementCard } from '../../../models/view-advertisement-card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advertisement-card',
  standalone: true,
  imports: [ MatCardModule, AdvertisementActionsComponent, MatButtonModule ],
  templateUrl: './advertisement-card.component.html',
  styleUrl: './advertisement-card.component.css'
})
export class AdvertisementCardComponent implements OnInit{
  @Input() job!: ViewAdvertisementCard;
  icon: string = 'bookmark_border'; 

  constructor(private router: Router) { 
  }

  ngOnInit() : void{ 
    if (this.job.is_saved){
      this.icon = 'bookmark';
    }
    this.icon = 'bookmark';
  }

  onClickMoreDetails() {
    this.router.navigate(['/JobDetails', {jobID: this.job.advertisement_id}]);
  }
}
