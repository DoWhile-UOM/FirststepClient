import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntViewSeekerBookComponent } from './int-view-seeker-book.component';

describe('IntViewSeekerBookComponent', () => {
  let component: IntViewSeekerBookComponent;
  let fixture: ComponentFixture<IntViewSeekerBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntViewSeekerBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntViewSeekerBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
