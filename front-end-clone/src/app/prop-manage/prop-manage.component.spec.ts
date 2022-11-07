import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropManageComponent } from './prop-manage.component';

describe('PropManageComponent', () => {
  let component: PropManageComponent;
  let fixture: ComponentFixture<PropManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
