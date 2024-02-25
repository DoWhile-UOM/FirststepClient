import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-add-skills',
  standalone: true,
  imports: [ 
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe],
  template: `
    <mat-form-field class="addskills-chip-list" appearance="outline">
      <mat-label>{{title}}</mat-label>
      <mat-chip-grid #chipGrid aria-label="skill selection">
        @for (skill of skills; track skill) {
          <mat-chip-row (removed)="remove(skill)">
            {{skill}}
            <button matChipRemove [attr.aria-label]="'remove ' + skill">
              <mat-icon>cancel</mat-icon>
            </button>
          </mat-chip-row>
        }
      </mat-chip-grid>
      <input placeholder="New skill..." #skillInput [formControl]="skillCtrl"
        [matChipInputFor]="chipGrid" [matAutocomplete]="auto"
        [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
        (matChipInputTokenEnd)="add($event)"/>
      <mat-autocomplete #auto="matAutocomplete" (optionSelected)="selected($event)">
        @for (skill of filteredskills | async; track skill) {
          <mat-option [value]="skill">{{skill}}</mat-option>
        }
      </mat-autocomplete>
      <mat-hint>{{hint}}</mat-hint>
    </mat-form-field>
  `,
  styles: `
    .addskills-chip-list {
      height: 100%;
      width: 100%;
    }
  `
})
export class AddSkillsComponent {
  @Input() title: string = "Skills";
  @Input() hint: string = "";

  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl('');
  filteredskills: Observable<string[]>;
  skills: string[] = [];
  allskills: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('skillInput') skillInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  constructor() {
    this.filteredskills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => (skill ? this._filter(skill) : this.allskills.slice())),
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our skill
    if (value) {
      this.skills.push(value);
    }

    // Clear the input value
    //event.chipInput!.clear();

    this.skillCtrl.setValue(null);
  }

  remove(skill: string): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);

      this.announcer.announce(`Removed ${skill}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    var inputFieldValue = this.skillInput.nativeElement.value;
		if (inputFieldValue.length > 0){
			this.remove(inputFieldValue);
		}

    this.skills.push(event.option.viewValue);
    this.skillInput.nativeElement.value = '';
    this.skillCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allskills.filter(skill => skill.toLowerCase().includes(filterValue));
  }
}
