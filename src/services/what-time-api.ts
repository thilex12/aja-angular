import { inject, Injectable, Signal, signal } from '@angular/core';
import { ApiCallService } from "./api-call-service";
import { CookieService } from "./cookie-service";
import { Page } from '../models/page/page-module';
import { EventDetailsModel } from '../models/event-details/event-details-module';

@Injectable({
  providedIn: 'root',
})
export class WhatTimeApi {
  
  protected api = inject(ApiCallService);
  protected cookies = inject(CookieService);

  public events = signal<EventDetailsModel[]>([]);

  public getEvents(){
    let cookies  = this.cookies.get();
    let username = cookies.get("username");
    let pwd = cookies.get("password");

    this.api.get<Page<EventDetailsModel>>("/admin-events", username, pwd).subscribe(r=>{
      this.events.set(r.content);
    });
  }
  public getUsers(){
    let cookies  = this.cookies.get();
    let username = cookies.get("username");
    let pwd = cookies.get("password");

    this.api.get<Page<EventDetailsModel>>("/admin-accounts", username, pwd).subscribe(r=>{
      this.events.set(r.content);
    });
  }
}
