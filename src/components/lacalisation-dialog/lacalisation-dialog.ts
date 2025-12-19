import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {FormsModule, NgForm} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { WhatTimeApi } from '../../services/what-time-api';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-lacalisation-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './lacalisation-dialog.html',
  styleUrl: './lacalisation-dialog.scss',
})
export class LacalisationDialog {
  readonly dialogRef = inject(MatDialogRef<LacalisationDialog>);
  protected nom: string = '';
  protected adresse: string = '';
  protected lat_long: string = '';
  protected description: string = '';
  protected api = inject(WhatTimeApi);

  createLocalisation(form: NgForm) {
    this.nom = form.value.name;
    this.adresse = form.value.adress;
    this.lat_long = form.value.lat_long;
    this.description = form.value.description;
    this.dialogRef.close([this.nom, this.adresse, this.lat_long, this.description]);
}

  onCancelClick(): void {
    this.dialogRef.close('cancelled');
  }
}
