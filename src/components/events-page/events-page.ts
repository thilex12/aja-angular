import { Component, computed, inject, Signal, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Layout } from "../layout/layout";
import { RouterOutlet } from "@angular/router";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { WhatTimeApi } from '../../services/what-time-api';
import { EventDetailsModel } from '../../models/event-details/event-details-module';
import { Page } from '../../models/page/page-module';
// import { pipe } from 'rxjs';
import { DatePipe } from '@angular/common';
import { LocalisationModel } from '../../models/localisation/localisation-module';
import { TagModel } from '../../models/tag/tag-module';
import { MatFormField, MatInputModule, MatLabel } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { UpdateEvent } from '../update-event/update-event';
import { EventDialog } from '../event-dialog/event-dialog';

@Component({
  selector: 'app-events-page',
  imports: [Layout, MatCardModule, RouterOutlet, MatExpansionModule, MatButtonModule, MatDividerModule, MatListModule, MatIconModule, MatButton, MatPaginatorModule, DatePipe, MatFormField, MatLabel, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './events-page.html',
  styleUrl: './events-page.scss',
})
export class EventsPage {
  api = inject(WhatTimeApi);

  protected dialog = inject(MatDialog);
  protected search = signal("");
  protected allEvents = signal<EventDetailsModel[]>([]);
  protected pageSize = signal(10);
  protected pageIndex = signal(0);
  protected totalElements = signal(0);
  protected totalPages = signal(0);
  
  // Computed signals pour tags et locs
  protected tags = computed(() => this.api.getTags());
  protected locs = computed(() => this.api.getLocs());

  getTagById(tagId: number): TagModel | undefined {
    return this.tags().find(tag => tag.id === tagId);
  }
  getLocById(locId: number): LocalisationModel | undefined {
    return this.locs().find(loc => loc.id === locId);
  }

  ngOnInit() {
    this.loadEvents(0, this.pageSize());
    // Déclencher le chargement des tags et locs
    this.api.getTags();
    this.api.getLocs();
  }
  loadEvents(page: number, size: number) {
    this.api.getEventsPaginated(page, size, 'startDate,desc').subscribe((pageData: Page<EventDetailsModel>) => {
      this.allEvents.set(pageData.content);
      this.totalElements.set(pageData.totalElements);
      this.totalPages.set(pageData.totalPages);
      this.pageIndex.set(pageData.number);
    });
  }

  onPageChange(event: PageEvent) {
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex);
    this.loadEvents(event.pageIndex, event.pageSize);
  } 

  protected events = computed(() => this.allEvents().filter(
      (line) => {
        return  line.name.trim().toLowerCase().replaceAll("  ", " ").includes(this.search()) || 
                line.description.trim().toLowerCase().replaceAll("  ", " ").includes(this.search()) || 
                line.id == parseInt(this.search());
      }
    )
  );

  protected onSubmit(form : any) : void{
    this.search.set(form.value["searchField"].trim().toLowerCase().replaceAll("  ", " "));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EventDialog, {});
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
    });
  }

  openUpdateDialog(event: EventDetailsModel): void {
    const dialogRef = this.dialog.open(UpdateEvent, {
      data: event,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result: EventDetailsModel | null) => {
      if (result) {
        // Rafraîchir la liste des événements après modification
        this.loadEvents(this.pageIndex(), this.pageSize());
      }
    });
  }
}
