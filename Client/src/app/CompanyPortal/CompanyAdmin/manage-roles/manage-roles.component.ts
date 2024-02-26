import { Component } from '@angular/core';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AddrolesPopupComponent } from '../addroles-popup/addroles-popup.component';
import { EditRoleComponent } from '../edit-role/edit-role.component';
import { EmployeeService } from '../../../../services/employee.service';

export interface RolesData {
  id: number;
  name: string;
  position: number;
  Role: string;
  symbol1: string;
  symbol2: string;
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
  ],
})
export class ManageRolesComponent {
  displayedColumns: string[] = ['position', 'name', 'Role', 'symbol'];
  rolesData: RolesData[] = [];

  @ViewChild(MatTable)
  table!: MatTable<RolesData>;

  constructor(
    public dialog: MatDialog,
    private employeeService: EmployeeService
  ) {}

  //Fetch data from the database when the component initializes
  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.employeeService
      .getEmployeeList()
      .then((data: any[]) => {
        this.rolesData = data.map((item, index) => ({
          id: item.user_id, // Use user_id
          position: index + 1, // Increment position
          name: `${item.first_name} ${item.last_name}`, // Combine first_name and last_name
          Role: item.user_type, // Use user_type
          symbol1: 'delete', // Add symbol1 property
          symbol2: 'edit', // Add symbol2 property
        }));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
  //end of fetch data
  openDialog() {
    /*  const dialogRef = this.dialog.open(AddrolesPopupComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If the user added new data, fetch the updated data from the database
        this.fetchData();
      }
    });*/
  }

  openEdit() {
    this.dialog.open(EditRoleComponent);
  }

  removeData(id: number): void {
    this.employeeService
      .deleteEmployee(id)
      .then(() => {
        this.rolesData = this.rolesData.filter(
          (employee) => employee.id !== id
        );
        this.table.renderRows();
        this.fetchData();
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });

    /* addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
    this.table.renderRows();
  }*/
  }
}
