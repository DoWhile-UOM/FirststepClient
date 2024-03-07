import { Component } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-reg-cmp-state-check',
  standalone: true,
  imports: [MatStepperModule,MatIcon],
  templateUrl: './reg-cmp-state-check.component.html',
  styleUrl: './reg-cmp-state-check.component.css'
})
export class RegCmpStateCheckComponent {

}
