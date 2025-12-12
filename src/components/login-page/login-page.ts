import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WhatTimeApi } from '../../services/what-time-api';


@Component({
  selector: 'app-login-page',
  imports: [FormsModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {

  api = inject(WhatTimeApi);

  email: string = '';
  password: string = '';



  login(form: NgForm) {
    this.email = form.value.email;
    this.password = form.value.password;
    this.api.getInfo(this.email, this.password).subscribe((response) => {
      console.log(this.api.user()?.role);
    });


    // Implement login logic here

  }

}
