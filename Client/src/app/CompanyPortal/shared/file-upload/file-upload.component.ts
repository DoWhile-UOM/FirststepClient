import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [MatIconModule,MatInputModule,MatFormFieldModule,MatCheckboxModule,MatButtonModule,MatProgressBarModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  fileName = ''; 
  constructor(private http: HttpClient) { }
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
      this.fileName = selectedFile.name;
      console.log('Selected file:', selectedFile);

      //  uploading the file to a server.

      const formData = new FormData();
      formData.append("thumbnail", selectedFile);
      const upload$=this.http.post("/api/thumbnail-upload", formData)
      upload$.subscribe();
    }
  }

}