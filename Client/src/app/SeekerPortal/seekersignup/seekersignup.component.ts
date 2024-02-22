import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-seekersignup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatStepperModule],
  templateUrl: './seekersignup.component.html',
  styleUrl: './seekersignup.component.css'
})
export class SeekersignupComponent {

   //form group for the stepper
 firstFormGroup = this._formBuilder.group({
  firstCtrl: ['', Validators.required],
});
secondFormGroup = this._formBuilder.group({
  secondCtrl: ['', Validators.required],
});
thirdFormGroup = this._formBuilder.group({
  thirdCtrl: ['', Validators.required],
});
fourthFormGroup = this._formBuilder.group({
  fourthCtrl: ['', Validators.required],
});
fifthFormGroup = this._formBuilder.group({
  fifthCtrl: ['', Validators.required],
});


constructor(private _formBuilder: FormBuilder) { }

}
