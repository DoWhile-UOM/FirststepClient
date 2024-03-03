import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Country, City } from 'country-state-city';
import { AdvertisementServices } from '../../../services/advertisement.service';

interface SearchData{
  title: string;
  employeement_type: string;
  arrangement: string;
  country: string;
  city: string;
}

@Component({
  selector: 'app-search-basic',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    CommonModule],
  templateUrl: './search-basic.component.html',
  styleUrl: './search-basic.component.css'
})
export class SearchBasicComponent implements OnInit{
  empTypes: string[] = ['Full-time', 'Part-time', 'Contract', 'Internship'];
	jobArrangement: string[] = ['Remote', 'On-site', 'Hybrid'];

  seekerID: string = "4"; // sample seekerID

  jobList: any = [];

  constructor(private advertisementService: AdvertisementServices) { }

  async ngOnInit() {
    var result: any;

    await this.advertisementService.getAllAdvertisements(String(this.seekerID))
      .then((response) => {
        result = response;

        if (this.jobList.length == 0) {
          console.log("No advertisements found");
        }
      });

    if (result != null){
      this.jobList = result;
    }
  }

  async search(data: SearchData){
    this.jobList = await this.advertisementService.searchAdsBasicAlgo(this.seekerID, data);
  }
}
