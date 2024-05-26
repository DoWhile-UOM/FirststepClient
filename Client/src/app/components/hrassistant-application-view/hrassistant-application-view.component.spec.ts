import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrassistantApplicationViewComponent } from './hrassistant-application-view.component';

describe('HrassistantApplicationViewComponent', () => {
  let component: HrassistantApplicationViewComponent;
  let fixture: ComponentFixture<HrassistantApplicationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrassistantApplicationViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrassistantApplicationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
