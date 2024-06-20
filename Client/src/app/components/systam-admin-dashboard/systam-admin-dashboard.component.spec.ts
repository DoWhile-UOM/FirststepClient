import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystamAdminDashboardComponent } from './systam-admin-dashboard.component';

describe('SystamAdminDashboardComponent', () => {
  let component: SystamAdminDashboardComponent;
  let fixture: ComponentFixture<SystamAdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystamAdminDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystamAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
