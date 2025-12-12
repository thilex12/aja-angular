import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Layout } from "../layout/layout";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-users-page',
  imports: [MatCardModule, Layout, RouterOutlet],
  templateUrl: './users-page.html',
  styleUrl: './users-page.scss',
})
export class UsersPage {
  protected longText: string = `The Chihuahua is a breed of small dog named after the state of Chihuahua in Mexico. The breed is believed to have descended from an ancient dog breed known as the Techichi, which was kept by the Toltec civilization in Mexico. Chihuahuas are known for their small size, large ears, and big personality. They are often described as lively, alert, and loyal companions. Despite their small stature, Chihuahuas can be quite bold and confident. They come in a variety of colors and coat types, including smooth and long-haired varieties. Due to their size, they are well-suited for apartment living and can be great pets for individuals or families looking for a small dog with a big heart.`;

}
