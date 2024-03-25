import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerHomePageComponent } from './seeker-home-page.component';

describe('SeekerHomePageComponent', () => {
  let component: SeekerHomePageComponent;
  let fixture: ComponentFixture<SeekerHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerHomePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeekerHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
