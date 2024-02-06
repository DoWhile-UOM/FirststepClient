import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [MatIconModule,MatInputModule,MatFormFieldModule,MatCheckboxModule,MatButtonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  triggerFileInput() {
    const fileInput = document.getElementById('fileID') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      // access the selected file using inputElement.files[0]
      const selectedFile = inputElement.files[0];
      console.log('Selected file:', selectedFile);
      //  uploading the file to a server.
    }
  }
}
