import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddDepartementComponent} from './add-departement.component';

describe('AddDepartementComponent', () => {
  let component: AddDepartementComponent;
  let fixture: ComponentFixture<AddDepartementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDepartementComponent]
    });
    fixture = TestBed.createComponent(AddDepartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
