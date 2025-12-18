import { inject, Injectable, Signal, signal } from '@angular/core';
import { ApiCallService } from "./api-call-service";
import { Page } from '../models/page/page-module';
import { EventDetailsModel } from '../models/event-details/event-details-module';
import { UserDetailsModel } from '../models/user-details/user-details-module';
import { Observable, of, tap } from 'rxjs';
import { TagModel } from '../models/tag/tag-module';
import { LocalisationModel } from '../models/localisation/localisation-module';
import { UserModel } from '../models/user/user-module';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WhatTimeApi {
  
  // protected api = inject(ApiCallService);
  protected http = inject(HttpClient);

  protected events = signal<EventDetailsModel[]>([])
  protected event = signal<EventDetailsModel | null>(null);
  protected adminUser = signal<UserDetailsModel | null>(null);
  protected user = signal<UserDetailsModel | null>(null);
  protected users = signal<UserModel[]>([]);
  protected tags = signal<TagModel[]>([]);
  protected locs = signal<LocalisationModel[]>([]);

  protected url = environment.url;

  // prote


  // public getEvents() : Observable<Page<EventDetailsModel>> {
  public getEvents() : EventDetailsModel[] {

    if (this.events().length === 0) {
      this.http.get<Page<EventDetailsModel>>(this.url + '/admin-events').subscribe((response) => {
      this.events.set(response.content);
    });
    }
    return this.events();
  }

  public getEventById(id: number): EventDetailsModel {
    this.http.get<EventDetailsModel>(this.url + '/events/' + id).subscribe((response) => {
      this.event.set(response);
    });
    return this.event() as EventDetailsModel;
  }
  
  // public getEventById(id: number) : Observable<EventDetailsModel> {
  //   let username = localStorage.getItem("username");
  //   let pwd = localStorage.getItem("password");
  //   return this.api.get<EventDetailsModel>("/events/" + id, username, pwd).pipe(tap((r) => {
  //     this.event.set(r);
  //   }));
  // }

  public getUsers() : UserModel[]{
    if (this.users().length == 0) {
      this.http.get<Array<UserModel>>(this.url + '/admin-accounts').subscribe((response) => {
        this.users.set(response);
      });
    }
    return this.users();
  }

  public getUserById(id: number = NaN) : UserDetailsModel {
    if (!isNaN(id)){
      this.http.get<UserDetailsModel>(this.url + `/admin-accounts/${id}`).subscribe((r) => {
        this.user.set(r);
      });
    }
    return this.user() as UserDetailsModel;
  }

  public getInfo(id: string, p: string): Observable<UserDetailsModel> {
    let username = id || localStorage.getItem("username");
    let pwd = p || localStorage.getItem("password");

    return this.http.get<UserDetailsModel>(this.url + '/accounts/me').pipe(tap((r) => {
      this.adminUser.set(r);
    }));
    // return this.api.get<UserDetailsModel>("/accounts/me", username, pwd).pipe(tap((r) => {
    //   this.adminUser.set(r);
    // }));
  }
  // public getInfo(id: string, p: string): UserDetailsModel {
  //   let username = id || localStorage.getItem("username");
  //   let pwd = p || localStorage.getItem("password");
  //   this.http.get<UserDetailsModel>(this.url + '/accounts/me').subscribe((response) => {
  //     this.adminUser.set(response);
  //   });
  //   return this.adminUser() as UserDetailsModel;
  // }

  public getTags(): TagModel[] {
    if (this.tags().length === 0) {
      this.http.get<Array<TagModel>>(this.url + '/tags').subscribe((response) => {
        this.tags.set(response);
      });
    }
    return this.tags();
  }

  public getLoc(): LocalisationModel[] {
    if (this.locs().length === 0) {
      this.http.get<Array<LocalisationModel>>(this.url + '/locations').subscribe((response) => {
        this.locs.set(response);
      });
    }
    return this.locs();
  }

  // Ajout
  public createTag(name: string, description: string): undefined {
    let newTag = {  name };
    // addedTag:TagModel(null);
    this.http.post<TagModel>(this.url + '/tags', newTag).subscribe((response) => {
      this.getTags();
      return response as TagModel;
    });
  }



}



