/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListCourseContentComponent} from './list-course-content.component';

describe('ListCourseContentComponent', () => {
  let component: ListCourseContentComponent;
  let fixture: ComponentFixture<ListCourseContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListCourseContentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCourseContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
