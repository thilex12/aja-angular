import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Layout } from "../layout/layout";
import { RouterOutlet } from "@angular/router";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { WhatTimeApi } from '../../services/what-time-api';
import { EventDetailsModel } from '../../models/event-details/event-details-module';
import { Page } from '../../models/page/page-module';
// import { pipe } from 'rxjs';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-events-page',
  imports: [Layout, MatCardModule, RouterOutlet, MatExpansionModule, MatDividerModule, MatListModule, DatePipe],
  templateUrl: './events-page.html',
  styleUrl: './events-page.scss',
})
export class EventsPage {
  api = inject(WhatTimeApi);
  
  events = signal<EventDetailsModel[]>([]);

  tags = signal(JSON.parse(localStorage.getItem('tags') || '[]'));

  locs = signal(JSON.parse(localStorage.getItem('locations') || '[]'));

  ngOnInit() {
    this.api.getEvents().subscribe((response) => {
      this.events.set(response.content);
      console.log(this.events());
    });
  }

}
