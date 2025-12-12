import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDialog } from './users-dialog';

describe('UsersDialog', () => {
  let component: UsersDialog;
  let fixture: ComponentFixture<UsersDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
