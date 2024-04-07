import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'pdf-viewer-dialog',
  imports: [
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions, 
    MatDialogClose, 
    MatButtonModule, 
    MatCardModule, 
    NgxExtendedPdfViewerModule, 
    CommonModule],
  template: `
    <mat-card class="emptymsg">
      <div *ngIf="pdfSrc !== ''">
        <mat-card-header>
          <mat-card-title>{{title}}</mat-card-title>
        </mat-card-header>
        <ngx-extended-pdf-viewer [src]="pdfSrc"></ngx-extended-pdf-viewer>
      </div>

      <div *ngIf="pdfSrc === ''">
        <img src="../../../assets/images/Document.png" class="empty-img">
        <p class="center-text">Something Went Wrong!</p>
        <p class="center-text">Can't Load Document</p>
      </div>
    </mat-card>
  `,
  styles: `
    .emptymsg{
      width: 100em;
      height: 60em;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .emptymsg div{
      margin: 0 auto;
    }

    .center-text{
      color: #008080;
      font-family: Lato;
      font-size: x-large;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      text-align: center;
      margin: 1em;
    }

    .empty-img{
      width: 25em;
      height: 25em;
      margin: 0 auto;
    }
  `,
  standalone: true,
})
class PdfViewerDialog {
  pdfSrc: string = '';
  title: string = ''; 

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.src == undefined || data.title == undefined) {
      this.pdfSrc = '';
      this.title = '';
      return;
    }

    this.pdfSrc = data.src;
    this.title = data.title;
  }
}

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [],
  template: `
    <button mat-raised-button (click)="openDialog()">Open PDF</button>
  `,
  styles: ``
})

export class PdfViewerComponent implements OnInit{
  @Input() pdfSrc: string | undefined;
  @Input() title: string | undefined; 

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(PdfViewerDialog, {
      data: {
        title: this.title,
        src: this.pdfSrc
      },
    });
  }

  ngOnInit(): void {
    this.pdfSrc = 'C:/Users/user/OneDrive/Mora IT/Academics/4th Semester/CM2111 - Statistical Inference/Hypothesis Testing.pdf'
  }
}