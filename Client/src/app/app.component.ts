import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bars/nav-bar/nav-bar.component';
import { CaNavBarComponent } from './nav-bars/ca-nav-bar/ca-nav-bar.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, ReactiveFormsModule, CommonModule, NavBarComponent, CaNavBarComponent, PdfViewerComponent ]
})
export class AppComponent {
  user = 'ca';
}