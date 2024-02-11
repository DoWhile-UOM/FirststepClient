import { Component, OnInit, ElementRef, ViewChild, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

interface Field {
  fieldName: string;
  fieldID: number; 
}

@Component({
  selector: 'app-new-job',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ 
    MatGridListModule, MatFormFieldModule, MatInputModule, 
    MatDividerModule, MatCardModule, MatDatepickerModule, 
    MatSelectModule, HttpClientModule, MatChipsModule, 
    MatIconModule, MatAutocompleteModule, ReactiveFormsModule,
    AsyncPipe,],
  templateUrl: './new-job.component.html',
  styleUrl: './new-job.component.css'
})

export class NewJobComponent{
  noOfRows: number = 3;

  unitOfSalary: string = "LKR";

  fields: Field[] = [
    {fieldName: 'IT and CS', fieldID: 1},
    {fieldName: 'Civil Engineering', fieldID: 2},
    {fieldName: 'Electrical Engineering', fieldID: 2},
    {fieldName: 'Healthcare', fieldID: 4},
    {fieldName: 'Business', fieldID: 5}
  ];

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
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['web'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  announcer = inject(LiveAnnouncer);

  constructor(private httpClient: HttpClient) { 
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filterKeyword(fruit) : this.allFruits.slice())),
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

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filterKeyword(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  private _filterCountry(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.countries.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterCity(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.cities.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
    
  }
}
