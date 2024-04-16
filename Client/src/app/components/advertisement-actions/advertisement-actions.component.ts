import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AdvertisementServices } from '../../../services/advertisement.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advertisement-actions',
  standalone: true,
  imports: [ MatButtonModule, MatIconModule ],
  templateUrl: './advertisement-actions.component.html',
  styleUrl: './advertisement-actions.component.css'
})
export class AdvertisementActionsComponent {
  @Input() currentStatus: boolean = false;
  @Input() jobID: number = 0;

  icon: string = 'bookmark_border'; // bookmark

  seekerId: number = 0; 

  constructor(
    private advertisementServices: AdvertisementServices,
    private snackbar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    try {
      var seekerID = String(sessionStorage.getItem('user_id'));
      var user_type = String(sessionStorage.getItem('user_type'));

      if (this.seekerId == null && user_type != 'seeker'){
        this.snackbar.open("Somthing went wrong!: Invalid Login", "", {panelClass: ['app-notification-warning']})._dismissAfter(3000);
  
        // navigate to 404 page
        this.router.navigate(['/notfound']);
        // code to signout
        return;
      }

      this.seekerId = Number(seekerID);
    } catch (error) {
      this.snackbar.open("Somthing went wrong!: Invalid Login", "", {panelClass: ['app-notification-warning']})._dismissAfter(3000);
  
      // navigate to 404 page
      this.router.navigate(['/notfound']);
      // code to signout
      return;
    }
    
    if (this.currentStatus){
      this.icon = 'bookmark';
    }
    else{
      this.icon = 'bookmark_border';
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

    if (this.router.url == '/home/saved'){
      window.location.reload();
    }
  }
}
