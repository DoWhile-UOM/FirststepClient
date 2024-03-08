import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient, HttpEventType } from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';


const apiUrl = 'https://localhost:7213/api/Document';
@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [MatIconModule,MatInputModule,MatFormFieldModule,MatCheckboxModule,MatButtonModule,MatProgressBarModule, NgIf ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})

export class FileUploadComponent implements OnInit {
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.uploadFile();
  }

  uploadFile() {
    if (!this.selectedFile) {
      return; // Handle no file selected case
    }

    const fileData = new FormData();
    fileData.append('files', this.selectedFile, this.selectedFile.name);

    const headers = new HttpHeaders()
      .set('Accept', '*/*');

    this.http.post(apiUrl, fileData, { headers })
      .subscribe(response => {
        console.log('Upload successful:', response);
        this.selectedFile = null; // Clear selection after successful upload
      }, error => {
        console.error('Upload error:', error);
      });
  }
}