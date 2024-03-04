import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormsModule, ReactiveFormsModule}  from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Country, City } from 'country-state-city';
import { AdvertisementServices } from '../../../services/advertisement.service';
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
}

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
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    CommonModule],
  templateUrl: './search-basic.component.html',
  styleUrl: './search-basic.component.css'
})
export class SearchBasicComponent implements OnInit{
  jobList: any = [];

  empTypes: string[] = ['Full-time', 'Part-time', 'Contract', 'Internship'];
	jobArrangement: string[] = ['Remote', 'On-site', 'Hybrid'];

  seekerID: string = "3"; // sample seekerID

  @Output() newItemEvent = new EventEmitter<Job[]>();

  // for location country autocomplete
	locationCountryControl = new FormControl('');
	countries: string[] = [];
	locationCountryFilteredOptions: Observable<string[]>;

	// for city autocomplete
	locationCityControl = new FormControl('');
	cities: string[] = []; 
	locationCityFilteredOptions: Observable<string[]>;

  constructor(
    private advertisementService: AdvertisementServices, 
    private snackBar: MatSnackBar) { 
    this.locationCountryFilteredOptions = this.locationCountryControl.valueChanges.pipe(
			startWith(''),
			map(value => this._filterCountry(value || '')),
		);

		this.locationCityFilteredOptions = this.locationCityControl.valueChanges.pipe(
			startWith(''),
			map(value => this._filterCity(value || '')),
		);
  }

  async ngOnInit() {
    this.countries = Country.getAllCountries().map(country => country.name);

    await this.advertisementService.getAllAdvertisements(String(this.seekerID))
      .then((response) => {
        this.jobList = response;

        if (this.jobList.length == 0) {
          console.log("No advertisements found");
        }

        this.newItemEvent.emit(this.jobList);
      });
  }

  async search(data: SearchData){
    data.country = this.locationCountryControl.value!;
    data.city = this.locationCityControl.value!;
    
    this.jobList = await this.advertisementService.searchAdsBasicAlgo(this.seekerID, data);

    if (this.jobList.length == 0) {
      this.snackBar.open("No advertisements found", "", {panelClass: ['app-notification-warning']})._dismissAfter(3000);
    }

    this.newItemEvent.emit(this.jobList);
  }

  onSelectedCountryChanged(selectedCountry: string){
		this.locationCityControl.setValue('');
		//this.locationCityFilteredOptions = new Observable<string[]>();
		this.cities = [];

		const countryCode = Country.getAllCountries().find(country => country.name === selectedCountry)?.isoCode;

		if (countryCode == undefined){
			this.snackBar.open("Error Updating City Lsit", "", {panelClass: ['app-notification-error']})._dismissAfter(3000);
			return;
		}
		
		this.cities = City.getCitiesOfCountry(countryCode)?.map(city => city.name) ?? [];

    this.snackBar.open("Update City List", "", {panelClass: ['app-notification-warning']})._dismissAfter(3000);
	}

  private _filterCountry(value: string): string[] {
		const filterValue = value.toLowerCase();

		return this.countries.filter(option => option.toLowerCase().includes(filterValue));
	}

	private _filterCity(value: string): string[] {
		const filterValue = value.toLowerCase();

		return this.cities.filter(option => option.toLowerCase().includes(filterValue));
	}
}
