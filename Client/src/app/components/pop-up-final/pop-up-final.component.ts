import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-final',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './pop-up-final.component.html',
  styleUrl: './pop-up-final.component.css'
})
export class PopUpFinalComponent {
  constructor(
    public dialogRef: MatDialogRef<PopUpFinalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string,message2: string }
  ) { }
}
