import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Layout } from "../layout/layout";
import { RouterOutlet } from "@angular/router";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-tags-page',
  imports: [Layout, MatCardModule, RouterOutlet, MatExpansionModule, MatDividerModule, MatListModule],
  templateUrl: './tags-page.html',
  styleUrl: './tags-page.scss',
})
export class TagsPage {

  protected tags = signal(JSON.parse(localStorage.getItem('tags') || '[]'));

}
