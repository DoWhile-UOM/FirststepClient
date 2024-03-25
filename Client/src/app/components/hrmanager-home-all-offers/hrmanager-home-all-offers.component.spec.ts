import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRManagerHomeAllOffersComponent } from './hrmanager-home-all-offers.component';

describe('HRManagerHomeAllOffersComponent', () => {
  let component: HRManagerHomeAllOffersComponent;
  let fixture: ComponentFixture<HRManagerHomeAllOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HRManagerHomeAllOffersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HRManagerHomeAllOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
