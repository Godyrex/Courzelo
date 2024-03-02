import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionAddStudentComponent } from './institution-add-student.component';

describe('InstitutionAddStudentComponent', () => {
  let component: InstitutionAddStudentComponent;
  let fixture: ComponentFixture<InstitutionAddStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionAddStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitutionAddStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
