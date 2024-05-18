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
import { AdvertisementServices } from '../../../services/advertisement.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { Router } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';

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
    CommonModule,
    SpinnerComponent,
    MatSliderModule,
    MatExpansionModule,
    MatChipsModule],
  templateUrl: './search-basic.component.html',
  styleUrl: './search-basic.component.css'
})
export class SearchBasicComponent implements OnInit{
validateSelectedCountry(arg0: string) {
throw new Error('Method not implemented.');
}
  @Input() pageSize: number = 10;
  
  jobList: any = [];
  jobIdList: number[] = [];

  filters: string[] = ['Employment Type', 'Job Arrangement', 'Country', 'City', 'Distance', 'Posted Date', 'Company Name', 'Field Name', 'Title'];

  empTypes: string[] = AdvertisementServices.employment_types;
	jobArrangement: string[] = AdvertisementServices.job_arrangement;

  seekerID: string = ''; 

  @Output() newItemEvent = new EventEmitter<Job[]>();
  @Output() changePaginatorLengthEvent = new EventEmitter<number>();

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
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private router: Router) { 
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
    this.spinner.show();

    try {
      this.seekerID = String(sessionStorage.getItem('user_id'));
      var user_type = String(sessionStorage.getItem('user_type'));

      if (this.seekerID == null && user_type != 'seeker'){
        this.snackBar.open("Somthing went wrong!: Invalid Login", "", {panelClass: ['app-notification-warning']})._dismissAfter(3000);
  
        // navigate to 404 page
        this.router.navigate(['/notfound']);
        // code to signout

        this.spinner.hide();
        return;
      }
    } catch (error) {
      this.snackBar.open("Somthing went wrong!: Invalid Login", "", {panelClass: ['app-notification-warning']})._dismissAfter(3000);
  
      // navigate to 404 page
      this.router.navigate(['/notfound']);
      // code to signout

      this.spinner.hide();
      return;
    }    

    this.countries = Country.getAllCountries().map(country => country.name);

    await this.advertisementService.getSeekerHomePage(String(this.seekerID), String(this.pageSize))
      .then((response) => {
        this.jobList = response.firstPageAdvertisements;
        this.jobIdList = response.allAdvertisementIds;

        if (this.jobList.length == 0) {
          console.log("No advertisements found");
        }

        this.newItemEvent.emit(this.jobList);
        this.changePaginatorLengthEvent.emit(this.jobIdList.length);
      });

    this.spinner.hide();
  }

  async search(data: SearchData){
    data.country = this.locationCountryControl.value!;
    data.city = this.locationCityControl.value!;

    // validate location
    if (this.countries.indexOf(data.country) == -1){
			this.snackBar.open("Input Error: Invalid Country", "", {panelClass: ['app-notification-error']});
			return;
		}
		else if (this.cities.indexOf(data.city) == -1){
			this.snackBar.open("Input Error: Invalid City", "", {panelClass: ['app-notification-error']});
			return;
		}

    this.spinner.show();
    
    var response = await this.advertisementService.searchAdsBasicAlgo(this.seekerID, data, String(this.pageSize));

    if (response == null) {
      this.snackBar.open("No advertisements found", "", {panelClass: ['app-notification-warning']})._dismissAfter(3000);
      return;
    }

    this.snackBar.open("Loading Search Results", "", {panelClass: ['app-notification-normal']})._dismissAfter(3000);
    
    this.jobList = response.firstPageAdvertisements;
    this.jobIdList = response.allAdvertisementIds;

    this.newItemEvent.emit(this.jobList);
    this.changePaginatorLengthEvent.emit(this.jobIdList.length);

    this.spinner.hide();
  }

  public async changePaginator(startIndex: number, endIndex: number){
    this.spinner.show();

    this.jobList = await this.advertisementService.getAllAdvertisementsWithPaginator(this.seekerID, this.jobIdList.slice(startIndex, endIndex));
    this.newItemEvent.emit(this.jobList);

    this.spinner.hide();
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

    this.spinner.show();

		const countryCode = Country.getAllCountries().find(country => country.name === selectedCountry)?.isoCode;

		if (countryCode == undefined){
      this.snackBar.open("Invalid Country", "", {panelClass: ['app-notification-eror']})._dismissAfter(3000);
      this.locationCountryControl.setValue('');
      
      this.spinner.hide();
			return;
		}
		
		this.cities = City.getCitiesOfCountry(countryCode)?.map(city => city.name) ?? [];

    this.snackBar.open("Reset City List", "", {panelClass: ['app-notification-warning']})._dismissAfter(3000);

    this.spinner.hide();
	}

  distanceStepper(value: number): string {
    if (value > 100){
      return 'Any';
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

  showAllFilters(){

  }
}
