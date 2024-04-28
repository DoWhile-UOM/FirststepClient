import { Component } from '@angular/core';
import { AdvertisementCardComponent } from '../advertisement-card/advertisement-card.component';
import { CommonModule } from '@angular/common';
import { AdvertisementServices } from '../../../services/advertisement.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  selector: 'app-saved-advertisement-list',
  standalone: true,
  imports: [AdvertisementCardComponent, CommonModule, SpinnerComponent],
  templateUrl: './saved-advertisement-list.component.html',
  styleUrl: './saved-advertisement-list.component.css'
})
export class SavedAdvertisementListComponent {
  jobList: Job[] = [];

  seekerID: number = 3; // sample seekerID

  constructor(
    private advertisementService: AdvertisementServices, 
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar) {}

  async ngOnInit(){
    this.spinner.show();

    await this.advertisementService.getSavedAdvertisements(String(this.seekerID))
      .then((response) => {
        this.jobList = response;

        if (this.jobList.length == 0) {
          this.snackBar.open("No advertisements found", "", {panelClass: ['app-notification-warning']})._dismissAfter(3000);
        }
      });

    this.spinner.hide();
  }
}
