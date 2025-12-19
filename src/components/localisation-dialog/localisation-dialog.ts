import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {FormsModule, NgForm} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { WhatTimeApi } from '../../services/what-time-api';
import { MatButtonModule } from '@angular/material/button';
import { LocalisationModel } from '../../models/localisation/localisation-module';

@Component({
  selector: 'app-lacalisation-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './localisation-dialog.html',
  styleUrl: './localisation-dialog.scss',
})
export class LacalisationDialog {
  readonly dialogRef = inject(MatDialogRef<LacalisationDialog>);
  protected api = inject(WhatTimeApi);
  protected loc : LocalisationModel = {
    id: 0,
    name: '',
    address: '',
    latitude: 0,
    longitude: 0,
    description: ''
  };

  createLocalisation(form: NgForm) {
    this.loc.name = form.value.name;
    this.loc.address = form.value.adress;
    this.loc.latitude = form.value.lat;
    this.loc.longitude = form.value.long;
    this.loc.description = form.value.description;
    this.api.createLoc(this.loc); // Besoin de recharger la page pour voir la mise à jour
    this.dialogRef.close('created');
    alert("Rechargez la page pour actualiser les localisations")
}

  onCancelClick(): void {
    this.dialogRef.close('cancelled');
  }
}
