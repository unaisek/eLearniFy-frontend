import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorHeaderComponent } from './tutor-header.component';

describe('TutorHeaderComponent', () => {
  let component: TutorHeaderComponent;
  let fixture: ComponentFixture<TutorHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TutorHeaderComponent]
    });
    fixture = TestBed.createComponent(TutorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
