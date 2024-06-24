import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormBuilder,
  FormsModule,
} from '@angular/forms';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { SpinnerComponent } from '../spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SeekerService } from '../../../services/seeker.service';
import { JobfieldService } from '../../../services/jobfield.service';
import { AddSkillsComponent } from '../add-skills/add-skills.component';
import { SeekerEmailVerificationBoxComponent } from '../seeker-email-verification-box/seeker-email-verification-box.component';
import {
  MatProgressSpinnerModule,
  MatSpinner,
} from '@angular/material/progress-spinner';
import { PdfViewComponent } from '../pdf-view/pdf-view.component';

interface SeekerProfile {
  user_id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: number;
  bio: string;
  description: string;
  university: string;
  cVurl: string;
  profile_picture: string;
  linkedin: string;
  field_id: number;
  field_name?: string;
  seekerSkills?: string[];
  cvFile?: File; // New CV file
  profilePictureFile?: File; // New profile picture file
}

@Component({
  selector: 'app-seeker-profile-edit',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    TextFieldModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    NgxSpinnerModule,
    SpinnerComponent,
    SeekerEmailVerificationBoxComponent,
    AddSkillsComponent,
    MatProgressSpinnerModule,
    PdfViewComponent,
  ],
  templateUrl: './seeker-profile-edit.component.html',
  styleUrl: './seeker-profile-edit.component.css',
})
export class SeekerProfileEditComponent implements OnInit {
  seekerDetails: SeekerProfile = {} as SeekerProfile;
  seekerForm: FormGroup;
  hasDataLoaded: boolean = false;
  user_id: number = 0; //temp
  isConfirmedToChangeEmail: boolean = false;
  emailcaptured = '';
  remainingTime: number = 0;
  reqOTPbtntxt: string = 'Request OTP';
  noOfCols: number = 2;
  fields: any = [];
  // passwordFieldType: string = 'password';
  // passwordPlaceholder: string = '********';
  disableViewButton: boolean = false; // Disable view button when no CV is uploaded

  isEmailVerified: boolean = false;
  isOTPRequestSent: boolean = false;
  isFormVerified: boolean = false;

  emailReadOnly: boolean = true;

  readonly defaultImageUrl = './assets/images/dp.png';
  propicUrl = this.defaultImageUrl;
  propicBlobName = '';
  selectedFile: File | null = null;
  selectedimage: File | null = null;
  cVurl: string = '';
  readonly fallbackImageUrl = 'https://firststep.blob.core.windows.net/firststep/systemusers_94754.png?sv=2023-11-03&st=2024-06-14T22%3A57%3A27Z&se=2024-06-15T22%3A57%3A27Z&sr=b&sp=r&sig=nmtnO0WuoVLjj%2BCTpgvfNF8pfW%2Bm9Uw0uoL6c5gEcgo%3D';
  eventOccured: boolean = false;

  skills: string[] = [];
  @ViewChild(AddSkillsComponent) addSkillsComponent!: AddSkillsComponent;

  constructor(
    private fb: FormBuilder,
    private seekerService: SeekerService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private authService: AuthService,
    private jobFieldService: JobfieldService
  ) {
    this.seekerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: [
        '',
        [Validators.required, Validators.pattern(/^\d{7,15}$/)],
      ], // Adjusted pattern for phone numbers with 7-15 digits
      bio: ['', Validators.required],
      description: ['', Validators.required],
      university: [''],
      linkedin: [''],
      cVurl: [''],
      field_id: ['', Validators.required],
      profile_picture: [''],
      password: [''],
      seekerSkills: [[]],
    });

    this.getScreenSize()
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: undefined) {
    try{
      if (window.innerWidth <= 768){
        this.noOfCols = 1;
      }
      else{
        this.noOfCols = 2;
      }
    }
    catch {}
  }

  //image upload
  onselectFile(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedimage = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.propicUrl = (e.target?.result as string) || '';
      };
      reader.readAsDataURL(this.selectedimage);
    }
    this.eventOccured = true;
  }
  
  triggerFileInput() {
    const fileInput = document.getElementById('profile-upload') as HTMLInputElement;
    fileInput.click();
  }

  onImageError() {
    this.propicUrl = this.fallbackImageUrl;
  }

  async ngOnInit() {
    this.spinner.show();
    try {
      // Fetch all job fields
      await this.jobFieldService.getAll().then((response) => {
        this.fields = response;
      });

      this.user_id = this.authService.getUserId();
      // Fetch seeker profile data
      const seeker = await this.seekerService.getSeekerEditProfile(this.user_id);
      // Populate the form with the fetched data
      this.seekerForm.patchValue({
        first_name: seeker.first_name,
        last_name: seeker.last_name,
        email: seeker.email,
        phone_number: seeker.phone_number,
        bio: seeker.bio,
        description: seeker.description,
        university: seeker.university,
        cVurl: seeker.cVurl,
        linkedin: seeker.linkedin,
        field_id: seeker.field_id,
        password: '',
        seekerSkills: seeker.seekerSkills || [],
      });
      this.propicUrl = seeker.profile_picture || this.defaultImageUrl; // Use default image if none is provided
      this.cVurl = seeker.cVurl; // Save the CV URL
      this.skills = this.removeDuplicates(seeker.seekerSkills || []);
      this.emailcaptured = seeker.email;
      this.hasDataLoaded = true;
    } catch (error) {
      this.snackBar.open('Failed to load profile details', '', {
        panelClass: ['app-notification-error'],
        duration: 3000,
      });
    } finally {
      this.spinner.hide();
    }
  }

  ngAfterViewInit() {
    if (this.addSkillsComponent && this.addSkillsComponent.skills) {
      this.skills = this.removeDuplicates(this.addSkillsComponent.skills);
      this.seekerForm.get('seekerSkills')?.setValue(this.skills);
    }
  }

  async onSubmit() {
    if (this.seekerForm.invalid) {
      this.seekerForm.markAllAsTouched();
      return;
    }

    await this.updateProfile();
  }

  async updateProfile() {
    if (this.seekerForm.invalid) {
      this.seekerForm.markAllAsTouched();
      this.snackBar.open('Please fill in all required fields', '', {
        panelClass: ['app-notification-error'],
        duration: 3000,
      });
      return;
    }

    this.spinner.show();
    try {
      const formValue: SeekerProfile = { ...this.seekerForm.value };
      formValue.seekerSkills = this.removeDuplicates(this.skills);

      const formData = new FormData();
      formData.append('email', formValue.email);
      formData.append('first_name', formValue.first_name);
      formData.append('last_name', formValue.last_name);
      formData.append('phone_number', formValue.phone_number.toString());
      formData.append('bio', formValue.bio);
      formData.append('description', formValue.description);
      formData.append('university', formValue.university || '');
      formData.append('CVurl', formValue.cVurl || '');
      formData.append('profile_picture', formValue.profile_picture || '');
      formData.append('linkedin', formValue.linkedin || '');
      formData.append('field_id', formValue.field_id.toString());
      
      // Append each skill individually
      if (formValue.seekerSkills) {
        formValue.seekerSkills.forEach(skill => formData.append('seekerSkills', skill));
      }

      if (formValue.password) {
        formData.append('password', formValue.password);
      }

      if (this.selectedFile) {
        formData.append('cvFile', this.selectedFile);
      }

      if (this.selectedimage) {
        formData.append('profilePictureFile', this.selectedimage);
      }

      await this.seekerService.editSeeker(formData, this.user_id);
      this.snackBar.open('Profile updated successfully', '', {
        panelClass: ['app-notification-normal'],
        duration: 2000,
      });
    } catch (error) {
      console.error('Error updating profile: ', error);
      this.snackBar.open('Failed to update profile', '', {
        panelClass: ['app-notification-error'],
        duration: 3000,
      });
    } finally {
      this.spinner.hide();
    }
  }

  showInformEmailShouldBeVerifiedPopUp() {
    const dialogRef = this.dialog.open(InformEmailShouldBeVerifiedPopUp);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.openDialog();
      } else {
        this.revertEmailChange();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SeekerEmailVerificationBoxComponent, {
      width: '100%',
      maxWidth: '400px',
      height: 'auto',
      data: { email: this.seekerForm.get('email')?.value },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.verified) {
        this.isConfirmedToChangeEmail = true;
        this.seekerForm.get('email')?.setValue(result.emailAddress);
        this.emailcaptured = result.emailAddress;
        this.emailReadOnly = true; // Freeze email editing after updating
        this.snackBar.open('Email verified successfully', '', {
          panelClass: ['app-notification-normal'],
          duration: 2000,
        });
      } else {
        this.snackBar.open('Email verification failed', '', {
          panelClass: ['app-notification-error'],
          duration: 3000,
        });
      }
    });
  }

  revertEmailChange() {
    // Revert the email field to the original value
    this.seekerForm.get('email')?.setValue(this.emailcaptured);
  }

  async discardChanges() {
    this.spinner.show();
    try {
      const seeker = await this.seekerService.getSeekerEditProfile(this.user_id);
      this.seekerForm.patchValue({
        first_name: seeker.first_name,
        last_name: seeker.last_name,
        email: seeker.email,
        phone_number: seeker.phone_number,
        bio: seeker.bio,
        description: seeker.description,
        university: seeker.university,
        cVurl: seeker.cVurl,
        linkedin: seeker.linkedin,
        field_id: seeker.field_id,
        password: '', // Reset the password field
        seekerSkills: seeker.seekerSkills || [],
      });
      this.propicUrl = seeker.profile_picture;
      this.cVurl = seeker.cVurl;
      this.skills = this.removeDuplicates(seeker.seekerSkills || []);
      this.emailcaptured = seeker.email;
      this.snackBar.open('Changes discarded', '', {
        panelClass: ['app-notification-normal'],
        duration: 2000,
      });
    } catch (error) {
      console.error('Failed to discard changes', error);
      this.snackBar.open('Failed to discard changes', '', {
        panelClass: ['app-notification-error'],
        duration: 3000,
      });
    } finally {
      this.spinner.hide();
    }
  }
  
  async deleteAccount() {
    const dialogRef = this.dialog.open(ConfirmDeleteProfilePopUp);
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result === true) {
        this.spinner.show();
        try {
          await this.seekerService.deleteSeeker(this.user_id);
          this.snackBar.open('Profile deleted successfully', '', {
            panelClass: ['app-notification-normal'],
            duration: 2000,
          });
        } catch (error) {
          console.error('Error deleting profile: ', error);
          this.snackBar.open('Failed to delete profile', '', {
            panelClass: ['app-notification-error'],
            duration: 3000,
          });
        } finally {
          this.spinner.hide();
        }
      }
    });
  }

  //Skill Handling

  changeSkillsArray($event: Event) {
    var skills = $event;
    if (skills != null) {
      let skillArray = skills as unknown as string[];
      this.skills = this.removeDuplicates(skillArray);
    }
  }

  onSkillsChange(skills: string[]) {
    this.skills = this.removeDuplicates(skills);
    this.seekerForm.get('seekerSkills')?.setValue(this.skills);
  }

  removeDuplicates(arr: string[]) {
    let uniqueArr = Array.from(new Set(arr));

    if (uniqueArr.length != arr.length) {
      this.snackBar.open('Removed Duplicate Keywords and Skills', '', {
        panelClass: ['app-notification-warning'],
        duration: 3000,
      });
    }

    return uniqueArr;
  }

  private manageSkills(newSkills: string[] | null): string[] {
    let currentSkills = this.seekerForm.get('seekerSkills')?.value || [];
  
    if (newSkills) {
      currentSkills = [...currentSkills, ...newSkills];
    }
  
    return this.removeDuplicates(currentSkills);
  }
  
  phoneNumberErrorMessage() {
    if (this.seekerForm.get('phone_number')?.hasError('required')) {
      return 'Phone number is required';
    }
    if (this.seekerForm.get('phone_number')?.hasError('pattern')) {
      return 'Phone number is invalid';
    }
    return '';
  }

  emailErrorMessage() {
    if (this.seekerForm.get('email')?.hasError('required')) {
      return 'Email is required';
    }
    if (this.seekerForm.get('email')?.hasError('email')) {
      return 'Email is invalid';
    }
    return '';
  }

  seekerNameErrorMessage() {
    if (this.seekerForm.get('first_name')?.hasError('required')) {
      return 'First name is required';
    }
    if (this.seekerForm.get('last_name')?.hasError('required')) {
      return 'Last name is required';
    }
    return '';
  }

  descriptionErrorMessage() {
    if (this.seekerForm.get('description')?.hasError('required')) {
      return 'Description is required';
    }
    return '';
  }

  bioErrorMessage() {
    if (this.seekerForm.get('bio')?.hasError('required')) {
      return 'Bio is required';
    }
    return '';
  }

  universityErrorMessage() {
    if (this.seekerForm.get('university')?.hasError('required')) {
      return 'University is required';
    }
    return '';
  }

  fieldErrorMessage() {
    if (this.seekerForm.get('field_id')?.hasError('required')) {
      return 'Field is required';
    }
    return '';
  }

  getErrorMessage(formControlName: string): string {
    //To get error message for a given form control
    const control = this.seekerForm.get(formControlName);
    if (control?.hasError('required')) {
      return `${formControlName.replace('_', ' ')} is required`;
    }
    if (control?.hasError('email')) {
      return 'Email is invalid';
    }
    if (control?.hasError('pattern')) {
      if (formControlName === 'phone_number') {
        return 'Phone number is invalid';
      }
    }
    return '';
  }

  hasError(formControlName: string): boolean {
    const control = this.seekerForm.get(formControlName);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  onCvSelected(file: File) {
    this.seekerDetails.cvFile = file;
  }

  openPdfViewer() {
    if (this.cVurl) {
      this.dialog.open(PdfViewComponent, {
        data: { documentUrl: this.cVurl },
      });
    } else {
      this.snackBar.open('No CV available to view', '', {
        panelClass: ['app-notification-warning'],
        duration: 3000,
      });
    }
  }

  openUploadDialog(): void {
    const dialogRef = this.dialog.open(UploadCV, {
    });

    dialogRef.componentInstance.fileSelected.subscribe((file: File) => {
      this.selectedFile = file;
      this.seekerForm.patchValue({
        //cvFile: file,
      });
      this.disableViewButton = true; // Disable view button when a new file is selected
    });

    dialogRef.afterClosed().subscribe(() => {
      if (this.selectedFile) {
        this.snackBar.open('File uploaded successfully', '', {
          panelClass: ['app-notification-normal'],
          duration: 2000,
        });
      }
    });
  }
}
// cannot-submit-without-all-inputs-are-valid-pop-up
@Component({
  selector: 'cannot-submit-without-all-inputs-are-valid-pop-up',
  templateUrl: 'cannot-submit-without-all-inputs-are-valid-pop-up.html',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
})
export class CannotSubmitWithoutAllInputsAreValidPopUp {}

// approving-changing-email-pop-up
@Component({
  selector: 'approving-changing-email-pop-up',
  templateUrl: 'approving-changing-email-pop-up.html',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
})
export class ApprovingChangingEmailPopUp {
  givenPermissionToChangeEmail: boolean = false;
  constructor(public dialogRef: MatDialogRef<ApprovingChangingEmailPopUp>) {}

  closeDialog() {
    this.dialogRef.close(this.givenPermissionToChangeEmail);
  }
  yesAction() {
    this.givenPermissionToChangeEmail = true;
    this.dialogRef.close(this.givenPermissionToChangeEmail);
  }
}

// inform-email-should-be-verified-pop-up
@Component({
  selector: 'inform-email-should-be-verified-pop-up',
  templateUrl: 'inform-email-should-be-verified-pop-up.html',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
})
export class InformEmailShouldBeVerifiedPopUp {}

@Component({
  selector: 'confirm-delete-profile-pop-up',
  templateUrl: 'confirm-delete-profile-pop-up.html',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
})
export class ConfirmDeleteProfilePopUp {
  constructor(public dialogRef: MatDialogRef<ConfirmDeleteProfilePopUp>) {}

  closeDialog() {
    this.dialogRef.close(false);
  }
  yesAction() {
    this.dialogRef.close(true);
  }
}

@Component({
  selector: 'app-upload-cv',
  templateUrl: 'upload-cv.html',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule,
  ],
})
export class UploadCV {
  @Output() fileSelected = new EventEmitter<File>();
  uploadInProgress = false;
  uploadSuccess = false;
  constructor(public dialogRef: MatDialogRef<UploadCV>) {}

  async onFileSelected($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadInProgress = true;
      this.uploadSuccess = false;
      const file = input.files[0];

      try {
        await this.fileUploadSimulate(file);
        this.uploadSuccess = true;
        this.fileSelected.emit(file);
      } catch (error) {
      } finally {
        this.uploadInProgress = false;
      }
    }
  }

  fileUploadSimulate(file: File): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(''); // No URL used here, just resolve the promise
      }, 3000);
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
