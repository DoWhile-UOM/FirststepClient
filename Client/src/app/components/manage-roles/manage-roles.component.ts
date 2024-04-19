import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef,
  MAT_DIALOG_DATA,

} from '@angular/material/dialog';
import { AddrolesPopupComponent } from '../addroles-popup/addroles-popup.component';
import { EditRoleComponent } from '../edit-role/edit-role.component';
import { EmployeeService } from '../../../services/employee.service';
import { AdvertisementServices } from '../../../services/advertisement.service';


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
      MatCardModule,
      MatChipsModule,
      CommonModule
    ]
})
export class ManageRolesComponent {
  displayedColumns: string[] = ['position', 'name','email', 'Role', 'symbol'];
  rolesData: RolesData[] = [];
  
  company_id: number = 7; // sample company_id
  selected: string = "all";

  @ViewChild(MatTable)
  table!: MatTable<RolesData>;

  constructor(
    public dialog: MatDialog,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
 
  ) {}

  ngOnInit(): void {
    this.fetchData(this.selected);
  }

  async fetchData(type: string) {
    let dataSet: any[] = [];

    if (type == "HRA") {
      await this.employeeService.getAllHRAs(this.company_id)
        .then((data: any[]) => {
          dataSet = data;
        }); 
    }
    else if (type == "HRM"){
      await this.employeeService.getAllHRMs(this.company_id)
        .then((data: any[]) => {
          dataSet = data;
        }); 
    }
    else {
      await this.employeeService.getEmployeeList(this.company_id)
        .then((data: any[]) => {
          dataSet = data;
        });  
    }
    
    if (dataSet.length > 0){
      this.rolesData = dataSet.map((item, index) => ({
        id: item.user_id, 
        position: index + 1, // Increment position
        name: `${item.first_name} ${item.last_name}`, 
        email:item.email,
        Role: (item.user_type) == 'HRA' ? 'HR Assistant': 'HR Manager', // Use user_type
      }));
    }
    else{
      this.rolesData = [];
    }
  }
 
  removeData(id: number): void {
    this.employeeService
      .deleteEmployee(id)
      .then(() => {
        this.rolesData = this.rolesData.filter(
          (employee) => employee.id !== id
        );
        this.table.renderRows();
        this.fetchData(this.selected);
        
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
    }

    openDialog(){
      const dialog=this.dialog.open(AddrolesPopupComponent); 
      dialog.afterClosed().subscribe(result => {
        if(result===true){
          this.fetchData(this.selected);
        }
      });
    }

    openEdit( id:number){
      const dialog = this.dialog.open(EditRoleComponent,{data:{id}});
     
      dialog.afterClosed().subscribe(result => {
        if (result === true) {
          this.fetchData(this.selected);
        }
      });
    }
     
    async filter(selected: any){
      this.selected = selected.value;
      await this.fetchData(selected.value);
    }
  }


  
  @Component({
    selector: 'confirm',
    templateUrl: 'confirm.html',
    standalone: true,
    imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  })
  export class ConfirmDialog {
    title: string = "";
    id: number = 0;
    dialogtitle: string = "";
    rolesData: any;
    table: any;

    constructor(
      public dialogRef: MatDialogRef<ConfirmDialog>,
      private employeeService: EmployeeService,
      private snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public data: any) {
  
      
      this.id = data.id;
      this.dialogtitle = data.dialogtitle;
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    async onYesClick() {

      this.employeeService
      .deleteEmployee(this.id)
      .then(() => {
        this.rolesData = this.rolesData.filter(
          (employee) => employee.id !== id
        );
        this.table.renderRows();
        this.fetchData(this.selected);
        
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
      
  
      this.dialogRef.close();
    }
    fetchData(selected: any) {
      throw new Error('Method not implemented.');
    }
    selected(selected: any) {
      throw new Error('Method not implemented.');
    }
  }
  
