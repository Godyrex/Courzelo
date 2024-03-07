/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddAssignementComponent} from './add-assignement.component';

describe('AddAssignementComponent', () => {
  let component: AddAssignementComponent;
  let fixture: ComponentFixture<AddAssignementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddAssignementComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssignementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
