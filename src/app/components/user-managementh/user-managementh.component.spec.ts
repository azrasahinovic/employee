import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementhComponent } from './user-managementh.component';

describe('UserManagementhComponent', () => {
  let component: UserManagementhComponent;
  let fixture: ComponentFixture<UserManagementhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManagementhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
