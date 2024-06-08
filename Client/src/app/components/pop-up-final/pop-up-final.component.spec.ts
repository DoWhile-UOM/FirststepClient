import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpFinalComponent } from './pop-up-final.component';

describe('PopUpFinalComponent', () => {
  let component: PopUpFinalComponent;
  let fixture: ComponentFixture<PopUpFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpFinalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
