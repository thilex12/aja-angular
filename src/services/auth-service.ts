import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private isAuthenticated = false;
  private isAuthenticated = signal(false);
  private username = signal<string | null>(null);
  private password = signal<string | null>(null);
  
  login(username: string, password: string): void {
    // this.username.set(username);
    this.username.set(username);
    this.password.set(password);

    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    this.isAuthenticated.set(true);
  }

  logout(): void {
    this.username.set(null);
    this.password.set(null);
    this.isAuthenticated.set(false);
  }

  isLoggedIn(): boolean {
    // return this.isAuthenticated();
    if (this.isAuthenticated()) {
      return true;
    } else {
      const storedUsername = localStorage.getItem('username');
      const storedPassword = localStorage.getItem('password');
      if (storedUsername != null && storedPassword != null) {
        this.username.set(storedUsername);
        this.password.set(storedPassword);
        this.isAuthenticated.set(true);
        return true;
      }
    }
    return false;
  }
}
