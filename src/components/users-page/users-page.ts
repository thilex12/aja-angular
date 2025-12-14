import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Layout } from "../layout/layout";
import { RouterOutlet } from "@angular/router";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
// import { UserModule } from '../../models/user/user-module';
import { WhatTimeApi } from '../../services/what-time-api';


@Component({
  selector: 'app-users-page',
  imports: [MatCardModule, Layout, RouterOutlet, MatExpansionModule, MatDividerModule, MatListModule],
  templateUrl: './users-page.html',
  styleUrl: './users-page.scss',
})
export class UsersPage {
  // protected listTags = ['tag 1', 'tag 2', 'tag 3',]
  // users = signal<UserModule[]>([]);

  api = inject(WhatTimeApi);

  ngOnInit() {
    this.api.getUsers().subscribe((response) => {
      // this.users.set(response);
    });
    // const usersString = localStorage.getItem('users');
    // if (usersString) {
    //   this.users.set(JSON.parse(usersString));
    // }
  }
}
