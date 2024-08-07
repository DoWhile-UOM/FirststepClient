import { Component, OnInit } from '@angular/core';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { AddrolesPopupComponent } from '../addroles-popup/addroles-popup.component';
import { EditRoleComponent } from '../edit-role/edit-role.component';
import { EmployeeService } from '../../../services/employee.service';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../services/auth.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NgxSpinnerService } from 'ngx-spinner';

export interface RolesData {
  id: number;
  name: string;
  email: string;
  position: number;
  Role: string;
}

@Component({
  selector: 'app-manage-roles',
  standalone: true,
  templateUrl: './manage-roles.component.html',
  styleUrl: './manage-roles.component.css',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    AddrolesPopupComponent,
    MatCardModule,
    MatChipsModule,
    CommonModule,
    MatDialogModule,
    MatInputModule,
    SpinnerComponent
  ],
})
export class ManageRolesComponent implements OnInit{
  displayedColumns: string[] = ['position', 'name', 'email', 'Role', 'symbol'];
  rolesData: RolesData[] = [];

  company_id: string = ''; // sample company_id
  selected: string = 'all';

  @ViewChild(MatTable)
  table!: MatTable<RolesData>;

  constructor(
    public dialog: MatDialog,
    private employeeService: EmployeeService,
    private auth: AuthService,
    private spinner: NgxSpinnerService
  ) {
  
  }

  //Fetch data from the database when the component initializes
  ngOnInit(): void {
    this.spinner.show();
    try {
      this.company_id = this.auth.getCompanyID() || '';
      this.fetchData(this.selected);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    this.spinner.hide();
  }

  async fetchData(type: string) {
    let dataSet: any[] = [];

    if (type == 'HRA') {
      await this.employeeService
        .getAllHRAs(this.company_id)
        .then((data: any[]) => {
          dataSet = data;
        });
    } else if (type == 'HRM') {
      await this.employeeService
        .getAllHRMs(this.company_id)
        .then((data: any[]) => {
          dataSet = data;
        });
    } else {
      await this.employeeService
        .getEmployeeList(this.company_id)
        .then((data: any[]) => {
          dataSet = data;
        });
    }

    if (dataSet.length > 0) {
      this.rolesData = dataSet.map((item, index) => ({
        id: item.user_id,
        position: index + 1, // Increment position
        name: `${item.first_name} ${item.last_name}`,
        email: item.email,
        Role: item.user_type == 'hra' ? 'Talent Acquisition Specialist' : 'HR Manager',
      }));
      this.table.renderRows();
    } else {
      this.rolesData = [];
      this.table.renderRows();
      
    }
  }

  removeData(id: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: { id: id },
    });
    //after dialog closed fetch the results
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.fetchData(this.selected);
        window.location.reload();
      }
    });
  }

  openAdd() {
    const dialog = this.dialog.open(AddrolesPopupComponent, {
      data: {
        company_id: this.company_id,
      },
    });
    
    dialog.afterClosed().subscribe((result) => {
      if (result == true) {
        this.fetchData(this.selected);
        window.location.reload();
      }
    });
  }

  openEdit(id: number) {
    const dialog = this.dialog.open(EditRoleComponent, { data: { id } });
   //fetch the results only if returns true
    dialog.afterClosed().subscribe((result) => {
      if (result == true) {
        this.fetchData(this.selected);
        window.location.reload();
      }
    });

  }

  async filter(selected: any) {
    this.selected = selected.value;
    await this.fetchData(selected.value);
  }
}

//confirm component
@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.html',
  styleUrl: './manage-roles.component.css',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, SpinnerComponent],
})
export class ConfirmDeleteComponent {
  constructor(
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  emp_id: number = this.data.id;

  async Clickdelete() {
    this.spinner.show();
    await this.employeeService.deleteEmployee(this.emp_id);
    this.dialogRef.close(true);
    this.spinner.hide();
  }
}
