import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogContent, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DialogData } from '../company-application/company-application.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-view',
  standalone: true,
  imports: [MatDialogModule, MatDialogContent, MatIconModule, MatButtonModule], 
  templateUrl: './pdf-view.component.html',
  styleUrl: './pdf-view.component.css'
})
export class PdfViewComponent implements OnInit{
  public document: any;
  public documentUrlSafe: SafeResourceUrl | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<PdfViewComponent>,
    private sanitizer: DomSanitizer)
  { }
  
  ngOnInit() {
    this.document = this.data.documentUrl;
    this.documentUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.document);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
