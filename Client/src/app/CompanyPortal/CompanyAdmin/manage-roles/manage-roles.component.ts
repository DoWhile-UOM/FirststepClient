import { Component } from '@angular/core';
import {MatIconRegistry, MatIconModule} from '@angular/material/icon';
import {ViewChild} from '@angular/core';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

export interface PeriodicElement {
  name: string;
  position: number;
  Role: string;
  symbol: string;
 
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Nethmi Rathnayake', Role:'HR Manager',symbol: 'H'},
  {position: 2, name: 'Ashan Induwara', Role: 'HR Manager' ,symbol: 'He'},
 /* {position: 3, name: 'Lithium', Role: 6.941},
  {position: 4, name: 'Beryllium', Role: 9.0122},
  {position: 5, name: 'Boron', Role: 10.811},
  {position: 6, name: 'Carbon', Role: 12.0107},
  {position: 7, name: 'Nitrogen', Role: 14.0067},
  {position: 8, name: 'Oxygen', Role: 15.9994},
  {position: 9, name: 'Fluorine', Role: 18.9984},
  {position: 10, name: 'Neon', Role: 20.1797},*/
];

@Component({
  selector: 'app-manage-roles',
  standalone: true,
  imports: [MatIconModule,MatButtonModule, MatTableModule],
  templateUrl: './manage-roles.component.html',
  styleUrl: './manage-roles.component.css'
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
}

