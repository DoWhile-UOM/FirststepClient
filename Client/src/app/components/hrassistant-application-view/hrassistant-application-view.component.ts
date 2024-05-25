import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrmanagerApplicationViewComponent } from '../hrmanager-application-view/hrmanager-application-view.component';

@Component({
  selector: 'app-hrassistant-application-view',
  standalone: true,
  imports: [CommonModule, HrmanagerApplicationViewComponent],
  templateUrl: './hrassistant-application-view.component.html',
  styleUrl: './hrassistant-application-view.component.css'
})
export class HrassistantApplicationViewComponent {
  showComments: boolean = false;
}
