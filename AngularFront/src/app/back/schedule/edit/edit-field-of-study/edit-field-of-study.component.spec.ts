import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditFieldOfStudyComponent} from './edit-field-of-study.component';

describe('EditFieldOfStudyComponent', () => {
  let component: EditFieldOfStudyComponent;
  let fixture: ComponentFixture<EditFieldOfStudyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFieldOfStudyComponent]
    });
    fixture = TestBed.createComponent(EditFieldOfStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
