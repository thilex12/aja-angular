import { inject, Injectable, Signal, signal } from '@angular/core';
import { ApiCallService } from "./api-call-service";
import { Page } from '../models/page/page-module';
import { EventDetailsModel } from '../models/event-details/event-details-module';
import { UpdateEventModel } from '../models/update-event/update-event';
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
  protected eventsPage = signal<Page<EventDetailsModel> | null>(null);
  protected event = signal<EventDetailsModel | null>(null);
  protected adminUser = signal<UserDetailsModel | null>(null);
  protected user = signal<UserDetailsModel | null>(null);
  protected users = signal<UserModel[]>([]);
  protected tags = signal<TagModel[]>([]);
  protected locs = signal<LocalisationModel[]>([]);

  protected url = environment.url;

  // prote


  // Méthode simple qui retourne tous les événements (compatible avec le code existant)
  public getEvents() : EventDetailsModel[] {
    if (this.events().length === 0) {
      this.http.get<Page<EventDetailsModel>>(this.url + '/admin-events').subscribe((response) => {
        this.events.set(response.content);
        this.eventsPage.set(response);
      });
    }
    return this.events();
  }

  // Nouvelle méthode pour gérer la pagination
  public getEventsPaginated(page: number = 0, size: number = 20, sort: string = ''): Observable<Page<EventDetailsModel>> {
    let params = `?page=${page}&size=${size}`;
    if (sort) {
      params += `&sort=${sort}`;
    }
    return this.http.get<Page<EventDetailsModel>>(this.url + '/admin-events' + params).pipe(
      tap((response) => {
        this.eventsPage.set(response);
        // Optionnel : mettre à jour la liste complète si page 0
        if (page === 0) {
          this.events.set(response.content);
        }
      })
    );
  }

  // Obtenir les informations de pagination
  public getEventsPageInfo(): Page<EventDetailsModel> | null {
    return this.eventsPage();
  }

  public getEventById(id: number): EventDetailsModel {
    this.http.get<EventDetailsModel>(this.url + '/events/' + id).subscribe((response) => {
      this.event.set(response);
    });
    return this.event() as EventDetailsModel; // Due to | null
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
    return this.user() as UserDetailsModel; // Due to | null
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
    // console.log(this.tags());
    if (this.tags().length === 0) {
      this.http.get<Array<TagModel>>(this.url + '/tags').subscribe((response) => {
        this.tags.set(response);
        console.log("HERE");
      });
    }
    return this.tags();
  }

  public getLocs(): LocalisationModel[] {
    if (this.locs().length === 0) {
      this.http.get<Array<LocalisationModel>>(this.url + '/locations').subscribe((response) => {
        this.locs.set(response);
      });
    }
    return this.locs();
  }

  
  // Ajout
  /*
  public createTag(name: string, description: string): undefined {
    let newTag = {  name };
    // addedTag:TagModel(null);
    this.http.post<TagModel>(this.url + '/tags', newTag).subscribe((response) => {
      this.getTags();
      return response as TagModel;
    });
  }*/

  public updateEvent(eventId: number, event: UpdateEventModel): void {
    this.http.put<EventDetailsModel>(this.url + `/admin-events/${eventId}`, event).subscribe((response) => {
      // Mettre à jour le signal des événements après la modification
      const updatedEvents = this.events().map(e => e.id === response.id ? response : e);
      this.events.set(updatedEvents);
    });
  }

  public updateTag(tag : TagModel) : TagModel{
    this.http.put<EventDetailsModel>(this.url + `/tags/${tag.id}`, tag).subscribe((response) => {
      // Mettre à jour le signal des tags après la modification
      const updatedTags = this.tags().map(t => t.id === response.id ? response : t);
      this.tags.set(updatedTags);
    });
    return tag;
  }

  public updateLocs(loc : LocalisationModel) : LocalisationModel{
    this.http.put<LocalisationModel>(this.url + `/locations/${loc.id}`, loc).subscribe((response) => {
      // Mettre à jour le signal des locations après la modification
      const updatedLocations = this.locs().map(l => l.id === response.id ? response : l);
      this.locs.set(updatedLocations);
    });
    return loc;
  }

  public createUser(user : UserModel) : UserModel {
    this.http.post<UserModel>(this.url + "/accounts", user).subscribe((response)=>{
      // Mettre à jour le signal des users après l'ajout
      const updatedAccounts = this.users();
      updatedAccounts.push(response)
      this.users.set(updatedAccounts);
    });
    return user;
  }

  public createTag(tag : TagModel) : TagModel {
    this.http.post<TagModel>(this.url + "/tags", tag).subscribe((response)=>{
      // Mettre à jour le signal des tags après l'ajout
      const updatedTags = this.tags();
      updatedTags.push(response)
      this.tags.set(updatedTags);
    });
    return tag;
  }

  public createLoc(loc : LocalisationModel) : LocalisationModel {
    this.http.post<LocalisationModel>(this.url + "/locations", loc).subscribe((response)=>{
      // Mettre à jour le signal des locations après l'ajout
      const updatedLocations = this.locs();
      updatedLocations.push(response)
      this.locs.set(updatedLocations);
    });
    return loc;
  }

  public createEvent(event : EventDetailsModel) : EventDetailsModel {
    this.http.post<EventDetailsModel>(this.url + "/events", event).subscribe((response)=>{
      // Mettre à jour le signal des users après l'ajout
      const updatedEvents = this.events();
      updatedEvents.push(response)
      this.events.set(updatedEvents);
    });
    return event;
  }

}



