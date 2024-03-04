import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Observable, Subscribable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { HttpClient } from '@angular/common/http';

import { MatIconRegistry } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { SeekerService } from '../../../services/seeker.service';
import { Axios } from 'axios';


@Component({
  selector: 'app-seeker-edit-profile',
  standalone: true, 
  imports: [MatIconModule, MatInputModule, MatFormFieldModule, FlexLayoutModule, MatCheckboxModule, MatButtonModule, MatAutocompleteModule, MatChipsModule, MatDividerModule, MatCardModule],
  templateUrl: './seeker-edit-profile.component.html',
  styleUrl: './seeker-edit-profile.component.css'
})


export class SeekerEditProfileComponent implements OnInit{
 
  url = "./assets/images/SeekerEdit.jpg";

  constructor(private seekerService: SeekerService) { }

  async ngOnInit() {
    let seekerID = 4; // sample seeker id
    let seekerData = await this.seekerService.getSeeker(seekerID);
    console.log(seekerData);
  }
  
  onselectFile(event: any){
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      
    }
  }

  // constructor(private seekerService: seekerservice) { }
  

}














    
  
