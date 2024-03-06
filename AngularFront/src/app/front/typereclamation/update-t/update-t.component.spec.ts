import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTComponent } from './update-t.component';

describe('UpdateTComponent', () => {
  let component: UpdateTComponent;
  let fixture: ComponentFixture<UpdateTComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTComponent]
    });
    fixture = TestBed.createComponent(UpdateTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
