import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {FormsModule, NgForm} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { WhatTimeApi } from '../../services/what-time-api';
import { MatButtonModule } from '@angular/material/button';
import { TagModel } from '../../models/tag/tag-module';



@Component({
  selector: 'app-tags-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './tags-dialog.html',
  styleUrl: './tags-dialog.scss',
})
export class TagsDialog {
  readonly dialogRef = inject(MatDialogRef<TagsDialog>);
  protected tag : TagModel = {
    id: 0,
    name: ''
  };
  protected api = inject(WhatTimeApi);

  createTag(form: NgForm) {
    this.tag.name = form.value.tag;
    this.api.createTag(this.tag); // Besoin de recharger la page pour voir la mise à jour
    this.dialogRef.close('created');
    alert("Rechargez la page pour actualiser les tags")
}

  onCancelClick(): void {
    this.dialogRef.close('cancelled');
  }
}
