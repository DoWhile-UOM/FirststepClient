import { Component, OnInit, ElementRef, ViewChild, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';
import { FormControl, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatButtonModule } from '@angular/material/button';
import { AdvertisementServices } from '../../../../services/advertisement.service';
import { JobfieldService } from '../../../../services/jobfield.service';

interface Field {
  	fieldName: string;
  	fieldID: number;
}

interface AddJob {
	ob_number: number;
    title: string;
    country: string;
    city: string;
    employeement_type: string;
    arrangement: string;
    is_experience_required: boolean;
    salary: number;
    submission_deadline: string;
    job_overview: string;
    job_responsibilities: string;
    job_qualifications: string;
    job_benefits: string;
    job_other_details: string;
    hrManager_id: number;
    field_id: number;
    keywords: string[];
}

@Component({
	selector: 'app-new-job',
	standalone: true,
	providers: [provideNativeDateAdapter()],
	imports: [
		MatGridListModule, MatFormFieldModule, MatInputModule,
		MatDividerModule, MatCardModule, MatDatepickerModule,
		MatSelectModule, MatChipsModule,
		MatIconModule, MatAutocompleteModule, ReactiveFormsModule,
		AsyncPipe, MatButtonModule, FormsModule],
	templateUrl: './new-job.component.html',
	styleUrl: './new-job.component.css'
})

export class NewJobComponent{
	noOfCols: number = 3;
	maxTextareaWordLimit: number = 200;
	maxTextareaHeight: number = 15;

	unitOfSalary: string = "LKR";

	fields: Field[] = [];

	empTypes: string[] = ['Full-time', 'Part-time', 'Contract', 'Internship'];
	jobArrangement: string[] = ['Remote', 'On-site', 'Hybrid'];

	// for location country autocomplete
	locationCountryControl = new FormControl('');
	countries: string[] = ['Sri Lanka', 'USA', 'Norway']; // need a function to get all countries
	locationCountryFilteredOptions: Observable<string[]>;

	// for city country autocomplete
	locationCityControl = new FormControl('');
	cities: string[] = ['Colombo', 'Kandy', 'Moratuwa', 'Mount Lavinia', 'Mathara', 'Kadawatha']; // need a function to get cities of a country
	locationCityFilteredOptions: Observable<string[]>;

	// for keywords
	separatorKeysCodes: number[] = [ENTER, COMMA];
	keywordCtrl = new FormControl('');
	filteredkeywords: Observable<string[]>;
	keywords: string[] = [];
	allkeywords: string[] = [];
	@ViewChild('keywordInput') keywordInput!: ElementRef<HTMLInputElement>;
	announcer = inject(LiveAnnouncer);

	constructor(
		private advertisementService: AdvertisementServices,
		private jobFieldService: JobfieldService) {

		this.filteredkeywords = this.keywordCtrl.valueChanges.pipe(
			startWith(null),
			map((keyword: string | null) => (keyword ? this._filterKeyword(keyword) : this.allkeywords.slice())),
		);

		this.locationCountryFilteredOptions = this.locationCountryControl.valueChanges.pipe(
			startWith(''),
			map(value => this._filterCountry(value || '')),
		);

		this.locationCityFilteredOptions = this.locationCityControl.valueChanges.pipe(
			startWith(''),
			map(value => this._filterCity(value || '')),
		);
	}

	add(event: MatChipInputEvent): void {
		const value = (event.value || '').trim();

		// Add our keyword
		if (value) {
		this.keywords.push(value);
		}

		// Clear the input value
		event.chipInput!.clear();

		this.keywordCtrl.setValue(null);
	}

	remove(keyword: string): void {
		const index = this.keywords.indexOf(keyword);

		if (index >= 0) {
		this.keywords.splice(index, 1);

		this.announcer.announce(`Removed ${keyword}`);
		}
	}

	selected(event: MatAutocompleteSelectedEvent): void {
		this.keywords.push(event.option.viewValue);
		this.keywordInput.nativeElement.value = '';
		this.keywordCtrl.setValue(null);
	}

	private _filterKeyword(value: string): string[] {
		const filterValue = value.toLowerCase();

		return this.allkeywords.filter(keyword => keyword.toLowerCase().includes(filterValue));
	}

	private _filterCountry(value: string): string[] {
		const filterValue = value.toLowerCase();

		return this.countries.filter(option => option.toLowerCase().includes(filterValue));
	}

	private _filterCity(value: string): string[] {
		const filterValue = value.toLowerCase();

		return this.cities.filter(option => option.toLowerCase().includes(filterValue));
	}

	async ngOnInit() {
		await this.jobFieldService.getAll()
			.then((response) => {
				this.fields = response;
			});
	}

	async onChangeField(selectedField: string) {
		// call the api to get all keywords for the selected field
		/*
		try{
			this.httpClient.get(Apipaths.getKeywords + selectedField).subscribe((res: any) => {
				this.allkeywords = res;
			});
		}
		catch (e){
			console.log(e);
		}*/
	}

  	async createNewJob(addAdvertisement: AddJob){
		addAdvertisement.keywords = this.keywords;
		addAdvertisement.hrManager_id = 10; // sample hrManager_id

		addAdvertisement.city = this.locationCityControl.value ?? '';
		addAdvertisement.country = this.locationCountryControl.value ?? '';

		if (addAdvertisement.city == '' || addAdvertisement.country == ''){
			alert('Location is required');
			return;
		}

		console.log(addAdvertisement);
		if (addAdvertisement.submission_deadline != ""){	
			addAdvertisement.submission_deadline = new Date(addAdvertisement.submission_deadline).toISOString();
		}
		
		await this.advertisementService.addNewJob(addAdvertisement);
		/*
		this.httpClient.post(Apipaths.addNewJob, addAdvertisement).subscribe({
			next: data => {
				alert('New Job Created under company');
			},
			error: error => {
				alert('Error occured ' + error.manage);
				console.error('Error occured', error);

			}
		});*/
  	}
}