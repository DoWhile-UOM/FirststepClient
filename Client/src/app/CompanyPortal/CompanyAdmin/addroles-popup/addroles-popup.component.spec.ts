import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrolesPopupComponent } from './addroles-popup.component';

describe('AddrolesPopupComponent', () => {
  let component: AddrolesPopupComponent;
  let fixture: ComponentFixture<AddrolesPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddrolesPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddrolesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
