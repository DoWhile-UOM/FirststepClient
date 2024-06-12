import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerificationBoxComponent } from './email-verification-box.component';

describe('EmailVerificationBoxComponent', () => {
  let component: EmailVerificationBoxComponent;
  let fixture: ComponentFixture<EmailVerificationBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailVerificationBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailVerificationBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
