import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileByEmailComponent } from './user-profile-by-email.component';

describe('UserProfileByEmailComponent', () => {
  let component: UserProfileByEmailComponent;
  let fixture: ComponentFixture<UserProfileByEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileByEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileByEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
