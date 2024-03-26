import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrAssistantApplicationListingComponent } from './hr-assistant-application-listing.component';

describe('HrAssistantApplicationListingComponent', () => {
  let component: HrAssistantApplicationListingComponent;
  let fixture: ComponentFixture<HrAssistantApplicationListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrAssistantApplicationListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrAssistantApplicationListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
