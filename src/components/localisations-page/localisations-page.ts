import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Layout } from "../layout/layout";
import { RouterOutlet } from "@angular/router";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { L } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-localisations-page',
  imports: [Layout, MatCardModule, RouterOutlet, MatExpansionModule, MatDividerModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './localisations-page.html',
  styleUrl: './localisations-page.scss',
})
export class LocalisationsPage {
  locs = JSON.parse(localStorage.getItem('locations') || '[]');

}
