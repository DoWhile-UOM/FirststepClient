import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrassistantApplicationListingComponent } from './hrassistant-application-listing.component';

describe('HrassistantApplicationListingComponent', () => {
  let component: HrassistantApplicationListingComponent;
  let fixture: ComponentFixture<HrassistantApplicationListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrassistantApplicationListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrassistantApplicationListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
