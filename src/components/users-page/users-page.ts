import { Component, inject, signal, OnInit, Signal, computed } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Layout } from "../layout/layout";
import { RouterOutlet } from "@angular/router";
import {  MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
// import { UserModule } from '../../models/user/user-module';
import { WhatTimeApi } from '../../services/what-time-api';
import { UserModel } from '../../models/user/user-module';
import { UserDetailsModel } from '../../models/user-details/user-details-module';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialog } from '../users-dialog/users-dialog';
import { EventDetailsModel } from '../../models/event-details/event-details-module';
import { TagModel } from '../../models/tag/tag-module';
import { LocalisationModel } from '../../models/localisation/localisation-module';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-users-page',
  imports: [MatCardModule, Layout, RouterOutlet, MatExpansionModule, MatDividerModule, MatListModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, MatButton, MatFormField, MatLabel, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './users-page.html',
  styleUrl: './users-page.scss',
})
export class UsersPage {
  events = signal<EventDetailsModel[]>([]);
  api = inject(WhatTimeApi);
  userDetails = signal<UserDetailsModel | null>(null);

  protected getEventName(eventId: number): string {
    const event = this.events().find(e => e.id === eventId);
    return event?.name || `Événement ${eventId}`;
  }

  protected getUsers(): UserModel[]{
    return this.api.getUsers();
  }
  protected getUserDetails(userId: number): void {
    this.api.getUserById(userId);
    // return this.api.getUserDetailsById(userId);
  }
  protected getUserSignal(): UserDetailsModel | null {
    return this.api.getUserById();
  }

  search = signal<string>("");
  users : Signal<UserModel[]> = computed(() => this.getUsers().filter(
      (line) => {
        return  line.name.trim().toLowerCase().replaceAll("  ", " ").includes(this.search()) || 
                line.surname.trim().toLowerCase().replaceAll("  ", " ").includes(this.search()) ||
                line.mail.trim().toLowerCase().replaceAll("  ", " ").includes(this.search()) || 
                line.id == parseInt(this.search());
      }
    )
  );

  protected loadingPage = signal<boolean>(true);
  protected loadingUser = signal<boolean>(true);
  protected dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(UsersDialog, {});
  }

  ngOnInit(){}

  protected onSubmit(form : any) : void{
    this.search.set(form.value["searchField"].trim().toLowerCase().replaceAll("  ", " "));
  }
}
