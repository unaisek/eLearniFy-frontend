import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCourseViewComponent } from './user-course-view.component';

describe('UserCourseViewComponent', () => {
  let component: UserCourseViewComponent;
  let fixture: ComponentFixture<UserCourseViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCourseViewComponent]
    });
    fixture = TestBed.createComponent(UserCourseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
