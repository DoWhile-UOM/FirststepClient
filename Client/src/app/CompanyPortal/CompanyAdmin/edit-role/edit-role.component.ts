import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { FileUploadComponent } from "../../shared/file-upload/file-upload.component";

@Component({
  selector: 'app-edit-role',
  standalone: true,
  imports: [MatIconModule,MatInputModule,MatFormFieldModule,MatCheckboxModule,MatButtonModule,FileUploadComponent],
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.css'
})
export class EditRoleComponent {

}
