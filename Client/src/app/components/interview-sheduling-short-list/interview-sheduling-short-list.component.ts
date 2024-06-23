import { Component, OnInit, ViewChild, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from "../spinner/spinner.component";
import { InterviewShedulingHeaderComponent } from "../interview-sheduling-header/interview-sheduling-header.component";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ApplicationService } from '../../../services/application.service';

export interface CandidateData {
  name: string;
  lastRevisionBy: string;
  interview: boolean;
  position: number;
}

export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}

@Component({
  selector: 'app-interview-sheduling-short-list',
  standalone: true,
  templateUrl: './interview-sheduling-short-list.component.html',
  styleUrls: ['./interview-sheduling-short-list.component.css'],
  imports: [
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatTableModule,
    SpinnerComponent,
    InterviewShedulingHeaderComponent,
    MatCheckboxModule
  ]
})
export class InterviewShedulingShortListComponent implements OnInit{
  displayedColumns: string[] = ['position', 'name', 'lastRevisionBy', 'interview', 'application'];
  candidateData: CandidateData[] = [];
  advertismnet_id: string = "1057"; // sample advertismnet_id
  

  readonly task = signal<Task>({
    name: 'Select All',
    completed: false,
    subtasks: this.candidateData.map(() => ({
      name: '',
      completed: false,
    })),
  });

  @ViewChild(MatTable)
  table!: MatTable<CandidateData>;

  constructor(
    private applicationService: ApplicationService
  ) { }

  ngOnInit() {
    try{
      this.getShortlistedCandidates();
    }
    catch{
      console.log("Error in fetching the shortlisted candidates");
    }
   
  }

  async getShortlistedCandidates() {
    let dataSet: any[] = [];
    await this.applicationService.getShortlistedApplications(this.advertismnet_id).then((data:any[]) => {
      dataSet = data;
    });
      this.candidateData = dataSet.map((item, index) =>({
        position: index + 1,
        name: item.seeker_name,
        lastRevisionBy: item.last_revision_employee_name,
        interview: false,
      }));
      this.table.renderRows();
    }
   
  sheduleInterview() {
    // code to schedule the interview
  }



  readonly partiallyComplete = computed(() => {
    const task = this.task();
    if (!task.subtasks) {
      return false;
    }
    return task.subtasks.some(t => t.completed) && !task.subtasks.every(t => t.completed);
  });

  update(completed: boolean, index?: number) {
    this.task.update(task => {
      if (index === undefined) {
        task.completed = completed;
        task.subtasks?.forEach(t => (t.completed = completed));
      } else if (task.subtasks) {
        task.subtasks[index].completed = completed;
        task.completed = task.subtasks.every(t => t.completed);
      }
      return { ...task };
    });
  }
}
