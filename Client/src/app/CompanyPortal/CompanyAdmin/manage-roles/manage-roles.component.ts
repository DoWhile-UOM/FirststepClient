import { Component } from '@angular/core';
import {MatIconRegistry, MatIconModule} from '@angular/material/icon';
import {ViewChild} from '@angular/core';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { AddrolesPopupComponent } from "../addroles-popup/addroles-popup.component";


export interface PeriodicElement {
  name: string;
  position: number;
  Role: string;
  symbol1: string;
  symbol2: string;
 
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Nethmi Rathnayake', Role:'HR Manager',symbol1: 'delete',symbol2: 'edit'},
  {position: 2, name: 'Ashan Induwara', Role: 'HR Manager' ,symbol1: 'delete',symbol2: 'edit'},
  {position: 3, name: 'Giman Arawinda', Role: 'HR Manager' ,symbol1: 'delete',symbol2: 'edit'},
  {position: 4, name: 'Nethma Karunathilaka', Role:'HR Assistant',symbol1: 'delete',symbol2: 'edit'},
  {position: 5, name: 'Ashani Perera', Role:'HR Assistant',symbol1: 'delete',symbol2: 'edit'},
  {position: 6, name: 'Kavinda Bandara', Role:'HR Assistant',symbol1: 'delete',symbol2: 'edit'},
  {position: 7, name: 'Gayuni Basnayaka', Role:'HR Assistant',symbol1: 'delete',symbol2: 'edit'},
];

@Component({
    selector: 'app-manage-roles',
    standalone: true,
    templateUrl: './manage-roles.component.html',
    styleUrl: './manage-roles.component.css',
    imports: [MatIconModule, MatButtonModule, MatTableModule, AddrolesPopupComponent]
})
export class ManageRolesComponent {
  displayedColumns: string[] = ['position', 'name', 'Role','symbol'];
  dataSource = [...ELEMENT_DATA];

  @ViewChild(MatTable)
  table!: MatTable<PeriodicElement>;

  addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
    this.table.renderRows();
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }

  openAddRole(){
    document.getElementById("PopupAdd")
  }
}

