import {
  Component,
  OnInit,
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    MatProgressSpinnerModule
  ],
  templateUrl: './seeker-profile-edit.component.html',
  styleUrl: './seeker-profile-edit.component.css',
})
export class SeekerProfileEditComponent implements OnInit {
  seekerForm: FormGroup;
  hasDataLoaded: boolean = false;
  user_id: number = 2095; //temp
  isConfirmedToChangeEmail: boolean = false;
  emailcaptured = '';
  remainingTime: number = 0;
  reqOTPbtntxt: string = 'Request OTP';
  noOfCols: number = 2;
  fields: any = [];
  passwordFieldType: string = 'password';
  passwordPlaceholder: string = '********';

  isEmailVerified: boolean = false;
  isOTPRequestSent: boolean = false;
  isFormVerified: boolean = false;

  emailReadOnly: boolean = true;

  logoUrl = '';
  logoBlobName = '';
  selectedFile: File | null = null;
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
      cVurl: ['defaultCVurlValue'], // Set default value for cVurl
      // cVurl: [''], // Add cVurl field here
      field_id: ['', Validators.required],
      password: [''],
      seekerSkills: [[]],
    });
  }
//image upload
// onselectFile(event: any) {
//   const input = event.target as HTMLInputElement;
//   if (input.files && input.files[0]) {
//     this.selectedFile = input.files[0];
//     const reader = new FileReader();
//     reader.onload = (e: ProgressEvent<FileReader>) => {
//       this.logoUrl = (e.target?.result as string) || '';
//     };
//     reader.readAsDataURL(this.selectedFile);
//   }
//   this.eventOccured = true;
// }
// async onSaveLogo() {
//   if (this.selectedFile) {
//     await this.seekerService.updateProfilePicture(this.selectedFile, this.user_id)
//       .then(response => {
//         console.log('Upload successful', response);
//       })
//       .catch(error => {
//         console.error('Upload error', error);
//       });
//   } else {
//     console.error('No file selected!');
//   }
//   this.eventOccured = false;
// }


  async ngOnInit() {
    this.spinner.show();
    try {
      // Fetch all job fields
      await this.jobFieldService.getAll().then((response) => {
        this.fields = response;
      });
      // Fetch seeker profile data
      const seeker = await this.seekerService.getSeekerProfile(this.user_id);
      // Populate the form with the fetched data
      this.seekerForm.patchValue({
        first_name: seeker.first_name,
        last_name: seeker.last_name,
        email: seeker.email,
        phone_number: seeker.phone_number,
        bio: seeker.bio,
        description: seeker.description,
        university: seeker.university,
        cVurl: seeker.cVurl || 'defaultCVurlValue',
        // cVurl: ['', Validators.required], // Add cVurl field here
        linkedin: seeker.linkedin,
        field_id: seeker.field_id,
        password: this.passwordPlaceholder,
        seekerSkills: seeker.seekerSkills || [],
      });

      this.skills = this.removeDuplicates(seeker.seekerSkills || []);      
      this.emailcaptured = seeker.email;
      this.hasDataLoaded = true;
    } catch (error) {
      console.error(error);
      this.snackBar.open('Failed to load profile details', 'Close', {
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
  

  togglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onPasswordFocus() {
    // Clear the password field if it contains the placeholder
    if (this.seekerForm.get('password')?.value === this.passwordPlaceholder) {
      this.seekerForm.get('password')?.setValue('');
    }
  }

  onPasswordBlur() {
    // Restore the password placeholder if the field is empty
    if (!this.seekerForm.get('password')?.value) {
      this.seekerForm.get('password')?.setValue(this.passwordPlaceholder);
    }
  }
  async onSubmit() {
    if (this.seekerForm.invalid) {
      this.seekerForm.markAllAsTouched(); // Mark all fields as touched to trigger validation messages
      this.dialog.open(CannotSubmitWithoutAllInputsAreValidPopUp);
      return;
    }

    await this.updateProfile();
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
      width: '400px',
      data: { email: this.seekerForm.get('email')?.value },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.verified) {
        this.isConfirmedToChangeEmail = true;
        this.seekerForm.get('email')?.setValue(result.emailAddress);
        this.emailcaptured = result.emailAddress;
        this.emailReadOnly = true; // Freeze email editing after updating
        this.snackBar.open('Email verified successfully', 'Close', {
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

  async updateProfile() {
    this.spinner.show();
    try {
      const formValue: Partial<SeekerProfile> = { ...this.seekerForm.value };
  
      // Check if the password field is the placeholder or null and if so, delete it from the payload
      if (formValue.password === this.passwordPlaceholder || formValue.password === null) {
        delete formValue.password;
      }

      formValue.seekerSkills = this.skills;
  
      // Update seeker profile
      await this.seekerService.editSeeker(
        formValue as SeekerProfile,
        this.user_id
      );
      this.snackBar.open('Profile updated successfully', 'Close', {
        duration: 2000,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error updating profile: ', error.message);
        this.snackBar.open('Failed to update profile', 'Close', {
          duration: 3000,
        });
      } else {
        console.error('An unknown error occurred.');
        this.snackBar.open('An unknown error occurred', 'Close', {
          duration: 3000,
        });
      }
    } finally {
      this.spinner.hide();
    }
  }
  

  revertEmailChange() {
    // Revert the email field to the original value
    this.seekerForm.get('email')?.setValue(this.emailcaptured);
  }

  async discardChanges() {
    // Discard changes and reload the original profile data
    this.spinner.show();
    try {
      const seeker = await this.seekerService.getSeekerProfile(this.user_id);
      this.seekerForm.patchValue({
        ...seeker,
        password: this.passwordPlaceholder,
        seekerSkills: seeker.seekerSkills || [],
      });
      this.snackBar.open('Changes discarded', 'Close', { duration: 2000 });
    } catch (error) {
      console.error(error);
      this.snackBar.open('Failed to discard changes', 'Close', {
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
          this.snackBar.open('Profile deleted successfully', 'Close', {
            duration: 2000,
          });
        } catch (error) {
          console.error('Error deleting profile: ', error);
          this.snackBar.open('Failed to delete profile', 'Close', {
            duration: 3000,
          });
        } finally {
          this.spinner.hide();
        }
      }
    });
  }

  changeSkillsArray($event: Event){
		var skills = $event;
		if (skills != null){
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

		if (uniqueArr.length != arr.length){
			this.snackBar.open("Removed Duplicate Keywords and Skills", "", {panelClass: ['app-notification-warning']})._dismissAfter(3000);
		}

		return uniqueArr;
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

  // passwordErrorMessage() {
  //   if (this.seekerForm.get('password')?.hasError('required')) {
  //     return 'Password is required';
  //   }
  //   return '';
  // }

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