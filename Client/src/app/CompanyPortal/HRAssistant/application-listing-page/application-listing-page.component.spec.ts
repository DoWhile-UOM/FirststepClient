import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationListingPageComponent } from './application-listing-page.component';

describe('ApplicationListingPageComponent', () => {
  let component: ApplicationListingPageComponent;
  let fixture: ComponentFixture<ApplicationListingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationListingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
