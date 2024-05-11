import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerEditProfileComponent } from './seeker-edit-profile.component';

describe('SeekerEditProfileComponent', () => {
  let component: SeekerEditProfileComponent;
  let fixture: ComponentFixture<SeekerEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerEditProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeekerEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
