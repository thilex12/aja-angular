import { Component, inject, signal, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Layout } from "../layout/layout";
import { RouterOutlet } from "@angular/router";
import {  MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
// import { UserModule } from '../../models/user/user-module';
import { WhatTimeApi } from '../../services/what-time-api';
import { UserModel } from '../../models/user/user-module';
import { UserDetailsModel } from '../../models/user-details/user-details-module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialog } from '../users-dialog/users-dialog';


@Component({
  selector: 'app-users-page',
  imports: [MatCardModule, Layout, RouterOutlet, MatExpansionModule, MatDividerModule, MatListModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './users-page.html',
  styleUrl: './users-page.scss',
})
export class UsersPage implements OnInit {
  // protected listTags = ['tag 1', 'tag 2', 'tag 3',]
  // users = signal<UserModule[]>([]);

  api = inject(WhatTimeApi);
  users = signal<UserModel[]>([]);
  userDetails = signal<UserDetailsModel | null>(null);
  tags = signal(JSON.parse(localStorage.getItem('tags') || '[]'));
  protected loadingPage = signal<boolean>(true);
  protected loadingUser = signal<boolean>(true);
  protected dialog = inject(MatDialog);


  getUserDetails(id: number) {
    this.loadingUser.set(true);
    this.api.getUserById(id).subscribe((response) => {
      this.userDetails.set(response);
      this.loadingUser.set(false);
      // console.log(response);
    });
  }

  ngOnInit() {
    // console.log("ngOnInit appelé");
    // console.log("Username:", localStorage.getItem('username'));
    // console.log("Password:", localStorage.getItem('password'));
    
    this.api.getUsers().subscribe({
      next: (response) => {
        // console.log("Response complète:", response);
        // console.log("Response.content:", response);
        this.users.set(response);
        // console.log("Users() après set:", this.users());
        this.loadingPage.set(false);
      },
      error: (err) => {
        console.error("Erreur API:", err);
      }
    });
  }

  openDialog(): void {

    const dialogRef = this.dialog.open(UsersDialog, {});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
