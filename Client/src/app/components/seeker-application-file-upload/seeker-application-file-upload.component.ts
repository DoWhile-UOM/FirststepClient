import { Component } from '@angular/core';
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

onFileSelected($event: Event) {
throw new Error('Method not implemented.');
}

}
