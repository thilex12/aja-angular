import { Component, inject } from '@angular/core';
import { ApiCallService } from "../../services/api-call-service";

@Component({
  selector: 'app-test-arnaud',
  imports: [],
  templateUrl: './test-arnaud.html',
  styleUrl: './test-arnaud.scss',
})
export class TestArnaud {
  protected api = inject(ApiCallService);

  protected test(){
    console.log(this.api.get("/accountme", "test@gmail.com", "1234"));
  }
}
