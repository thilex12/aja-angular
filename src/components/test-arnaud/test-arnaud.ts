import { Component, OnInit, inject, signal } from '@angular/core';
import { WhatTimeApi } from '../../services/what-time-api';

@Component({
  selector: 'app-test-arnaud',
  imports: [],
  templateUrl: './test-arnaud.html',
  styleUrl: './test-arnaud.scss',
})
export class TestArnaud {
  protected api = inject(WhatTimeApi);

  // protected test() {
  //   this.api.getEvents().subscribe(r=>{
  //     console.log(this.api.events());
  //   })
    
  // }
}
