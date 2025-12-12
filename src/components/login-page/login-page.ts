import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WhatTimeApi } from '../../services/what-time-api';
import { CookieService } from '../../services/cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  imports: [FormsModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {

  api = inject(WhatTimeApi);
  cookieService = inject(CookieService);
  router = inject(Router);

  email: string = '';
  password: string = '';
  role: string | undefined = '' ;



  login(form: NgForm) {
    this.email = form.value.email;
    this.password = btoa(form.value.password);
    this.api.getInfo(this.email, this.password).subscribe((response) => {
      // console.log(this.api.user()?.role);
      // this.role = response.role;
      // console.log(response.role);
      this.role = this.api.user()?.role;

      if (this.role === 'ROLE_ADMIN') {
        // this.cookieService.set(
        //   // new Map<string, string>({'username': this.email, 'password': this.password})
        // );
        document.cookie = `email=${encodeURIComponent(this.email)}; max-age=3600`;
        document.cookie = `password=${encodeURIComponent(this.password)}; max-age=3600`;

        this.router.navigate(['/']);
      } else {
        // Il faut etre admin pour entrer sur le site
        alert("Vous devez être administrateur pour accéder à cette page.");
      }
    });


    // Implement login logic here

  }

}
