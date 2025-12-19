import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {FormsModule, NgForm} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { WhatTimeApi } from '../../services/what-time-api';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-event-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './event-dialog.html',
  styleUrl: './event-dialog.scss',
})
export class EventDialog {
  readonly dialogRef = inject(MatDialogRef<EventDialog>);
  protected nom: string = '';
  protected localisation: string = '';
  protected debut: string = '';
  protected fin: string = '';
  protected description: string = '';
  protected invite: string = '';
  protected api = inject(WhatTimeApi);

  createEvent(form: NgForm) {
    this.nom = form.value.name;
    this.localisation = form.value.localisation;
    this.debut = form.value.debut;
    this.fin = form.value.fin;
    this.invite = form.value.invite;
    this.description = form.value.description;
    this.dialogRef.close([this.nom, this.localisation, this.debut, this.invite, this.fin, this.description]);
}

  onCancelClick(): void {
    this.dialogRef.close('cancelled');
  }
}
