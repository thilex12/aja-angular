import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-login-page',
  imports: [FormsModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {

  email: string = '';
  password: string = '';

  login(form: NgForm) {
    this.email = form.value.email;
    this.password = form.value.password;
    // Implement login logic here

  }

}
