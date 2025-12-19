import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {FormsModule, NgForm} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { WhatTimeApi } from '../../services/what-time-api';


@Component({
  selector: 'app-users-dialog',
  imports: [MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './users-dialog.html',
  styleUrl: './users-dialog.scss',
})
export class UsersDialog {
  readonly dialogRef = inject(MatDialogRef<UsersDialog>);
  protected mail: string = '';
  protected password: string = '';
  protected name: string = '';
  protected surname: string = '';
  protected api = inject(WhatTimeApi);

  create(form: NgForm) {
    this.password = btoa(form.value.password);
    this.mail = form.value.mail;
    this.name = form.value.name;
    this.surname = form.value.surname;
    this.dialogRef.close([this.password, this.mail, this.name, this.surname]);
}

  onCancelClick(): void {
    this.dialogRef.close('cancelled');
  }
}
