import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionTeachersTableComponent } from './institution-teachers-table.component';

describe('InstitutionTeachersTableComponent', () => {
  let component: InstitutionTeachersTableComponent;
  let fixture: ComponentFixture<InstitutionTeachersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionTeachersTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitutionTeachersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
