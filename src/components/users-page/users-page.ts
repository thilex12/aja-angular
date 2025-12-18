import { Component, inject, signal, OnInit, Signal, computed } from '@angular/core';
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
import { MatButton, MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialog } from '../users-dialog/users-dialog';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-users-page',
  imports: [MatCardModule, Layout, RouterOutlet, MatExpansionModule, MatDividerModule, MatListModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, MatButton, MatFormField, MatLabel, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './users-page.html',
  styleUrl: './users-page.scss',
})
export class UsersPage implements OnInit {
  // protected listTags = ['tag 1', 'tag 2', 'tag 3',]
  // users = signal<UserModule[]>([]);

  api = inject(WhatTimeApi);
  userDetails = signal<UserDetailsModel | null>(null);
  tags = signal(JSON.parse(localStorage.getItem('tags') || '[]'));

  search = signal<string>("");
  users : Signal<UserModel[]> = computed(() => this.api.users().filter(
      (line) => {
        return  line.name.trim().toLowerCase().replaceAll("  ", " ").includes(this.search()) || 
                line.surname.trim().toLowerCase().replaceAll("  ", " ").includes(this.search()) ||
                line.mail.trim().toLowerCase().replaceAll("  ", " ").includes(this.search()) || 
                line.id == parseInt(this.search());
      }
    )
  );


  getUserDetails(id: number) {
    this.api.getUserById(id).subscribe((response) => {
      this.userDetails.set(response);
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

      },
      error: (err) => {
        console.error("Erreur API:", err);
      }
    });
  }
  protected loading: boolean = true;
  protected dialog = inject(MatDialog);

  openDialog(): void {

    const dialogRef = this.dialog.open(UsersDialog, {});
  }

  protected onSubmit(form : any) : void{
    this.search.set(form.value["searchField"].trim().toLowerCase().replaceAll("  ", " "));
  }
}
