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
  triggerFileInput() {
    const fileInput = document.getElementById('fileID') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      // You can now access the selected file using inputElement.files[0]
      const selectedFile = inputElement.files[0];
      console.log('Selected file:', selectedFile);
      // Perform any additional actions, such as uploading the file to a server.
    }
  }
}
