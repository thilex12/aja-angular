import {Component} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-layout',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

  isLoggedIn(): boolean {
    return localStorage.getItem('email') !== null && localStorage.getItem('password') !== null;
  }
  authButton(): void {
    if (this.isLoggedIn()) {
      // Logout
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    }
  }
}
