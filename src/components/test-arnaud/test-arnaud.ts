import { Component, OnInit, inject, signal } from '@angular/core';
import { WhatTimeApi } from '../../services/what-time-api';

@Component({
  selector: 'app-test-arnaud',
  imports: [],
  templateUrl: './test-arnaud.html',
  styleUrl: './test-arnaud.scss',
})
export class TestArnaud implements OnInit{
  protected api = inject(WhatTimeApi);

  ngOnInit() {
    this.api.getEvents();
  }
  protected test() {
    console.log(this.api.events());
  }
}
