import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {FormsModule, NgForm} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { WhatTimeApi } from '../../services/what-time-api';


@Component({
  selector: 'app-users-dialog',
  imports: [MatDialogModule, FormsModule, MatFormFieldModule],
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
  this.mail = form.value.email;
  this.password = form.value.password;
  this.api.getInfo(this.mail, this.password).subscribe((response) => {
    console.log(this.api.user()?.role);
  });
}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onCreateClick(): void {
    this.dialogRef.close();
  }
}
