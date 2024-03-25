import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleProfileEditComponent } from './role-profile-edit.component';

describe('RoleProfileEditComponent', () => {
  let component: RoleProfileEditComponent;
  let fixture: ComponentFixture<RoleProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleProfileEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
