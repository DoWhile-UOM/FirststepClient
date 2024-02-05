import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkillPopUpComponent } from './add-skill-pop-up.component';

describe('AddSkillPopUpComponent', () => {
  let component: AddSkillPopUpComponent;
  let fixture: ComponentFixture<AddSkillPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSkillPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSkillPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
