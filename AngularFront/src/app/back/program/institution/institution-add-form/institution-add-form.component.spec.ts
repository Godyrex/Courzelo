import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InstitutionAddFormComponent} from './institution-add-form.component';

describe('InstitutionAddFormComponent', () => {
  let component: InstitutionAddFormComponent;
  let fixture: ComponentFixture<InstitutionAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstitutionAddFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InstitutionAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
