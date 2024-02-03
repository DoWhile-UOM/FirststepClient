import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubordinateAccountPopupComponent } from './subordinate-account-popup.component';

describe('SubordinateAccountPopupComponent', () => {
  let component: SubordinateAccountPopupComponent;
  let fixture: ComponentFixture<SubordinateAccountPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubordinateAccountPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubordinateAccountPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
