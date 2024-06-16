import { Component, ViewChild, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from "../spinner/spinner.component";
import { InterviewShedulingBackActionComponent } from "../interview-sheduling-back-action/interview-sheduling-back-action.component";
import { MatCheckboxModule } from '@angular/material/checkbox';

export interface CandidateData {
  id: number;
  name: string;
  lastRevisionBy: string;
  interview: boolean;
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
    InterviewShedulingBackActionComponent,
    MatCheckboxModule
  ]
})
export class InterviewShedulingShortListComponent {
  displayedColumns: string[] = ['position', 'name', 'lastRevisionBy', 'interview', 'application'];
  candidateData: CandidateData[] = [
    { id: 1, name: 'John Doe', lastRevisionBy: 'Jane Doe', interview: false },
    { id: 2, name: 'Jane Doe', lastRevisionBy: 'John Doe', interview: false },
    { id: 3, name: 'John Smith', lastRevisionBy: 'Jane Smith', interview: false },
    { id: 4, name: 'Jane Smith', lastRevisionBy: 'John Smith', interview: false },
    { id: 5, name: 'John Doe', lastRevisionBy: 'Jane Doe', interview: false },
    { id: 6, name: 'Jane Doe', lastRevisionBy: 'John Doe', interview: false },
    { id: 7, name: 'John Smith', lastRevisionBy: 'Jane Smith', interview: false },
    { id: 8, name: 'Jane Smith', lastRevisionBy: 'John Smith', interview: false },
    { id: 9, name: 'John Doe', lastRevisionBy: 'Jane Doe', interview: false },
  ];

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

  constructor() { }

  getShortlistedCandidates() {
    // code to get the shortlisted candidates
  }

  sheduleInterview() {
    // code to schedule the interview
  }

  confirm() {
    // code to confirm the interview
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
