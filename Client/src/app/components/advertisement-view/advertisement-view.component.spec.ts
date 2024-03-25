import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementViewComponent } from './advertisement-view.component';

describe('AdvertisementViewComponent', () => {
  let component: AdvertisementViewComponent;
  let fixture: ComponentFixture<AdvertisementViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvertisementViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvertisementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
