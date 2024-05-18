import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerSignupComponent } from './seeker-signup.component';

describe('SeekerSignupComponent', () => {
  let component: SeekerSignupComponent;
  let fixture: ComponentFixture<SeekerSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerSignupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeekerSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
