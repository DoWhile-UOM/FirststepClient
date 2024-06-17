import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { MatSelectionList } from '@angular/material/list';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-task-delegation-pop-up',
  standalone: true,
  imports: [MatSelectionList, MatListOption],
  templateUrl: './task-delegation-pop-up.component.html',
  styleUrl: './task-delegation-pop-up.component.css'
})
export class TaskDelegationPopUpComponent implements OnInit {
  hraList: any[] = [];
  selectedHRAIds: number[] = [];

  constructor(
    public dialogRef: MatDialogRef<TaskDelegationPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { jobID: number },
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.getHraList();
  }

  async getHraList() {
    try {
      this.hraList = await this.employeeService.getAllHRAs(this.auth.getCompanyID());
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