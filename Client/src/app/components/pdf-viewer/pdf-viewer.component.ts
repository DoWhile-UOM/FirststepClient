import { Component, Input, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

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
    CommonModule,
    MatIconModule],
  template: `
    <mat-card class="emptymsg">
      <div class="pdf-viewer-container" *ngIf="pdfSrc !== ''">
        <div class="pdf-header">
          <span class="title">
              <mat-icon class="icon">picture_as_pdf</mat-icon>
              <p class="text">{{title}}</p>
          </span>

          <span class="action-buttons">
            <button mat-raised-button color="primary">
              <mat-icon>cloud_download</mat-icon> Download
            </button>
            <button mat-raised-button color="primary" mat-dialog-close>Close</button>
          </span>
        </div>

        <div class="pdf-viewer">
          <ngx-extended-pdf-viewer
            [customToolbar]="additionalButtons"
            [src]="pdfSrc"
            [textLayer]="true">
          </ngx-extended-pdf-viewer>
        </div>

        <ng-template #additionalButtons>
          <div id="toolbarViewer">
            <pdf-zoom-toolbar ></pdf-zoom-toolbar>
            <div id="toolbarViewerRight">
              <pdf-presentation-mode></pdf-presentation-mode>
              <pdf-print></pdf-print>
              <div class="verticalToolbarSeparator hiddenSmallView"></div>
              <pdf-toggle-secondary-toolbar></pdf-toggle-secondary-toolbar>
            </div>
          </div>
        </ng-template>
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

    .pdf-viewer{
      padding: 2em;
      height: 85%;
      margin: 0 auto;
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

    .title .text{
      font-size: 1.5em;
      margin-top: 7px;
    }

    .title .icon{
      margin-right: 0.5em;
      margin-left: 0.5em;
      color: #008080;
      font-size: 1.7em;
    }

    .empty-img{
      width: 25em;
      height: 25em;
      margin: 0 auto;
    }

    .pdf-viewer-container{
      width: 100%;
      height: 100%;
    }

    .title{
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .action-buttons{
      width: 15em;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .pdf-header{
      width: 95%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-top: 2em;
    }
  `,
  standalone: true,
})
class PdfViewerDialog {
  pdfSrc: string = '';
  title: string = ''; 

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) {
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

export class PdfViewerComponent{
  @Input() pdfSrc: string | undefined;
  @Input() title: string | undefined; 

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {}

  openDialog() {
    this.dialog.open(PdfViewerDialog, {
      data: {
        title: this.title,
        src: this.pdfSrc
      },
    });
  }
}