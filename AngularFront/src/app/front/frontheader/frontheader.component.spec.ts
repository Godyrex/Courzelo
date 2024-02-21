import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontheaderComponent } from './frontheader.component';

describe('FrontheaderComponent', () => {
  let component: FrontheaderComponent;
  let fixture: ComponentFixture<FrontheaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrontheaderComponent]
    });
    fixture = TestBed.createComponent(FrontheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
