import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerSubmitedApplicationsComponent } from './seeker-submited-applications.component';

describe('SeekerSubmitedApplicationsComponent', () => {
  let component: SeekerSubmitedApplicationsComponent;
  let fixture: ComponentFixture<SeekerSubmitedApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerSubmitedApplicationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeekerSubmitedApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
