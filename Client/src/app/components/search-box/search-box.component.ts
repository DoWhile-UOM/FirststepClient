import { Component, OnInit, Output, EventEmitter, Input  } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSliderModule } from '@angular/material/slider';
import { AdvertisementServices } from '../../../services/advertisement.service';

@Component({
  selector: 'app-search-box',
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
    CommonModule,
    MatSliderModule],
    templateUrl: './search-box.component.html',
    styleUrl: './search-box.component.css'
})

export class SearchBoxComponent{
  empTypes: string[] = AdvertisementServices.employment_types;
	jobArrangement: string[] = AdvertisementServices.job_arrangement;

  // for location country autocomplete
	locationCountryControl = new FormControl('');
	countries: string[] = [];
	locationCountryFilteredOptions: Observable<string[]>;

	// for city autocomplete
	locationCityControl = new FormControl('');
	cities: string[] = []; 
	locationCityFilteredOptions: Observable<string[]>;

  distance: number = 0;

  constructor(
    private advertisementService: AdvertisementServices, 
    private snackBar: MatSnackBar,) { 
    this.locationCountryFilteredOptions = this.locationCountryControl.valueChanges.pipe(
			startWith(''),
			map(value => this._filterCountry(value || '')),
		);

		this.locationCityFilteredOptions = this.locationCityControl.valueChanges.pipe(
			startWith(''),
			map(value => this._filterCity(value || '')),
		);
  }

  validateSelectedCountry(selectedCountry: string){
    if (selectedCountry == undefined || selectedCountry == ''){
      this.snackBar.open("Invalid Country", "", {panelClass: ['app-notification-eror']})._dismissAfter(3000);
      return;
    }
    else if (this.countries.indexOf(selectedCountry) == -1){
      this.snackBar.open("Invalid Country", "", {panelClass: ['app-notification-eror']})._dismissAfter(3000);
      return;
    }
  }

  onSelectedCountryChanged(selectedCountry: string){
    // check whether the selected country is valid
    if (selectedCountry == undefined || selectedCountry == ''){
      return;
    }
    else if (this.countries.indexOf(selectedCountry) == -1){
      return;
    }

		this.locationCityControl.setValue('');
		this.cities = [];

		const countryCode = Country.getAllCountries().find(country => country.name === selectedCountry)?.isoCode;

		if (countryCode == undefined){
      this.snackBar.open("Invalid Country", "", {panelClass: ['app-notification-eror']})._dismissAfter(3000);
      this.locationCountryControl.setValue('');
			return;
		}
		
		this.cities = City.getCitiesOfCountry(countryCode)?.map(city => city.name) ?? [];

    this.snackBar.open("Reset City List", "", {panelClass: ['app-notification-warning']})._dismissAfter(3000);
	}

  distanceStepper(value: number): string {
    if (value > 100){
      return '100km+';
    }

    return String(value) + 'km';
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
