import { Routes } from '@angular/router';

import { AdvertisementViewPageComponent } from '../components/advertisement-view-page/advertisement-view-page.component';
import { SeekerHomePageComponent } from '../components/seeker-home-page/seeker-home-page.component';
import { SavedAdvertisementListComponent } from '../components/saved-advertisement-list/saved-advertisement-list.component';
import { CompanyProfileComponent } from '../components/company-profile/company-profile.component';

// need to be verified
import { SeekerApplicationFormComponent } from '../components/seeker-application-form/seeker-application-form.component';
import { SeekerApplicationFormConfirmComponent } from '../components/seeker-application-form-confirm/seeker-application-form-confirm.component';
import { SeekerApplicationStatusComponent } from '../components/seeker-application-status/seeker-application-status.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home/jobdetails', component: AdvertisementViewPageComponent },
  { path: 'home', component: SeekerHomePageComponent },
  { path: 'saved', component: SavedAdvertisementListComponent },
  { path: 'home/company-profile', component: CompanyProfileComponent },

  // need to be verified
  { path: 'home/applicationForm', component: SeekerApplicationFormComponent },
  { path: 'home/applicationForm/applicationFormconfirm', component:SeekerApplicationFormConfirmComponent  },
  { path: 'home/applicationReview', component:SeekerApplicationStatusComponent },
  
];