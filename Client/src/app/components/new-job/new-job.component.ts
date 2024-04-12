import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, inject, HostListener } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';
import { FormControl, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatButtonModule } from '@angular/material/button';
import { Country, City } from 'country-state-city';
import { AdvertisementServices } from '../../../services/advertisement.service';
import { JobfieldService } from '../../../services/jobfield.service';
import { KeywordService } from '../../../services/keyword.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxCurrencyDirective } from 'ngx-currency';
import { RichTextEditorModule, ToolbarService, LinkService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { AddSkillsComponent } from '../add-skills/add-skills.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { countries } from 'country-data';


interface Field {
	field_name: string;
	field_id: number;
}

interface AddJob {
	job_number: number;
    title: string;
    country: string;
    city: string;
    employeement_type: string;
    arrangement: string;
    is_experience_required: boolean;
    salary: number;
	currency_unit: string;
    submission_deadline: string;
	job_description: string;
    hrManager_id: number;
    field_id: number;
    keywords: string[];
	reqSkills: string[];
}

interface UpdateJob{
	job_number: number;
	title: string;
	country: string;
	city: string;
	employeement_type: string;
	arrangement: string;
	is_experience_required: string;
	salary: string;
	currency_unit: string;
	submission_deadline: string;
	posted_date: string;
	job_description: string;
	field_id: string;
	company_name: string;
	reqSkills: string[];
	reqKeywords: string[];
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
		NgxCurrencyDirective, CommonModule, AddSkillsComponent,
		SpinnerComponent],
	templateUrl: './new-job.component.html',
	styleUrl: './new-job.component.css'
})

export class NewJobComponent implements AfterViewInit, OnInit{
	adData: UpdateJob = {} as UpdateJob;

	noOfCols: number = 3;
	maxTextareaCharLimit: number = 4000;
	maxTextareaHeight: number = 15;

	isUpdate: boolean = false;
	jobID: string = '';

	currentDate = new FormControl(new Date());

	fields: Field[] = [];
	currencyUnits: string[] = [];

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
	keywords: string[] = [];
	allkeywords: string[] = [];
	@ViewChild('keywordInput') keywordInput!: ElementRef<HTMLInputElement>;
	announcer = inject(LiveAnnouncer);

	skills: string[] = [];
	@ViewChild(AddSkillsComponent) addSkillsComponent!: AddSkillsComponent;

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
		private snackBar: MatSnackBar,
		private spinner: NgxSpinnerService) {

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
		var adData: UpdateJob = await this.advertisementService.getAdvertisementByIDwithKeywords(jobID);
		
		if (adData.title != undefined){
			this.isUpdate = true;
			this.adData = adData;
			this.locationCountryControl.setValue(adData.country);
			this.skills = this.removeDuplicates(adData.reqSkills);
			this.description = adData.job_description;

			await this.onChangeField(Number(adData.field_id));
			this.keywords = adData.reqKeywords;

			this.onSelectedCountryChanged(adData.country);
			this.locationCityControl.setValue(adData.city);
		}
		else{
			this.router.navigate(['notfound']);
		}
	}

	async ngOnInit() {
		await this.loadData();
	}

	async loadData(){
		this.spinner.show();

		// get all fields from the database
		await this.jobFieldService.getAll()
			.then((response) => {
				this.fields = response;
			});

		// get all country names using an external API
		this.countries = Country.getAllCountries().map(country => country.name);
		
		if (!this.isUpdate){
			// get all currency units of the world
			this.currencyUnits = countries.all.map(country => country.currencies[0]).filter((value, index, self) => self.indexOf(value) === index);
		}

		let jobID: string | null = this.acRouter.snapshot.paramMap.get('jobID');

		if (jobID != null){
			this.setupForUpdate(jobID);
			this.jobID = jobID;
		}
		else{
			this.isUpdate = false;
		}

		this.spinner.hide();
	}

	onBackButtonClick(){
		window.history.back();
	}

	ngAfterViewInit() {
		this.skills = this.removeDuplicates(this.addSkillsComponent.skills);
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
		this.spinner.show();

		this.keywords = [];
		this.allkeywords = await this.keywordService.getAllKeywords(selectedField);

		this.spinner.hide();
	}

	async onSelectedCountryChanged(selectedCountry: string){
		this.spinner.show();

		this.locationCityControl.setValue('');
		this.cities = [];
		this.adData.currency_unit = (this.isUpdate) ? this.adData.currency_unit : '';

		const countryCode = Country.getAllCountries().find(country => country.name === selectedCountry)?.isoCode;

		if (countryCode == undefined){
			this.snackBar.open("Error: Country not found", "", {panelClass: ['app-notification-error']})._dismissAfter(3000);
			return;
		}

		if (!this.isUpdate){
			this.adData.currency_unit = countries[countryCode].currencies[0];
		}

		this.cities = this.removeDuplicates(City.getCitiesOfCountry(countryCode)?.map(city => city.name) ?? []);

		this.spinner.hide();
	}

  	async createNewJob(addAdvertisement: AddJob){
		this.spinner.show();

		addAdvertisement.keywords = this.removeDuplicates(this.keywords);
		addAdvertisement.reqSkills = this.removeDuplicates(this.skills);
		
		try {
			addAdvertisement.hrManager_id = sessionStorage.getItem('user_id') == null ? 0 : Number(sessionStorage.getItem('user_id'));
		
			if (addAdvertisement.hrManager_id == 0){
				this.snackBar.open("Somthing went wrong!: Invalid Login", "", {panelClass: ['app-notification-error']})._dismissAfter(3000);
	
				// code to signout the user
				return;
			}
		} catch (error) {
			//console.log(error); //raises the error
			this.snackBar.open("Somthing went wrong!: Invalid Login", "", {panelClass: ['app-notification-warning']})._dismissAfter(3000);
			this.router.navigate(['/notfound']);
			return;
		}

		addAdvertisement.city = this.locationCityControl.value ?? '';
		addAdvertisement.country = this.locationCountryControl.value ?? '';
		addAdvertisement.job_description = this.description;

		if (this.validateInput(addAdvertisement) == false){
			return;
		}
		
		let response: boolean = await this.advertisementService.addNewJob(addAdvertisement);

		if (response){
			this.router.navigate(['ca/jobOfferList/Uploaded']);
		}
		else{
			this.snackBar.open("Error Uploading Job", "", {panelClass: ['app-notification-error']})._dismissAfter(3000);
		}	

		this.spinner.hide();
  	}

	async updateJob(adData: UpdateJob){
		this.spinner.show();

		adData.reqKeywords = this.removeDuplicates(this.keywords);
		adData.reqSkills = this.removeDuplicates(this.skills);

		adData.city = this.locationCityControl.value ?? '';
		adData.country = this.locationCountryControl.value ?? '';
		adData.job_description = this.description;

		if (this.validateInput(adData) == false){
			return;
		}

		let response: boolean = await this.advertisementService.updateAdvertisement(adData, this.jobID);

		if (response){
			this.router.navigate(['ca/jobOfferList/Uploaded']);
		}
		else{
			this.snackBar.open("Error Updating Job Details", "", {panelClass: ['app-notification-error']})._dismissAfter(3000);
		}

		this.spinner.hide();
	}

	validateInput(adData: any){
		if (adData.city == '' || adData.country == ''){
			this.snackBar.open("Input Error: Location is required", "", {panelClass: ['app-notification-error']})._dismissAfter(3000);
			return false;
		}

		if (adData.submission_deadline != ""){	
			adData.submission_deadline = new Date(adData.submission_deadline).toISOString();

			if (adData.submission_deadline < new Date().toISOString()){
				this.snackBar.open("Input Error: Submission deadline should be a future date", "", {panelClass: ['app-notification-error']})._dismissAfter(3000);
				return false;
			}
		}

		if (adData.job_description.length > this.maxTextareaCharLimit){
			this.snackBar.open("Error: Description is too long", "", {panelClass: ['app-notification-error']})._dismissAfter(3000);
			return false;
		}

		return true;
	}

	changeSkillsArray($event: Event){
		var skills = $event;
		if (skills != null){
			let skillArray = skills as unknown as string[];
			this.skills = this.removeDuplicates(skillArray);
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

		return this.allkeywords.filter(keyword => keyword.toLowerCase().includes(filterValue));
	}

	private _filterCountry(value: string): string[] {
		const filterValue = value.toLowerCase();

		return this.countries.filter(option => option.toLowerCase().includes(filterValue));
	}

	private _filterCity(value: string): string[] {
		this.spinner.show();

		const filterValue = value.toLowerCase();
		const cityArr = this.cities.filter(option => option.toLowerCase().includes(filterValue));

		this.spinner.hide();

		return cityArr;
	}

	removeDuplicates(arr: string[]) {
		let uniqueArr = Array.from(new Set(arr));

		if (uniqueArr.length != arr.length){
			this.snackBar.open("Removed Duplicate Keywords and Skills", "", {panelClass: ['app-notification-warning']})._dismissAfter(3000);
		}

		return uniqueArr;
	}
}
