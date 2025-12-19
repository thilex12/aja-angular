import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {FormsModule, NgForm} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { WhatTimeApi } from '../../services/what-time-api';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-tags-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './tags-dialog.html',
  styleUrl: './tags-dialog.scss',
})
export class TagsDialog {
  readonly dialogRef = inject(MatDialogRef<TagsDialog>);
  protected tag: string = '';
  protected api = inject(WhatTimeApi);

  createTag(form: NgForm) {
    this.tag = form.value.tag;
    this.dialogRef.close([this.tag]);
}

  onCancelClick(): void {
    this.dialogRef.close('cancelled');
  }
}
