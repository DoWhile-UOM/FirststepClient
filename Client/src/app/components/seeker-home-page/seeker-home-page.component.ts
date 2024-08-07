import { Component, ViewChild } from '@angular/core';
import { AdvertisementCardComponent } from '../advertisement-card/advertisement-card.component';
import { CommonModule } from '@angular/common';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { SearchBasicComponent } from '../search-basic/search-basic.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Job {
  advertisement_id: number;
  title: string;
  company_name: string;
  company_logo_url: string;
  company_id: number;
  field_name: string;
  country: string;
  city: string;
  employeement_type: string;
  arrangement: string;
  posted_date: string;
  is_saved: boolean;
  is_expired: boolean;
  can_apply: boolean;
}

@Component({
  selector: 'app-seeker-home-page',
  standalone: true,
  imports: [ AdvertisementCardComponent, CommonModule, SearchBasicComponent, MatPaginatorModule],
  templateUrl: './seeker-home-page.component.html',
  styleUrl: './seeker-home-page.component.css'
})

export class SeekerHomePageComponent{
  jobList: Job[] = [];

  @ViewChild(SearchBasicComponent) searchComponent: SearchBasicComponent | undefined;

  paginatorLength = 10;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 15];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.snackBar.open("Welcome to the FirstStep Job Matching Platform!", "", {panelClass: ['app-notification-normal']})._dismissAfter(3000);
  }

  async handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    let startIndex = this.pageIndex * this.pageSize;
    let endIndex = startIndex + this.pageSize;

    await this.searchComponent?.changePaginator(startIndex, endIndex);

    // scroll to the top of the page
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  changeJobList(newJobList: Job[]){
    this.jobList = newJobList;
  }

  changePaginatorSize(newLen: number){
    this.paginatorLength = newLen;
  }
}