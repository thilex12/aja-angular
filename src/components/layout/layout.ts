import {Component, inject} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { authGuard } from '../../guards/auth-guard';
import { AuthService } from '../../services/auth-service';
@Component({
  selector: 'app-layout',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink, RouterLinkActive, MatDivider],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

  readonly router = inject(Router);
  readonly auth = inject(AuthService)

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
  authButton(): void {
    if (this.isLoggedIn()) {
      // Logout
      // console.log('Logging out...');
      // localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('username');
      localStorage.removeItem('tags');
      localStorage.removeItem('locations');
      this.router.navigate(['/login']);
    }
  }
}
