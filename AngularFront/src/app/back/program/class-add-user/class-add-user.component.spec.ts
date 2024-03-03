import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAddUserComponent } from './class-add-user.component';

describe('ClassAddUserComponent', () => {
  let component: ClassAddUserComponent;
  let fixture: ComponentFixture<ClassAddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassAddUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
