import { Component, inject, signal, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Layout } from "../layout/layout";
import { RouterOutlet } from "@angular/router";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
// import { UserModule } from '../../models/user/user-module';
import { WhatTimeApi } from '../../services/what-time-api';
import { UserModel } from '../../models/user/user-module';
import { Page } from '../../models/page/page-module';
import { UserDetailsModel } from '../../models/user-details/user-details-module';


@Component({
  selector: 'app-users-page',
  imports: [MatCardModule, Layout, RouterOutlet, MatExpansionModule, MatDividerModule, MatListModule],
  templateUrl: './users-page.html',
  styleUrl: './users-page.scss',
})
export class UsersPage implements OnInit {
  // protected listTags = ['tag 1', 'tag 2', 'tag 3',]
  // users = signal<UserModule[]>([]);

  protected api = inject(WhatTimeApi);
  protected users = signal<UserModel[]>([]);
  protected userDetails = signal<UserDetailsModel | null>(null);
  protected tags = signal(JSON.parse(localStorage.getItem('tags') || '[]'));


  getUserDetails(id: number) {
    this.api.getUserById(id).subscribe((response) => {
      this.userDetails.set(response);
      console.log(response);
    });
  }

  ngOnInit() {
    console.log("ngOnInit appelé");
    console.log("Username:", localStorage.getItem('username'));
    console.log("Password:", localStorage.getItem('password'));
    
    this.api.getUsers().subscribe({
      next: (response) => {
        console.log("Response complète:", response);
        console.log("Response.content:", response.content);
        this.users.set(response.content);
        console.log("Users() après set:", this.users());
      },
      error: (err) => {
        console.error("Erreur API:", err);
      }
    });
  }
}
