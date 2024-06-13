import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAdminDashboardComponent } from './system-admin-dashboard.component';

describe('SystemAdminDashboardComponent', () => {
  let component: SystemAdminDashboardComponent;
  let fixture: ComponentFixture<SystemAdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemAdminDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
