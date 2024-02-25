import { Component, OnInit, ElementRef, ViewChild, inject, HostListener } from '@angular/core';
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
import { AsyncPipe, CommonModule } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatButtonModule } from '@angular/material/button';
import { Country, City } from 'country-state-city';
import { AdvertisementServices } from '../../../../services/advertisement.service';
import { JobfieldService } from '../../../../services/jobfield.service';
import { KeywordService } from '../../../../services/keyword.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { CaNavBarComponent } from '../../CompanyAdmin/ca-nav-bar/ca-nav-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxCurrencyDirective } from 'ngx-currency';
import { RichTextEditorModule, ToolbarService, LinkService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { AddSkillsComponent } from '../../../shared/add-skills/add-skills.component';

interface Field {
	field_name: string;
	field_id: number;
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
	job_description: string;
    hrManager_id: number;
    field_id: number;
    keywords: string[];
}

interface Job{
	job_number: number;
	title: string;
	country: string;
	city: string;
	employeement_type: string;
	arrangement: string;
	is_experience_required: string;
	salary: string;
	submission_deadline: string;
	posted_date: string;
	job_description: string;
	field_name: string;
	company_name: string;
}

@Component({
	selector: 'app-new-job',
	standalone: true,
	providers: [provideNativeDateAdapter(), ToolbarService, LinkService, HtmlEditorService],
	imports: [
		MatGridListModule, MatFormFieldModule, MatInputModule,
		MatDividerModule, MatCardModule, MatDatepickerModule,
		MatSelectModule, MatChipsModule, RichTextEditorModule,
		MatIconModule, MatAutocompleteModule, ReactiveFormsModule,
		AsyncPipe, MatButtonModule, FormsModule, 
		CaNavBarComponent, NgxCurrencyDirective, CommonModule, 
		AddSkillsComponent],
	templateUrl: './new-job.component.html',
	styleUrl: './new-job.component.css'
})

export class NewJobComponent{
	adData: Job = {} as Job;

	noOfCols: number = 3;
	maxTextareaCharLimit: number = 2500;
	maxTextareaHeight: number = 15;

	isUpdate: boolean = false;

	unitOfSalary: string = "LKR";

	currentDate = new FormControl(new Date());

	fields: Field[] = [];

	empTypes: string[] = ['Full-time', 'Part-time', 'Contract', 'Internship'];
	jobArrangement: string[] = ['Remote', 'On-site', 'Hybrid'];

	// sample content for description
	description: string = `
		<h2><strong>Overview</strong></h2>
			<p style="letter-spacing: 0.214286px;">Enter the job overview here.......</p>
			<br>
		<h2><strong>Qualifications</strong></h2>
			<p style="letter-spacing: 0.214286px;">Enter job qualifications here.......</p>
			<br>
		<h2><strong>Responsibilities</strong></h2>
			<p style="letter-spacing: 0.214286px;">Enter job responsibilities here.......</p>
			<br>
		<h2><strong>Benefits</strong></h2>
			<p style="letter-spacing: 0.214286px;">Enter job benefits here.......</p>
			<br>`;

	// for location country autocomplete
	locationCountryControl = new FormControl('');
	countries: string[] = [];
	locationCountryFilteredOptions: Observable<string[]>;

	// for city autocomplete
	locationCityControl = new FormControl('');
	cities: string[] = []; 
	locationCityFilteredOptions: Observable<string[]>;

	// for keywords
	separatorKeysCodes: number[] = [ COMMA, ENTER ];
	keywordCtrl = new FormControl('');
	filteredkeywords: Observable<string[]>;
	filteredkeywordslength: number = 0;
	keywords: string[] = [];
	allkeywords: string[] = [];
	@ViewChild('keywordInput') keywordInput!: ElementRef<HTMLInputElement>;
	announcer = inject(LiveAnnouncer);

	public tools: object = {
        type: 'Expand',
        items: ['Bold', 'Italic', 'Underline', 'StrikeThrough', 'LowerCase', 'UpperCase', '|',
			'Formats', 'Alignments', 'OrderedList', 'UnorderedList', 'Outdent', 'Indent', '|',
			'CreateLink', '|', 'ClearFormat', '|', 'Undo', 'Redo']
		};

	constructor(
		private advertisementService: AdvertisementServices,
		private jobFieldService: JobfieldService, 
		private keywordService: KeywordService, 
		private router: Router, 
		private acRouter: ActivatedRoute,
		private snackBar: MatSnackBar) {

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

	async setupForUpdate(jobID: string){
		this.adData = await this.advertisementService.getAdvertisementById(jobID);
		//alert("Job ID: " + jobID + " Title: " + this.adData.title);
		this.isUpdate = true;

		this.locationCountryControl.setValue(this.adData.country);
		this.locationCityControl.setValue(this.adData.city);

		this.description = this.adData.job_description;
	}

	async ngOnInit() {
		// get all fields from the database
		await this.jobFieldService.getAll()
			.then((response) => {
				this.fields = response;
				console.log(this.fields);
			});

		// get all country names using an external API
		this.countries = Country.getAllCountries().map(country => country.name);

		let jobID: string | null = this.acRouter.snapshot.paramMap.get('jobID');

		if (jobID != null){
			this.setupForUpdate(jobID);
		}
		else{
			this.isUpdate = false;
		}
	}

	@HostListener('window:resize', ['$event'])
	onResize() {
		// resize the grid list based on the window size
		if (window.innerWidth < window.innerHeight){
			this.noOfCols = 1;
		}
		else {
			this.noOfCols = window.innerWidth < 768 ? 2 : 3;
		}
	}

	async onChangeField(selectedField: number) {
		// load the keywords for the selected field
		// put loading animation
		this.keywords = [];
		this.allkeywords = await this.keywordService.getAllKeywords(selectedField);
	}

	onSelectedCountryChanged(selectedCountry: string){
		this.locationCityControl.setValue('');
		//this.locationCityFilteredOptions = new Observable<string[]>();
		this.cities = [];

		const countryCode = Country.getAllCountries().find(country => country.name === selectedCountry)?.isoCode;

		if (countryCode == undefined){
			this.snackBar.open("Error Updating City Lsit")._dismissAfter(3000);
			return;
		}
		
		this.cities = City.getCitiesOfCountry(countryCode)?.map(city => city.name) ?? [];

		this.snackBar.open("Update City List")._dismissAfter(3000);
	}

  	async createNewJob(addAdvertisement: AddJob){
		addAdvertisement.keywords = this.keywords;
		addAdvertisement.hrManager_id = 10; // sample hrManager_id

		addAdvertisement.city = this.locationCityControl.value ?? '';
		addAdvertisement.country = this.locationCountryControl.value ?? '';
		addAdvertisement.job_description = this.description;

		if (addAdvertisement.city == '' || addAdvertisement.country == ''){
			alert('Input Error: Location is required');
			return;
		}

		if (addAdvertisement.submission_deadline != ""){	
			addAdvertisement.submission_deadline = new Date(addAdvertisement.submission_deadline).toISOString();

			if (addAdvertisement.submission_deadline < new Date().toISOString()){
				alert('Input Error: Submission deadline should be a future date');
				return;
			}
		}

		if (addAdvertisement.job_description.length > this.maxTextareaCharLimit){
			this.snackBar.open("Error: Description is too long", "", {panelClass: ['app-notification-error']})._dismissAfter(3000);
			return;
		}

		console.log(addAdvertisement);
		
		let response: boolean = await this.advertisementService.addNewJob(addAdvertisement);

		if (response){
			this.router.navigate(['/newJobUploaded']);
		}
		else{
			this.snackBar.open("Error Uploading Job", "", {panelClass: ['app-notification-error']})._dismissAfter(3000);
		}	
  	}

	add(event: MatChipInputEvent): void {
		const value = (event.value || '').trim();

		// Add our keyword
		if (value && value.length > 0) {
			this.keywords.push(value);
		}

		// Clear the input value
		//event.chipInput!.clear();

		this.keywordCtrl.setValue(null);
	}

	remove(keyword: string): void {
		const index = this.keywords.indexOf(keyword);

		if (index >= 0) {
			this.keywords.splice(index, 1);

			this.announcer.announce(`Removed ${keyword}`);
		}
		else{

			alert(`Keyword not found`);
		}
	}

	selected(event: MatAutocompleteSelectedEvent): void {
		var inputFieldValue = this.keywordInput.nativeElement.value;
		if (inputFieldValue.length > 0){
			this.remove(inputFieldValue);
		}

		this.keywords.push(event.option.viewValue);
		this.keywordInput.nativeElement.value = '';
		this.keywordCtrl.setValue(null);
	}

	private _filterKeyword(value: string): string[] {
		const filterValue = value.toLowerCase();

		var filtered = this.allkeywords.filter(keyword => keyword.toLowerCase().includes(filterValue));
		this.filteredkeywordslength = filtered.length;

		return filtered;
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
