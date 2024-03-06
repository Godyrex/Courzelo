import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdiPostComponent } from './edi-post.component';

describe('EdiPostComponent', () => {
  let component: EdiPostComponent;
  let fixture: ComponentFixture<EdiPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EdiPostComponent]
    });
    fixture = TestBed.createComponent(EdiPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
