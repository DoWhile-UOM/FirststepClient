import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementViewPageComponent } from './advertisement-view-page.component';

describe('AdvertisementViewPageComponent', () => {
  let component: AdvertisementViewPageComponent;
  let fixture: ComponentFixture<AdvertisementViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvertisementViewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvertisementViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
