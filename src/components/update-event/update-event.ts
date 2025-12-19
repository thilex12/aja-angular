import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { WhatTimeApi } from '../../services/what-time-api';
import { EventDetailsModel } from '../../models/event-details/event-details-module';
import { TagModel } from '../../models/tag/tag-module';
import { LocalisationModel } from '../../models/localisation/localisation-module';

@Component({
  selector: 'app-update-event',
  imports: [
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  templateUrl: './update-event.html',
  styleUrl: './update-event.scss',
})
export class UpdateEvent {
  readonly dialogRef = inject(MatDialogRef<UpdateEvent>);
  readonly data = inject<EventDetailsModel>(MAT_DIALOG_DATA);
  readonly api = inject(WhatTimeApi);

  // Form fields
  name = signal(this.data.name);
  description = signal(this.data.description);
  startDate = signal(new Date(this.data.startDate));
  endDate = signal(new Date(this.data.endDate));
  location = signal(this.data.location);
  visibility = signal(this.data.visibility);
  selectedTags = signal<number[]>([...this.data.tags]);
  archived = signal(this.data.archived);

  // Data for selects

  
  // tags = signal<TagModel[]>(JSON.parse(localStorage.getItem('tags') || '[]'));
  // locs = signal<LocalisationModel[]>(JSON.parse(localStorage.getItem('locations') || '[]'));

  onCancelClick(): void {
    this.dialogRef.close(null);
  }

  onUpdateClick(form: NgForm): void {
    if (form.valid) {
      const updatedEvent: EventDetailsModel = {
        ...this.data,
        name: form.value.name,
        description: form.value.description,
        startDate: form.value.startDate,
        endDate: form.value.endDate,
        location: form.value.location,
        visibility: form.value.visibility,
        tags: form.value.selectedTags || [],
        archived: form.value.archived
      };

      this.api.updateEvent(updatedEvent);
      this.dialogRef.close(updatedEvent);
    }
  }
}
