import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpSecondPageComponent } from './sign-up-second-page.component';

describe('SignUpSecondPageComponent', () => {
  let component: SignUpSecondPageComponent;
  let fixture: ComponentFixture<SignUpSecondPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpSecondPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignUpSecondPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
