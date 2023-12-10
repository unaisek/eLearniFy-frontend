import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorMenuComponent } from './tutor-menu.component';

describe('TutorMenuComponent', () => {
  let component: TutorMenuComponent;
  let fixture: ComponentFixture<TutorMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TutorMenuComponent]
    });
    fixture = TestBed.createComponent(TutorMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
