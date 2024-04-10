import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JoinProgramDialogComponent} from './join-program-dialog.component';

describe('JoinProgramDialogComponent', () => {
  let component: JoinProgramDialogComponent;
  let fixture: ComponentFixture<JoinProgramDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinProgramDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinProgramDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
