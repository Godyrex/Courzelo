import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditNonDisponibilityComponent} from './edit-non-disponibility.component';

describe('EditNonDisponibilityComponent', () => {
  let component: EditNonDisponibilityComponent;
  let fixture: ComponentFixture<EditNonDisponibilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditNonDisponibilityComponent]
    });
    fixture = TestBed.createComponent(EditNonDisponibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
