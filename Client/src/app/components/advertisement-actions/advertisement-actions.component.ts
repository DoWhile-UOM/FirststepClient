import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AdvertisementServices } from '../../../services/advertisement.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { SeekerApplicationFormComponent } from '../seeker-application-form/seeker-application-form.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-advertisement-actions',
  standalone: true,
  imports: [ MatButtonModule, MatIconModule, MatBadgeModule, CommonModule, MatChipsModule],
  templateUrl: './advertisement-actions.component.html',
  styleUrl: './advertisement-actions.component.css'
})
export class AdvertisementActionsComponent {

  @Input() currentStatus: boolean = false;
  @Input() expired: boolean = false;
  @Input() jobID: number = 0;
  @Input() applicationStatus: string = 'accepted';

  // for send data to the advertisement header
  @Input() company_name: string = "";
  @Input() job_title: string = "";
  @Input() job_field: string = "";

  icon: string = 'bookmark_border'; // bookmark
  isApplicationPage: boolean = false;

  seekerId: number = 0; 

  constructor(
    private advertisementServices: AdvertisementServices,
    private snackbar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    private auth: AuthService) { }

  ngOnInit() {
    this.seekerId = Number(this.auth.getUserId());
    
    if (this.currentStatus){
      this.icon = 'bookmark';
    }
    else{
      this.icon = 'bookmark_border';
    }

    if (this.router.url == '/seeker/applied'){
      this.isApplicationPage = true;
    }
  }

  async saveAdvertisement(){
    await this.advertisementServices.saveAdvertisement(String(this.jobID), String(this.seekerId), true);
    this.icon = 'bookmark';
    this.snackbar.open("Saved job...", "", {panelClass: ['app-notification-normal']})._dismissAfter(3000);
    this.currentStatus = true;
  }

  async unsaveAdvertisement(){
    await this.advertisementServices.saveAdvertisement(String(this.jobID), String(this.seekerId), false);
    this.icon = 'bookmark_border';
    this.snackbar.open("Unsaved job...", "", {panelClass: ['app-notification-normal']})._dismissAfter(3000);
    this.currentStatus = false;

    if (this.router.url == '/seeker/saved'){
      window.location.reload();
    }
  }

   async onClickApply() {
    const dialog=this.dialog.open(SeekerApplicationFormComponent,{
      maxWidth: '100em',
      data: {
        jobID: this.jobID, 
        seekerID: this.seekerId, 
        company_name: this.company_name, 
        job_title: this.job_title, 
        job_field: this.job_field}
    }); 
  }

  trackApplication() {
    //open dialog to track application
    this.dialog.open(SeekerApplicationFormComponent,{
      maxWidth: '100em',
      data: {
        company_name: this.company_name, 
        job_title: this.job_title, 
        job_field: this.job_field,
        }
    });

    }
}

