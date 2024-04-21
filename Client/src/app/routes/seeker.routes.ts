import { Routes } from '@angular/router';

import { AdvertisementViewPageComponent } from '../components/advertisement-view-page/advertisement-view-page.component';
import { SeekerHomePageComponent } from '../components/seeker-home-page/seeker-home-page.component';
import { SavedAdvertisementListComponent } from '../components/saved-advertisement-list/saved-advertisement-list.component';
import { CompanyProfileComponent } from '../components/company-profile/company-profile.component';
import { NewJobUploadedComponent } from '../components/new-job-uploaded/new-job-uploaded.component';
import { SeekerApplicationFormComponent } from '../components/seeker-application-form/seeker-application-form.component';
import { SeekerEditProfileComponent } from '../components/seeker-edit-profile/seeker-edit-profile.component';
import { SeekerSignupComponent } from '../components/seeker-signup/seeker-signup.component';
import { Signup2Component } from '../components/signup2/signup2.component';
import { SeekerProfileViewComponent } from '../components/seeker-profile-view/seeker-profile-view.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'jobdetails', component: AdvertisementViewPageComponent },
  { path: 'home', component: SeekerHomePageComponent },
  { path: 'home/saved', component: SavedAdvertisementListComponent },
  { path: 'company-profile', component: CompanyProfileComponent },
  { path: 'newJobUploaded', component: NewJobUploadedComponent },
  { path: 'applicationForm', component: SeekerApplicationFormComponent },
  { path: 'applicationFormconfirm', component: SeekerApplicationFormComponent },
  { path: 'editProfile', component: SeekerEditProfileComponent},
  { path: 'signup', component: SeekerSignupComponent},
  { path: 'signup2', component: Signup2Component},
  { path: 'profileView', component: SeekerProfileViewComponent}
];