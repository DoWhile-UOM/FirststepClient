import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrManagerApplicationListingComponent } from './hr-manager-application-listing.component';

describe('HrManagerApplicationListingComponent', () => {
  let component: HrManagerApplicationListingComponent;
  let fixture: ComponentFixture<HrManagerApplicationListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrManagerApplicationListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrManagerApplicationListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
