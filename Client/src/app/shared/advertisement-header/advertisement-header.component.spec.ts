import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementHeaderComponent } from './advertisement-header.component';

describe('AdvertisementHeaderComponent', () => {
  let component: AdvertisementHeaderComponent;
  let fixture: ComponentFixture<AdvertisementHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvertisementHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvertisementHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
