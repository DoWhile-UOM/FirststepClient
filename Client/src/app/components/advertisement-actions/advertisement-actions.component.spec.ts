import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementActionsComponent } from './advertisement-actions.component';

describe('AdvertisementActionsComponent', () => {
  let component: AdvertisementActionsComponent;
  let fixture: ComponentFixture<AdvertisementActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvertisementActionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvertisementActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
