import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { UsersPage } from './users-page';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { WhatTimeApi } from '../../services/what-time-api';
import { of} from 'rxjs';
import { UsersDialog } from '../users-dialog/users-dialog';

describe('UsersPage', () => {
  let component: UsersPage;
  let fixture: ComponentFixture<UsersPage>;
  let mockWhatTimeApi: Partial<WhatTimeApi>;
  let matDialogMock: Partial<MatDialog>;

  beforeEach(async () => {
    matDialogMock = {
        open: vi.fn()
    }
    mockWhatTimeApi = {
        getUserById: vi.fn().mockReturnValue(of({
    "id": 1,
    "name": "John",
    "surname": "John",
    "mail": "mail@gmail.com",
    "followTags": [
        {
            "id": 2,
            "tagId": 1,
            "accountId": 1,
            "nameTag": "Beebo"
        }
    ],
    "inscriptions": [
        {
            "id": 1,
            "accountId": 1,
            "eventId": 1
        },
        {
            "id": 11,
            "accountId": 1,
            "eventId": 4
        }
    ],
    "role": "ROLE_USER"
})),
        getUsers: vi.fn().mockReturnValue([
    {
        "id": 1,
        "name": "John",
        "surname": "John",
        "mail": "mail@gmail.com"
    },
    {
        "id": 2,
        "name": "Henri",
        "surname": "Poincaré",
        "mail": "henri.care@gmail.com"
    },
    {
        "id": 3,
        "name": "John",
        "surname": "Doe",
        "mail": "gmail@mail.com"
    },
    {
        "id": 4,
        "name": "Arnaud",
        "surname": "Peyrache",
        "mail": "peyrachearnaud@gmail.com"
    },
    {
        "id": 5,
        "name": "John",
        "surname": "John",
        "mail": "mail@gmail.com"
    },
    {
        "id": 6,
        "name": "Henri",
        "surname": "Poincaré",
        "mail": "henri.care@gmail.com"
    },
    {
        "id": 7,
        "name": "John",
        "surname": "Doe",
        "mail": "gmail@mail.com"
    },
    {
        "id": 8,
        "name": "John",
        "surname": "John",
        "mail": "mail@gmail.com"
    },
    {
        "id": 9,
        "name": "Henri",
        "surname": "Poincaré",
        "mail": "henri.care@gmail.com"
    },
    {
        "id": 10,
        "name": "John",
        "surname": "Doe",
        "mail": "gmail@mail.com"
    },
    {
        "id": 11,
        "name": "Sébastien",
        "surname": "Gamblin",
        "mail": "gamblin@gmail.com"
    }
    ])}
    await TestBed.configureTestingModule({
      imports: [UsersPage],
      providers: [
        provideRouter([], withComponentInputBinding()),
        { provide: WhatTimeApi, useValue: mockWhatTimeApi },
        { provide: MatDialog, useValue: matDialogMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get users', () => {
    expect(component.users().length).toBe(11);
  });

    it('should dialog return the good thing', () => {
    const result = ['password', 'mail', 'name', 'surname'];
    const dialogRefMock = {
    afterClosed: () => of(result)
    };
    matDialogMock.open = vi.fn().mockReturnValue(dialogRefMock);

    component.openDialog();

    expect(matDialogMock.open).toHaveBeenLastCalledWith(UsersDialog , {})
    });
  
//   it('should dialog', () => {
//     fixture.nativeElement.querySelector('#button-dialog').click();
//   })
});
