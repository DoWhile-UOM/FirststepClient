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
import { DocumentService } from '../../../services/document.service';



@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [MatIconModule,MatInputModule,MatFormFieldModule,MatCheckboxModule,MatButtonModule,MatProgressBarModule, NgIf ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})

export class FileUploadComponent implements OnInit {
  selectedFile: File | null = null;

  constructor(private documentService:DocumentService) {}

  ngOnInit(): void {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.uploadFile();
  }

  uploadFile() {
    if (!this.selectedFile) {
      return;
    }
    this.documentService.uploadFile(this.selectedFile)
    .subscribe(response => {
      console.log('Upload successful:', response);
      this.selectedFile = null; 
    }, error => {
      console.error('Upload error:', error);
    });
  
  }
}