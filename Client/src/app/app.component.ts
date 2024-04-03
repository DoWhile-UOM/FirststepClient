import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bars/nav-bar/nav-bar.component';
import { CaNavBarComponent } from './nav-bars/ca-nav-bar/ca-nav-bar.component';
import { DocumentServiceService } from '../services/document-service.service';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, ReactiveFormsModule, CommonModule, NavBarComponent, CaNavBarComponent ]
})
export class AppComponent implements OnInit{
  user = "ca"

  constructor(private documentService: DocumentServiceService) {}

  ngOnInit() {
    //this.documentService.downloadBlob("0x8DC3CBBBB23D9BA");
  }
}