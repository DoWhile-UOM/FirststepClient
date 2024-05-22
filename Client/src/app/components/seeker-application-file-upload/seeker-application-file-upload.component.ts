import { Component, EventEmitter, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-seeker-application-file-upload',
  standalone: true,
  imports: [MatIconModule,MatButtonModule],
  templateUrl: './seeker-application-file-upload.component.html',
  styleUrl: './seeker-application-file-upload.component.css'
})
export class SeekerApplicationFileUploadComponent {
  @Output() fileSelected = new EventEmitter<File>();
  
onFileSelected($event: Event) {
  const file = ($event.target as HTMLInputElement).files![0];
  this.fileSelected.emit(file);
}

}
