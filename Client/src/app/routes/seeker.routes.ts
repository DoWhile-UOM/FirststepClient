import { Routes } from '@angular/router';

import { SeekerHomePageComponent } from '../components/seeker-home-page/seeker-home-page.component';
import { SavedAdvertisementListComponent } from '../components/saved-advertisement-list/saved-advertisement-list.component';
import { ApplicationAdvertisementListComponent } from '../components/application-advertisement-list/application-advertisement-list.component';
import { CompanyProfileComponent } from '../components/company-profile/company-profile.component';
import { SeekerApplicationFormConfirmComponent } from '../components/seeker-application-form-confirm/seeker-application-form-confirm.component';
import { SeekerProfileEditComponent } from '../components/seeker-profile-edit/seeker-profile-edit.component';
import { IntViewSeekerBookComponent } from '../components/int-view-seeker-book/int-view-seeker-book.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: SeekerHomePageComponent },
  { path: 'liked', component: SavedAdvertisementListComponent },
  { path: 'applied', component: ApplicationAdvertisementListComponent },
  { path: 'home/company-profile', component: CompanyProfileComponent },
  { path: 'profile-edit', component: SeekerProfileEditComponent },
  { path: 'home/applicationForm/applicationFormconfirm', component:SeekerApplicationFormConfirmComponent },
  { path: 'interviewslot', component:IntViewSeekerBookComponent },
];