import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Layout } from "../layout/layout";
import { RouterOutlet } from "@angular/router";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { WhatTimeApi } from '../../services/what-time-api';
import { TagModel } from '../../models/tag/tag-module';

@Component({
  selector: 'app-tags-page',
  imports: [Layout, MatCardModule, RouterOutlet, MatExpansionModule, MatDividerModule, MatListModule],
  templateUrl: './tags-page.html',
  styleUrl: './tags-page.scss',
})
export class TagsPage {
  api = inject(WhatTimeApi);

  // protected tags = this.api.getTags();
  getTags() : TagModel[]{
    return this.api.getTags();
  }
}
