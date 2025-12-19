import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {FormsModule, NgForm} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { WhatTimeApi } from '../../services/what-time-api';
import { UserModel } from '../../models/user/user-module';


@Component({
  selector: 'app-users-dialog',
  imports: [MatDialogModule, FormsModule, MatFormFieldModule],
  templateUrl: './users-dialog.html',
  styleUrl: './users-dialog.scss',
})
export class UsersDialog {
  readonly dialogRef = inject(MatDialogRef<UsersDialog>);
  protected api = inject(WhatTimeApi);
  protected user : UserModel = {
    id: 0,
    name: '',
    surname: '',
    mail: '',
    pwd : ''
  };

  create(form: NgForm) {
    this.user.name = form.value.name;
    this.user.surname = form.value.surname;
    this.user.mail = form.value.mail;
    this.user.pwd = form.value.password;
    this.api.createUser(this.user);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onCreateClick(): void {
    this.dialogRef.close();
  }
}
