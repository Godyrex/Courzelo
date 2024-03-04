import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InstitutionUsersTableComponent} from './institution-users-table.component';

describe('InstitutionUsersTableComponent', () => {
  let component: InstitutionUsersTableComponent;
  let fixture: ComponentFixture<InstitutionUsersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstitutionUsersTableComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InstitutionUsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
