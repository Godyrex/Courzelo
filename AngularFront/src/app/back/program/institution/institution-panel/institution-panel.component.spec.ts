import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InstitutionPanelComponent} from './institution-panel.component';

describe('InstitutionPanelComponent', () => {
  let component: InstitutionPanelComponent;
  let fixture: ComponentFixture<InstitutionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstitutionPanelComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InstitutionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
