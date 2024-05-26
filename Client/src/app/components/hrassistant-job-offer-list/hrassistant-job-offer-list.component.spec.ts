import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrassistantJobOfferListComponent } from './hrassistant-job-offer-list.component';

describe('HrassistantJobOfferListComponent', () => {
  let component: HrassistantJobOfferListComponent;
  let fixture: ComponentFixture<HrassistantJobOfferListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrassistantJobOfferListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrassistantJobOfferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
