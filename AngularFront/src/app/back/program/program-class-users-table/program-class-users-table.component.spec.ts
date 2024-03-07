import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgramClassUsersTableComponent} from './program-class-users-table.component';

describe('ProgramClassUsersTableComponent', () => {
  let component: ProgramClassUsersTableComponent;
  let fixture: ComponentFixture<ProgramClassUsersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgramClassUsersTableComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProgramClassUsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
