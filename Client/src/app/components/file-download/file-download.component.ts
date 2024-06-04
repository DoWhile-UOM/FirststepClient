import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { PdfViewComponent } from '../pdf-view/pdf-view.component';


@Component({
    selector: 'app-file-download',
    standalone: true,
    templateUrl: './file-download.component.html',
    styleUrl: './file-download.component.css',
    imports: [MatIconModule,MatButtonModule]
})
export class FileDownloadComponent {

constructor(
    public dialog: MatDialog
) {} 

openpdf() {
    const dialogRef = this.dialog.open(PdfViewComponent);
}
}
