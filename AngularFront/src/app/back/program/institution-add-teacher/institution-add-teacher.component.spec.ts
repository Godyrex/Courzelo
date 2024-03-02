import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionAddTeacherComponent } from './institution-add-teacher.component';

describe('InstitutionAddTeacherComponent', () => {
  let component: InstitutionAddTeacherComponent;
  let fixture: ComponentFixture<InstitutionAddTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionAddTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitutionAddTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
