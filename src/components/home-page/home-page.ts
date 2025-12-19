import { Component, computed, inject, signal } from '@angular/core';
import { Layout } from "../layout/layout";
import { RouterOutlet } from '@angular/router';
import { MatCardHeader, MatCardTitle, MatCardContent, MatCard } from "@angular/material/card";
import { WhatTimeApi } from '../../services/what-time-api';
import { EventDetailsModel } from '../../models/event-details/event-details-module';
import { UserDetailsModel } from '../../models/user-details/user-details-module';
import { UserModel } from '../../models/user/user-module';

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
  protected events = computed(()=>this.api.getEvents());
  protected users = computed(()=>this.api.getUsers());

  /*ngOnInit() {
    this._events.set(this.api.getEvents());
    this._users.set(this.api.getUsers());
  }*/
}
