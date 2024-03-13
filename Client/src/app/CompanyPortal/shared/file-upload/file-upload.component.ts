import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Observable } from 'rxjs';
import { FileUploadService } from '../../../../services/file-upload.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [AsyncPipe,MatIconModule,MatInputModule,MatFormFieldModule,MatCheckboxModule,MatButtonModule,MatProgressBarModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent implements OnInit {
  currentFile?: File;
  message = '';
  fileInfos?: Observable<any>;

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }


  selectFile(event: any): void {
    this.currentFile = event.target.files.item(0);
  }

  async upload() {
    if (this.currentFile) {
      await this.uploadService.upload(this.currentFile);
    }
  }
  
}