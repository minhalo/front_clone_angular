import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatManageComponent } from './cat-manage.component';

describe('CatManageComponent', () => {
  let component: CatManageComponent;
  let fixture: ComponentFixture<CatManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
