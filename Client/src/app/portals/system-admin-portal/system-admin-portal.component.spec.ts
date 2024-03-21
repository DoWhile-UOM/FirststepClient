import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAdminPortalComponent } from './system-admin-portal.component';

describe('SystemAdminPortalComponent', () => {
  let component: SystemAdminPortalComponent;
  let fixture: ComponentFixture<SystemAdminPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemAdminPortalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemAdminPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
