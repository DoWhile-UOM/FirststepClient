import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedAdvertisementListComponent } from './saved-advertisement-list.component';

describe('SavedAdvertisementListComponent', () => {
  let component: SavedAdvertisementListComponent;
  let fixture: ComponentFixture<SavedAdvertisementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedAdvertisementListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavedAdvertisementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
