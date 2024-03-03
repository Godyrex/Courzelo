import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramAddFormComponent } from './program-add-form.component';

describe('ProgramAddFormComponent', () => {
  let component: ProgramAddFormComponent;
  let fixture: ComponentFixture<ProgramAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramAddFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
