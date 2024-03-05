import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgramAddClassComponent} from './program-add-class.component';

describe('ProgramAddClassComponent', () => {
  let component: ProgramAddClassComponent;
  let fixture: ComponentFixture<ProgramAddClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgramAddClassComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProgramAddClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
