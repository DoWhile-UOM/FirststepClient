import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmanagerApplicationViewComponent } from './hrmanager-application-view.component';

describe('HrmanagerApplicationViewComponent', () => {
  let component: HrmanagerApplicationViewComponent;
  let fixture: ComponentFixture<HrmanagerApplicationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrmanagerApplicationViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrmanagerApplicationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
