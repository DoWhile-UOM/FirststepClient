import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordReqComponent } from './reset-password-req.component';

describe('ResetPasswordReqComponent', () => {
  let component: ResetPasswordReqComponent;
  let fixture: ComponentFixture<ResetPasswordReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordReqComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResetPasswordReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
