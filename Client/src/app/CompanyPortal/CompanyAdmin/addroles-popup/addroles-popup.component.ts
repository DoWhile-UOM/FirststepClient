import { Component } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { FileUploadComponent } from "../../shared/file-upload/file-upload.component";


@Component({
    selector: 'app-addroles-popup',
    standalone: true,
    templateUrl: './addroles-popup.component.html',
    styleUrl: './addroles-popup.component.css',
    imports: [FlexLayoutModule, MatIconModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MatButtonModule, FileUploadComponent]
})
export class AddrolesPopupComponent {
 
}
