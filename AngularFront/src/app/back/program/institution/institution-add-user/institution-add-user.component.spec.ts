import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InstitutionAddUserComponent} from './institution-add-user.component';

describe('InstitutionAddUserComponent', () => {
  let component: InstitutionAddUserComponent;
  let fixture: ComponentFixture<InstitutionAddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstitutionAddUserComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InstitutionAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
