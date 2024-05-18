import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReclamationsComponent } from './update-reclamations.component';

describe('UpdateReclamationsComponent', () => {
  let component: UpdateReclamationsComponent;
  let fixture: ComponentFixture<UpdateReclamationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReclamationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateReclamationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
