import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntViewConfirmComponent } from './int-view-confirm.component';

describe('IntViewConfirmComponent', () => {
  let component: IntViewConfirmComponent;
  let fixture: ComponentFixture<IntViewConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntViewConfirmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntViewConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
