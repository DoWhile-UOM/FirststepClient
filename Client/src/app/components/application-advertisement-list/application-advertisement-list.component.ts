import { Component } from '@angular/core';
import { AdvertisementCardComponent } from '../advertisement-card/advertisement-card.component';
import { CommonModule } from '@angular/common';
import { AdvertisementServices } from '../../../services/advertisement.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';

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
  application_id: number;
  application_status: string;
}

@Component({
  selector: 'app-application-advertisement-list',
  standalone: true,
  imports: [AdvertisementCardComponent, CommonModule, SpinnerComponent],
  templateUrl: './application-advertisement-list.component.html',
  styleUrl: './application-advertisement-list.component.css'
})
export class ApplicationAdvertisementListComponent {
  jobList: Job[] = [];

  constructor(
    private advertisementService: AdvertisementServices, 
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar, 
    private auth: AuthService) {}

  async ngOnInit(){
    this.spinner.show();

    var seekerID = this.auth.getUserId();

    await this.advertisementService.getAppliedAdvertisements(String(seekerID))
      .then((response) => {
        this.jobList = response;

        if (this.jobList.length == 0) {
          this.snackBar.open("No advertisements found", "", {panelClass: ['app-notification-warning']})._dismissAfter(3000);
        }
      });

    this.spinner.hide();
  }
}
