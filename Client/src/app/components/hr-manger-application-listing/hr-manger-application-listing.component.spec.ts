import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrMangerApplicationListingComponent } from './hr-manger-application-listing.component';

describe('HrMangerApplicationListingComponent', () => {
  let component: HrMangerApplicationListingComponent;
  let fixture: ComponentFixture<HrMangerApplicationListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrMangerApplicationListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrMangerApplicationListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
