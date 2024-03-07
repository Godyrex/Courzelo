/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddGradesComponent} from './add-grades.component';

describe('AddGradesComponent', () => {
  let component: AddGradesComponent;
  let fixture: ComponentFixture<AddGradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddGradesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
