/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditAssignementComponent} from './edit-assignement.component';

describe('EditAssignementComponent', () => {
  let component: EditAssignementComponent;
  let fixture: ComponentFixture<EditAssignementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditAssignementComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssignementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
