import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChapterComponent } from './user-chapter.component';

describe('UserChapterComponent', () => {
  let component: UserChapterComponent;
  let fixture: ComponentFixture<UserChapterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserChapterComponent]
    });
    fixture = TestBed.createComponent(UserChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
