import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WhatTimeApi } from '../../services/what-time-api';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user/user-module';
import { UserDetailsModel } from '../../models/user-details/user-details-module';


@Component({
  selector: 'app-login-page',
  imports: [FormsModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {

  api = inject(WhatTimeApi);
  router = inject(Router);

  email: string = '';
  password: string = '';
  role: string | undefined = '';

  userInfo: UserDetailsModel | null = null;


  login(form: NgForm) {
    this.email = form.value.email;
    this.password = btoa(form.value.password); // <= Encodage du password *
    localStorage.setItem('username', this.email);
    localStorage.setItem('password', this.password);

    this.api.getInfo(this.email, this.password).subscribe((response) => {
      // this.role = this.api.adminUser()?.role;
      this.role = response.role;
      console.log("Role de l'utilisateur :", this.role);  

      if (this.role === 'ROLE_ADMIN') {
        
        //this.api.getTags();
        //this.api.getLocs();
        this.router.navigate(['/']);
      } else {
        // Il faut etre admin pour entrer sur le site
        alert("Vous devez être administrateur pour accéder à cette page.");
      }
    });


    // Implement login logic here

  }
}
