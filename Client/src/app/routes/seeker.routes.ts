import { Routes } from '@angular/router';

import { AdvertisementViewPageComponent } from '../components/advertisement-view-page/advertisement-view-page.component';
import { SeekerHomePageComponent } from '../components/seeker-home-page/seeker-home-page.component';
import { SavedAdvertisementListComponent } from '../components/saved-advertisement-list/saved-advertisement-list.component';
import { CompanyProfileComponent } from '../components/company-profile/company-profile.component';
import { NewJobUploadedComponent } from '../components/new-job-uploaded/new-job-uploaded.component';
import { SeekerApplicationFormComponent } from '../components/seeker-application-form/seeker-application-form.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'jobdetails', component: AdvertisementViewPageComponent },
  { path: 'home', component: SeekerHomePageComponent },
  { path: 'home/saved', component: SavedAdvertisementListComponent },
  { path: 'company-profile', component: CompanyProfileComponent },
  { path: 'newJobUploaded', component: NewJobUploadedComponent },
  { path: 'applicationForm', component: SeekerApplicationFormComponent },
  { path: 'applicationFormconfirm', component: SeekerApplicationFormComponent },
];