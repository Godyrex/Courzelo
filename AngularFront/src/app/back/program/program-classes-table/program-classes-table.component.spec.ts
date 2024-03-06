import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgramClassesTableComponent} from './program-classes-table.component';

describe('ProgramClassesTableComponent', () => {
  let component: ProgramClassesTableComponent;
  let fixture: ComponentFixture<ProgramClassesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgramClassesTableComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProgramClassesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
