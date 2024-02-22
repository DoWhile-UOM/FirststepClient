import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekersignupComponent } from './seekersignup.component';

describe('SeekersignupComponent', () => {
  let component: SeekersignupComponent;
  let fixture: ComponentFixture<SeekersignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekersignupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeekersignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
