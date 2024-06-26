import { Component, OnInit, ViewChild, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from "../spinner/spinner.component";
import { InterviewShedulingHeaderComponent } from "../interview-sheduling-header/interview-sheduling-header.component";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ApplicationService } from '../../../services/application.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';

interface CandidateData {
  name: string;
  lastRevisionBy: string;
  interview: boolean;
  position: number;
}

interface Task {
  name: string;
  completed: boolean;
  subtasks?: { name: string; completed: boolean }[];
}


interface interview{
  application_id:number;
  is_called:boolean;
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
    MatCheckboxModule,
    MatIconModule
  ]
})
export class InterviewShedulingShortListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'lastRevisionBy', 'interview', 'application'];
  candidateData: CandidateData[] = [];
  advertismnet_id: string = ''; // sample advertismnet_id
  advertisment_title: string = ''; // sample advertisment_title

  readonly task = signal<Task>({
    name: 'Select All',
    completed: false,
    subtasks: [],
  });

  @ViewChild(MatTable) table!: MatTable<CandidateData>;

  constructor(
    private applicationService: ApplicationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    try {
      this.advertisment_title = this.route.snapshot.paramMap.get('jobTitle')!;
      /*this.advertisment_title = this.route.snapshot.paramMap.get('jobID')!;*/
      this.advertismnet_id = '1057';
      this.getShortlistedCandidates();
    } catch {
      console.log("Error in fetching the shortlisted candidates");
    }
  }

  async getShortlistedCandidates() {
    let dataSet: any[] = [];
    await this.applicationService.getShortlistedApplications(this.advertismnet_id).then((data: any[]) => {
      dataSet = data;
    });
    this.candidateData = dataSet.map((item, index) => ({
      position: index + 1,
      name: item.seeker_name,
      lastRevisionBy: item.last_revision_employee_name,
      interview: false,
    }));

    // Initialize task subtasks based on candidate data
    this.task.update(() => ({
      name: 'Select All',
      completed: false,
      subtasks: this.candidateData.map(candidate => ({
        name: candidate.name,
        completed: candidate.interview,
      })),
    }));

    this.table.renderRows();
  }

 /* explore(application_Id: number){
    this.router.navigate([this.auth.getRole() + '/jobOfferList/applicationList/applicationView', {applicationId: application_Id}]);
  }*/

  scheduleInterview() {
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
        this.candidateData.forEach(candidate => (candidate.interview = completed));
      } else if (task.subtasks) {
        task.subtasks[index].completed = completed;
        task.completed = task.subtasks.every(t => t.completed);
        this.candidateData[index].interview = completed;
      }
      return { ...task };
    });
  }
}