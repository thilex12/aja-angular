import { Component, computed, inject, signal } from '@angular/core';
import { Layout } from "../layout/layout";
import { RouterOutlet } from '@angular/router';
import { MatCardHeader, MatCardTitle, MatCardContent, MatCard } from "@angular/material/card";
import { WhatTimeApi } from '../../services/what-time-api';
import { EventDetailsModel } from '../../models/event-details/event-details-module';

@Component({
  selector: 'app-home-page',
  imports: [Layout, RouterOutlet, MatCardHeader, MatCardTitle, MatCardContent, MatCard],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  api = inject(WhatTimeApi);
  tags = signal(JSON.parse(localStorage.getItem('tags') || '[]'));
  locs = signal(JSON.parse(localStorage.getItem('locations') || '[]'));

  protected search = signal(""); 
  protected events = computed(()=>this.api.events());
  protected users = computed(()=>this.api.users());

  ngOnInit() {
    this.api.getUsers().subscribe((response) => {});
    this.api.getEvents().subscribe((response) => {console.log(this.api.events())});
  }
}
