import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogContent, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { EmployeeService } from '../../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogActions} from '@angular/material/dialog';
import { MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-task-delegation-pop-up',
  standalone: true,
  imports: [MatListModule, CommonModule, MatButtonModule, MatDialogModule,MatDialogContent,MatDialogActions,MatDialogTitle],
  templateUrl: './task-delegation-pop-up.component.html',
  styleUrl: './task-delegation-pop-up.component.css'
})
export class TaskDelegationPopUpComponent implements OnInit {
  hraList: any[] = [];
  selectedHRAIds: number[] = [];
  unassignedApplicationCount: number = 0;

  constructor(
    public dialogRef: MatDialogRef<TaskDelegationPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { jobID: number, unassignedApplicationCount: number }, 
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private auth: AuthService
  ) {
    this.unassignedApplicationCount = data.unassignedApplicationCount;
  }

  ngOnInit() {
    this.getHraList();
  }

  async getHraList() {
    try {
      this.hraList = await this.employeeService.getAllHRAs(this.auth.getCompanyID());
      console.log('HR Assistants:', this.hraList);

    } catch (error) {
      this.snackBar.open('Error: ' + error, '', { panelClass: ['app-notification-error'] })._dismissAfter(3000);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAssign(): void {
    this.dialogRef.close(this.selectedHRAIds);
  }

  toggleSelection(hraId: number): void {
    const index = this.selectedHRAIds.indexOf(hraId);
    if (index > -1) {
      this.selectedHRAIds.splice(index, 1);
    } else {
      this.selectedHRAIds.push(hraId);
    }
  }
}