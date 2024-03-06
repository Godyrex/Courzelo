import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramUpdateFormComponent } from './program-update-form.component';

describe('ProgramUpdateFormComponent', () => {
  let component: ProgramUpdateFormComponent;
  let fixture: ComponentFixture<ProgramUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramUpdateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
