import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMangerComponent } from './user-manger.component';

describe('UserMangerComponent', () => {
  let component: UserMangerComponent;
  let fixture: ComponentFixture<UserMangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMangerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
