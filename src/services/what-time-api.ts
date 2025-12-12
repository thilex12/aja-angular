import { inject, Injectable, Signal, signal } from '@angular/core';
import { ApiCallService } from "./api-call-service";
import { CookieService } from "./cookie-service";
import { EventDetailsModel, Page } from '../models/event-details/event-details-module';

@Injectable({
  providedIn: 'root',
})
export class WhatTimeApi {
  
  protected api = inject(ApiCallService);
  protected cookies = inject(CookieService);

  public events = signal<EventDetailsModel[]>([])

  public getEvents(){
    let cookies  = this.cookies.get();
    let username = cookies.get("username");
    let pwd = cookies.get("password");

    this.api.get<Page<EventDetailsModel>>("/admin-events", username, pwd).subscribe(r=>{
      this.events.set(r.content);
    });
  }
  public getMe(id : string, p : string){
    let cookies  = this.cookies.get();
    let username = id || cookies.get("username");
    let pwd = cookies.get("password");

    this.api.get<Page<EventDetailsModel>>("/admin-events", username, pwd).subscribe(r=>{
      this.events.set(r.content);
    });
  }
}
