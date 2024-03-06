import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InstitutionUpdateFormComponent} from './institution-update-form.component';

describe('InstitutionUpdateFormComponent', () => {
  let component: InstitutionUpdateFormComponent;
  let fixture: ComponentFixture<InstitutionUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstitutionUpdateFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InstitutionUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
