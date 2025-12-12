import { Component, inject, signal } from '@angular/core';
import { ApiCallService } from "../../services/api-call-service";
import { CookieService } from "../../services/cookie-service";
import { EventDetailsModel, Page } from '../../models/event-details/event-details-module';
import { tap } from 'rxjs';

@Component({
  selector: 'app-test-arnaud',
  imports: [],
  templateUrl: './test-arnaud.html',
  styleUrl: './test-arnaud.scss',
})
export class TestArnaud {
  protected api = inject(ApiCallService);
  protected cookies = inject(CookieService);
  protected events = signal<EventDetailsModel[]>([])

  

  protected test() {
    let cookies = this.cookies.get();
    let username = cookies.get("username");
    let pwd = cookies.get("password");
    this.api.get<Page<EventDetailsModel>>("/admin-events", username, pwd).subscribe(r=>{
      console.log(r.content);
      this.events.set(r.content);
      console.log(this.events()[0]);
    });
    this.api.get<Page<EventDetailsModel>>("/admin-events", username, pwd).subscribe(r=>{
      console.log(r.content);
      this.events.set(r.content);
      console.log(this.events()[0]);
    });
    
  }
}
