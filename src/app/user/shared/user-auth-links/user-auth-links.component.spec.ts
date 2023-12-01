import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthLinksComponent } from './user-auth-links.component';

describe('UserAuthLinksComponent', () => {
  let component: UserAuthLinksComponent;
  let fixture: ComponentFixture<UserAuthLinksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAuthLinksComponent]
    });
    fixture = TestBed.createComponent(UserAuthLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
