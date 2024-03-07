import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddFieldOfStudyComponent} from './add-field-of-study.component';

describe('AddFieldOfStudyComponent', () => {
  let component: AddFieldOfStudyComponent;
  let fixture: ComponentFixture<AddFieldOfStudyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFieldOfStudyComponent]
    });
    fixture = TestBed.createComponent(AddFieldOfStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
