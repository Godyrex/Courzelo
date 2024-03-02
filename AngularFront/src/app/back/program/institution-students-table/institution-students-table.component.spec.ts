import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionStudentsTableComponent } from './institution-students-table.component';

describe('InstitutionStudentsTableComponent', () => {
  let component: InstitutionStudentsTableComponent;
  let fixture: ComponentFixture<InstitutionStudentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionStudentsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitutionStudentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
