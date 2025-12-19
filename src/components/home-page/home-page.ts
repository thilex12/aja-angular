import { Component, computed, inject, signal } from '@angular/core';
import { Layout } from "../layout/layout";
import { RouterOutlet } from '@angular/router';
import { MatCardHeader, MatCardTitle, MatCardContent, MatCard } from "@angular/material/card";
import { WhatTimeApi } from '../../services/what-time-api';
import { EventDetailsModel } from '../../models/event-details/event-details-module';
import { UserDetailsModel } from '../../models/user-details/user-details-module';
import { UserModel } from '../../models/user/user-module';
import { Page } from '../../models/page/page-module';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home-page',
  imports: [Layout, RouterOutlet, MatCardHeader, MatCardTitle, MatCardContent, MatCard],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  api = inject(WhatTimeApi);

  tags = this.api.getTags();
  locs = this.api.getLocs();

  protected search = signal(""); 
  protected events = signal<EventDetailsModel[]>([]);
  protected users = computed(()=>this.api.getUsers());

  ngOnInit() {
    this.loadEvents(0, 1000); // À éviter sur de lourdes bases de données oui, on utilise ceci ici pour éviter de créer une nouvelle route dans le temps imparti
  }

  loadEvents(page: number, size: number) {
    this.api.getEventsPaginated(page, size, 'startDate,desc').subscribe((pageData: Page<EventDetailsModel>) => {
      this.events.set(pageData.content);
    });
  }

  protected nbEvents = computed(() => this.api.getEventsPageInfo()?.totalElements);

  protected meanNbInscriptionsOnEvents = computed(() => {
    let elmts = this.events();
    let total = 0;
    elmts.forEach((elmt)=>{
      total += elmt.inscriptions.length;
    });

    return Math.round(total/this.nbEvents()!*100)/100; // 2 décimales après la virgule
  });


}
