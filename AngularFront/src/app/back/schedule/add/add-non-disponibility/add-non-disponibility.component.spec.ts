import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddNonDisponibilityComponent} from './add-non-disponibility.component';

describe('AddNonDisponibilityComponent', () => {
  let component: AddNonDisponibilityComponent;
  let fixture: ComponentFixture<AddNonDisponibilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNonDisponibilityComponent]
    });
    fixture = TestBed.createComponent(AddNonDisponibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
