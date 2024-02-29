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
import { SuccessPopupComponent } from '../../shared/success-popup/success-popup.component';


export interface RolesData {
  id: number;
  name: string;
  email:string;
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
  ],
})
export class ManageRolesComponent {
  displayedColumns: string[] = ['position', 'name','email', 'Role', 'symbol'];
  rolesData: RolesData[] = [];

  company_id: number = 7; // sample company_id

  @ViewChild(MatTable)
  table!: MatTable<RolesData>;

  constructor(
    public dialog: MatDialog,
    private employeeService: EmployeeService,
 
  ) {}

  //Fetch data from the database when the component initializes
  ngOnInit(): void {
    this.fetchData();
  }

  async fetchData() {
    await this.employeeService
      .getEmployeeList(this.company_id)
      .then((data: any[]) => {
        this.rolesData = data.map((item, index) => ({
          id: item.user_id, // Use user_id
          position: index + 1, // Increment position
          name: `${item.first_name} ${item.last_name}`, 
          email:item.email,
          Role: (item.user_type) == 'HRM' ? 'HR Manager': 'HR Assistant', // Use user_type
        }));
      })
      .catch((error) => {
        error('Error fetching data:', error);
      });
  }
  //end of fetch data
 
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
    }

    openDialog(){
      const dialog=this.dialog.open(AddrolesPopupComponent); 
      dialog.afterClosed().subscribe(result => {
        if(result=true){
          this.fetchData();
          window.location.reload();
        }
      });
    }

    openEdit() {
      const editdialog=this.dialog.open(EditRoleComponent);
      editdialog.afterClosed().subscribe(result => {
        if(result=true){
          this.fetchData();
          window.location.reload();
        }
      });
    }
     
  }
    
  
