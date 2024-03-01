import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, ViewChild, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SkillService } from '../../../services/skill.service';

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
          <mat-chip-row (removed)="removeSkill(skill)">
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
        (matChipInputTokenEnd)="addSkill($event)"/>
      <mat-autocomplete #auto="matAutocomplete" (optionSelected)="selectedSkill($event)">
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
export class AddSkillsComponent implements OnInit{
  @Input() title: string = "Skills";
  @Input() hint: string = "";

  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl('');
  filteredskills: Observable<string[]>;
  public skills: string[] = [];
  allskills: string[] = [];

  @ViewChild('skillInput') skillInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  constructor(private skillService: SkillService) {
    this.filteredskills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => (skill ? this._filterSkills(skill) : this.allskills.slice())),
    );
  }

  async ngOnInit() {
    this.allskills = await this.skillService.getAllSkills();
  }

  addSkill(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our skill
    if (value) {
      this.skills.push(value)
    }

    // Clear the input value
    //event.chipInput!.clear();

    this.skillCtrl.setValue(null);
  }

  removeSkill(skill: string): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);

      this.announcer.announce(`Removed ${skill}`);
    }
  }

  selectedSkill(event: MatAutocompleteSelectedEvent): void {
    var skillFieldValue = this.skillInput.nativeElement.value;
		if (skillFieldValue.length > 0){
			this.removeSkill(skillFieldValue);
		}

    this.skills.push(event.option.viewValue);
    this.skillInput.nativeElement.value = '';
    this.skillCtrl.setValue(null);
  }

  private _filterSkills(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allskills.filter(skill => skill.toLowerCase().includes(filterValue));
  }
}
