import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GestionFieldOfStudyComponent} from './gestion-field-of-study.component';

describe('GestionFieldOfStudyComponent', () => {
  let component: GestionFieldOfStudyComponent;
  let fixture: ComponentFixture<GestionFieldOfStudyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionFieldOfStudyComponent]
    });
    fixture = TestBed.createComponent(GestionFieldOfStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
