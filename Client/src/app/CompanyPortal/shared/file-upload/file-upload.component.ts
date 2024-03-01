import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient, HttpEventType } from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [MatIconModule,MatInputModule,MatFormFieldModule,MatCheckboxModule,MatButtonModule,MatProgressBarModule, NgIf ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent implements OnInit {

  public message: string = '';
  public progress: number=0;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient) { 

  }
   ngOnInit() {    
  
}

public uploadFile = (files: FileList) => {
  if (files.length === 0) {
    return;
  }
  let fileToUpload = <File>files[0];
  const formData = new FormData();
  formData.append('file', fileToUpload, fileToUpload.name);
  this.http.post('https://localhost:7213/api/UploadFiles', formData, {reportProgress: true, observe: 'events'})
    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        if (event.total !== undefined) {
          this.progress = Math.round(100 * event.loaded / event.total);
        }
      } else if (event.type === HttpEventType.Response) {
        this.message = 'Upload success.';
        this.onUploadFinished.emit(event.body);
      }
    });

}


}
   
