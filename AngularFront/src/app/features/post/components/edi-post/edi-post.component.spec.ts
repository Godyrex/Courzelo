import {ComponentFixture, TestBed} from '@angular/core/testing';

<<<<<<<< HEAD:AngularFront/src/app/features/post/components/edi-post/edi-post.component.spec.ts
import { EdiPostComponent } from './edi-post.component';
========
import {RegisterComponent} from './register.component';
>>>>>>>> main:AngularFront/src/app/back/auth/register/register.component.spec.ts

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
