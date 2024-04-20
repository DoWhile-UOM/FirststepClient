import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerProfileViewComponent } from './seeker-profile-view.component';

describe('SeekerProfileViewComponent', () => {
  let component: SeekerProfileViewComponent;
  let fixture: ComponentFixture<SeekerProfileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerProfileViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeekerProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
