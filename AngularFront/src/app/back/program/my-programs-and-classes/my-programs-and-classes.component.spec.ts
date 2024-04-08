import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProgramsAndClassesComponent } from './my-programs-and-classes.component';

describe('MyProgramsAndClassesComponent', () => {
  let component: MyProgramsAndClassesComponent;
  let fixture: ComponentFixture<MyProgramsAndClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyProgramsAndClassesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProgramsAndClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
