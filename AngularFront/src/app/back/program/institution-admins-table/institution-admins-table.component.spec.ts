import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionAdminsTableComponent } from './institution-admins-table.component';

describe('InstitutionAdminsTableComponent', () => {
  let component: InstitutionAdminsTableComponent;
  let fixture: ComponentFixture<InstitutionAdminsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionAdminsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitutionAdminsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
