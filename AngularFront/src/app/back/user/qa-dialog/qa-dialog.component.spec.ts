import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QaDialogComponent} from './qa-dialog.component';

describe('QaDialogComponent', () => {
  let component: QaDialogComponent;
  let fixture: ComponentFixture<QaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
