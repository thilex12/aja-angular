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
import { DatePipe } from '@angular/common';
import { WhatTimeApi } from '../../services/what-time-api';
import { EventDetailsModel } from '../../models/event-details/event-details-module';
import { UpdateEventModel } from '../../models/update-event/update-event';
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
  readonly datePipe = new DatePipe('en-US');

  // Form fields
  name = signal(this.data.name);
  description = signal(this.data.description);
  startDate = signal(new Date(this.data.startDate));
  endDate = signal(new Date(this.data.endDate));
  location = signal(this.data.location);
  visibility = signal(this.data.visibility);
  selectedTags = signal<number[]>([...this.data.tags]);
  archived = signal(this.data.archived);

  // Charger les données une seule fois
  tags = signal<TagModel[]>(this.api.getTags());
  locs = signal<LocalisationModel[]>(this.api.getLocs());

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

  onCancelClick(): void {
    this.dialogRef.close(null);
  }

  onUpdateClick(form: NgForm): void {
    if (form.valid) {
      const updatedEvent: UpdateEventModel = {
        name: form.value.name,
        description: form.value.description,
        startDate: this.datePipe.transform(form.value.startDate, 'yyyy-MM-ddTHH:mm:ss') as any,
        endDate: this.datePipe.transform(form.value.endDate, 'yyyy-MM-ddTHH:mm:ss') as any,
        locationId: form.value.location,
        visibility: form.value.visibility,
        tags: form.value.selectedTags || []
      };

      console.log('Données envoyées au backend:', updatedEvent);
      this.api.updateEvent(this.data.id, updatedEvent);
      this.dialogRef.close(updatedEvent);
    }
  }
}
