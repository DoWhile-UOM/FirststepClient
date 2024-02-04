import { Component } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-addroles-popup',
  standalone: true,
  imports: [FlexLayoutModule,MatIconModule,MatInputModule,MatFormFieldModule,MatCheckboxModule,MatButtonModule],
  templateUrl: './addroles-popup.component.html',
  styleUrl: './addroles-popup.component.css'
})
export class AddrolesPopupComponent {

}
