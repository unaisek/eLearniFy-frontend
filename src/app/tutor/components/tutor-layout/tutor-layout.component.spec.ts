import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorLayoutComponent } from './tutor-layout.component';

describe('TutorLayoutComponent', () => {
  let component: TutorLayoutComponent;
  let fixture: ComponentFixture<TutorLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TutorLayoutComponent]
    });
    fixture = TestBed.createComponent(TutorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
