import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTable,MatTableModule} from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from "../spinner/spinner.component";




//interface for shortlisted candidates
export interface CandidateData{
  id: number;
  name: string;
  lastRevisionBy: string;
  interview: boolean;


}
@Component({
    selector: 'app-interview-sheduling-short-list',
    standalone: true,
    templateUrl: './interview-sheduling-short-list.component.html',
    styleUrl: './interview-sheduling-short-list.component.css',
    imports: [MatButtonModule, MatCardModule, CommonModule, MatTableModule, SpinnerComponent]
})
export class InterviewShedulingShortListComponent {
  displayedColumns: string[] = ['position', 'name', 'lastRevisionBy', 'interview', 'application'];
  candidateData: CandidateData[] = [];

  company_id: string = ''; // sample company_id
  selected: string = 'all';

  @ViewChild(MatTable)
  table!: MatTable<CandidateData>;

  constructor() {
  }
  //function to get the shortlisted candidates
  getShortlistedCandidates(){
    //code to get the shortlisted candidates
  }
  //function to shedule the interview
  sheduleInterview(){
    //code to shedule the interview
  }
  //function to confirm the interview
  confirm(){
    //code to confirm the interview
  }
}





