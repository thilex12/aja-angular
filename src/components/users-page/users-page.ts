import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Layout } from "../layout/layout";
import { RouterOutlet } from "@angular/router";
import {  MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialog } from '../users-dialog/users-dialog';


@Component({
  selector: 'app-users-page',
  imports: [MatCardModule, Layout, RouterOutlet, MatExpansionModule, MatDividerModule, MatListModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './users-page.html',
  styleUrl: './users-page.scss',
})
export class UsersPage {
  protected listTags = ['tag 1', 'tag 2', 'tag 3',]
  protected loading: boolean = true;
  protected dialog = inject(MatDialog);
  protected listUsers = [
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
    }
]

openDialog(): void {

  const dialogRef = this.dialog.open(UsersDialog, {});
}

ngOnInit() {
    this.loading = true;

    this.loading = false;
  }
}


