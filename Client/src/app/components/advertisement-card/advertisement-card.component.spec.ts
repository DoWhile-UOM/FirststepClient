import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementCardComponent } from './advertisement-card.component';

describe('AdvertisementCardComponent', () => {
  let component: AdvertisementCardComponent;
  let fixture: ComponentFixture<AdvertisementCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvertisementCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvertisementCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
