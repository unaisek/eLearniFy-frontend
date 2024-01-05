import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledCourseViewComponent } from './enrolled-course-view.component';

describe('EnrolledCourseViewComponent', () => {
  let component: EnrolledCourseViewComponent;
  let fixture: ComponentFixture<EnrolledCourseViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrolledCourseViewComponent]
    });
    fixture = TestBed.createComponent(EnrolledCourseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
