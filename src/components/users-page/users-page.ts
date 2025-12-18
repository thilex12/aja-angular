import { Component, inject, signal, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Layout } from "../layout/layout";
import { RouterOutlet } from "@angular/router";
import {  MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
// import { UserModule } from '../../models/user/user-module';
import { WhatTimeApi } from '../../services/what-time-api';
import { UserModel } from '../../models/user/user-module';
import { Page } from '../../models/page/page-module';
import { UserDetailsModel } from '../../models/user-details/user-details-module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialog } from '../users-dialog/users-dialog';
import { EventDetailsModel } from '../../models/event-details/event-details-module';
import { TagModel } from '../../models/tag/tag-module';
import { LocalisationModel } from '../../models/localisation/localisation-module';


@Component({
  selector: 'app-users-page',
  imports: [MatCardModule, Layout, RouterOutlet, MatExpansionModule, MatDividerModule, MatListModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './users-page.html',
  styleUrl: './users-page.scss',
})
export class UsersPage implements OnInit {
  // protected listTags = ['tag 1', 'tag 2', 'tag 3',]
  // users = signal<UserModule[]>([]);

  events = signal<EventDetailsModel[]>([]);
  api = inject(WhatTimeApi);
  // users = signal<UserModel[]>([]);
  userDetails = signal<UserDetailsModel | null>(null);
  tags = signal<TagModel[]>([]);
  locs = signal<LocalisationModel[]>([]);
  user = signal<UserModel | null>(null);


  getEventName(eventId: number): string {
    const event = this.events().find(e => e.id === eventId);
    return event?.name || `Événement ${eventId}`;
  }

  getUserDetails(userId: number): void {
    this.api.getUserById(userId);
    // return this.api.getUserDetailsById(userId);
  }
  getUserSignal(): UserDetailsModel | null {
    return this.api.getUserById();
  }
  

  ngOnInit() {
    this.events.set(this.api.getEvents());
    this.locs.set(this.api.getLoc());
    this.tags.set(this.api.getTags());
    // this.users.set(this.api.getUsers());
    // this.api.getUsers()
  }


  protected loading: boolean = true;
  protected dialog = inject(MatDialog);

  openDialog(): void {

    const dialogRef = this.dialog.open(UsersDialog, {});
  }

  protected getUsers(): UserModel[]{
    return this.api.getUsers();
  }

}
