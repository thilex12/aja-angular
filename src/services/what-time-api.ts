import { inject, Injectable, Signal, signal } from '@angular/core';
import { ApiCallService } from "./api-call-service";
import { Page } from '../models/page/page-module';
import { EventDetailsModel } from '../models/event-details/event-details-module';
import { UserDetailsModel } from '../models/user-details/user-details-module';
import { Observable, tap } from 'rxjs';
import { TagModel } from '../models/tag/tag-module';
import { LocalisationModel } from '../models/localisation/localisation-module';
import { UserModel } from '../models/user/user-module';

@Injectable({
  providedIn: 'root',
})
export class WhatTimeApi {
  
  protected api = inject(ApiCallService);

  public events = signal<EventDetailsModel[]>([])
  public adminUser = signal<UserDetailsModel | null>(null);
  public user = signal<UserDetailsModel | null>(null);
  public users = signal<UserModel[]>([]);
  public tags = signal<TagModel[]>([]);

  public getEvents() : Observable<Page<EventDetailsModel>> {
    let username = localStorage.getItem("username");
    let pwd = localStorage.getItem("password");
    
    return this.api.get<Page<EventDetailsModel>>("/admin-events", username, pwd).pipe(tap((r) => {
      this.events.set(r.content);
    }));
  }
  
  public getEventById(id: number) : Observable<EventDetailsModel> {
    let username = localStorage.getItem("username");
    let pwd = localStorage.getItem("password");
    return this.api.get<EventDetailsModel>("/events/" + id, username, pwd).pipe(tap((r) => {
      // this.events.set(r);
    }));
  }

  public getUsers() : Observable<Page<UserModel>>{
    let username = localStorage.getItem("username");
    let pwd = localStorage.getItem("password");

    return this.api.get<Page<UserModel>>("/admin-accounts", username, pwd).pipe(tap((r) => {
      this.users.set(r.content);
    }));
  }

  public getUserById(id: number) : Observable<UserDetailsModel> {
    let username = localStorage.getItem("username");
    let pwd = localStorage.getItem("password");
    return this.api.get<UserDetailsModel>("/admin-accounts/" + id, username, pwd).pipe(tap((r) => {
      this.user.set(r);
    }));
  }

  public getInfo(id: string, p: string): Observable<UserDetailsModel> {
    let username = id || localStorage.getItem("username");
    let pwd = p || localStorage.getItem("password");

    return this.api.get<UserDetailsModel>("/accounts/me", username, pwd).pipe(tap((r) => {
      this.adminUser.set(r);
    }));
  }

  public getTags(): Observable<Array<TagModel>> {
    let username = localStorage.getItem("username");
    let pwd = localStorage.getItem("password");

    return this.api.get<Array<TagModel>>("/tags", username, pwd).pipe(tap((r) => {
      this.tags.set(r);
      localStorage.setItem('tags', JSON.stringify(r));
      // console.log(localStorage.getItem('tags'));
    }));
  }

  public getLoc(): Observable<Array<LocalisationModel>> {
    let username = localStorage.getItem("username");
    let pwd = localStorage.getItem("password");
    return this.api.get<Array<LocalisationModel>>("/locations", username, pwd).pipe(tap((r) => {
      // this.tags.set(r);
      localStorage.setItem('locations', JSON.stringify(r));
      // console.log(localStorage.getItem('tags'));
    }));
  }




  // Ajout

  public createTag(name: string, description: string): Observable<TagModel> {
    let username = localStorage.getItem("username");
    let pwd = localStorage.getItem("password");
    return this.api.post<TagModel>("/tags", username, pwd, { name, description }).pipe(tap((r) => {
      this.getTags().subscribe();
    }));
  }
}



