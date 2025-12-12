import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Layout } from "../layout/layout";
import { RouterOutlet } from "@angular/router";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { L } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-localisations-page',
  imports: [Layout, MatCardModule, RouterOutlet, MatExpansionModule, MatDividerModule, MatListModule],
  templateUrl: './localisations-page.html',
  styleUrl: './localisations-page.scss',
})
export class LocalisationsPage {

}
