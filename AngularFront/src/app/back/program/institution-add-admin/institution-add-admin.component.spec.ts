import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionAddAdminComponent } from './institution-add-admin.component';

describe('InstitutionAddAdminComponent', () => {
  let component: InstitutionAddAdminComponent;
  let fixture: ComponentFixture<InstitutionAddAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionAddAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitutionAddAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
