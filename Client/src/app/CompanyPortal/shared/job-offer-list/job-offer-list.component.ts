import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AdvertisementServices } from '../../../../services/advertisement.service';

interface JobOffer{
  advertisement_id: number;
  job_number: number;
  title: string;
  posted_date: string;
  current_status: string;
  field_name: string;
  no_of_applications: number;
  no_of_evaluated_applications: number;
  no_of_accepted_applications: number;
  no_of_rejected_applications: number;
}

interface JobOfferTable{
  job_number: number;
  title: string;
  posted_date: string;
  no_of_applications: number;
  no_of_evaluated_applications: number;
  no_of_accepted_applications: number;
  no_of_rejected_applications: number;
}


var Table_data: JobOfferTable[] = [];

@Component({
  selector: 'app-job-offer-list',
  standalone: true,
  imports: [ MatTableModule, MatSortModule, MatPaginatorModule ],
  templateUrl: './job-offer-list.component.html',
  styleUrl: './job-offer-list.component.css'
})

export class JobOfferListComponent implements AfterViewInit{
  displayedColumns: string[] = ['Job Number', 'Title', 'Posted Date', 'Applications', 'Reviewed', 'Accepted', 'Rejected'];
  dataSource = new MatTableDataSource<JobOfferTable>(Table_data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  company_id: string = "7";
  jobList: JobOffer[] = [];

  constructor(
    private liveAnnouncer: LiveAnnouncer, 
    private advertisementService: AdvertisementServices){
  }

  async ngOnInit() {
    await this.advertisementService.getAllAdvertisementsByCompanyID(this.company_id)
      .then((response) => {
        this.jobList = response;

        if (this.jobList.length == 0) {
          console.log("No advertisements found");
        }

        Table_data = [];

        for (let i = 0; i < this.jobList.length; i++) {
          Table_data.push({
            job_number: this.jobList[i].job_number,
            title: this.jobList[i].title,
            posted_date: this.jobList[i].posted_date,
            no_of_applications: this.jobList[i].no_of_applications,
            no_of_evaluated_applications: this.jobList[i].no_of_evaluated_applications,
            no_of_accepted_applications: this.jobList[i].no_of_accepted_applications,
            no_of_rejected_applications: this.jobList[i].no_of_rejected_applications
          });
        }

        this.dataSource = new MatTableDataSource<JobOfferTable>(Table_data);
        this.dataSource.paginator = this.paginator;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } 
    else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }
}
