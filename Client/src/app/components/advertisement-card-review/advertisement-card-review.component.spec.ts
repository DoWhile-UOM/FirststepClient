import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementCardReviewComponent } from './advertisement-card-review.component';

describe('AdvertisementCardReviewComponent', () => {
  let component: AdvertisementCardReviewComponent;
  let fixture: ComponentFixture<AdvertisementCardReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvertisementCardReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvertisementCardReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
