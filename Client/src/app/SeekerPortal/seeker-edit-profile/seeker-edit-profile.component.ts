import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import {  MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { SeekerService } from '../../../services/seeker.service';


@Component({
  selector: 'app-seeker-edit-profile',
  standalone: true, 
  imports: [MatIconModule, MatInputModule, MatFormFieldModule, FlexLayoutModule, MatCheckboxModule, MatButtonModule, MatAutocompleteModule, MatChipsModule, MatDividerModule, MatCardModule],
  templateUrl: './seeker-edit-profile.component.html',
  styleUrl: './seeker-edit-profile.component.css'
})


export class SeekerEditProfileComponent implements OnInit{

 // The image url of the default image
  url = "./assets/images/SeekerEdit.jpg";

  //image upload 
  onselectFile(event: any){
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      
    }
  }

  //constructor for seeker service
  constructor(private seekerService: SeekerService) { }

  //get method
  async ngOnInit() {
    let seekerID = 13; // sample seeker id
    let seekerData = await this.seekerService.getSeeker(seekerID);
    console.log(seekerData);
  }

  //update method or post method

  
  //delete method

  
}














    
  
