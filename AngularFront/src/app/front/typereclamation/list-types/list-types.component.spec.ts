import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypesComponent } from './list-types.component';

describe('ListTypesComponent', () => {
  let component: ListTypesComponent;
  let fixture: ComponentFixture<ListTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTypesComponent]
    });
    fixture = TestBed.createComponent(ListTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
