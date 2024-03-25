import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
//import { SeekerService } from '../../../services/seeker.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
//import { NavBarComponent } from "../../shared/nav-bar/nav-bar.component";
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-seeker-edit-profile',
  standalone: true,
  imports: [MatIconModule, MatInputModule, MatFormFieldModule, FlexLayoutModule, MatCheckboxModule, MatButtonModule, MatAutocompleteModule, MatChipsModule, MatDividerModule, MatCardModule, MatSlideToggleModule, MatToolbarModule, FormsModule, MatSelectModule],
  templateUrl: './seeker-edit-profile.component.html',
  styleUrl: './seeker-edit-profile.component.css'
})
export class SeekerEditProfileComponent {

  
  // The image url of the default image
  url = '.\assets\images\SeekerEdit.jpg';

  //image upload
  onselectFile(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }

}
