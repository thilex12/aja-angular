import { Component, inject, computed, Signal, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Layout } from "../layout/layout";
import { RouterOutlet } from "@angular/router";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { WhatTimeApi } from '../../services/what-time-api';
import { TagModel } from '../../models/tag/tag-module';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TagModel } from '../../models/tag/tag-module';

@Component({
  selector: 'app-tags-page',
  imports: [Layout, MatCardModule, RouterOutlet, MatExpansionModule, MatDividerModule, MatListModule, MatButton, MatFormField, MatLabel, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './tags-page.html',
  styleUrl: './tags-page.scss',
})
export class TagsPage {
  api = inject(WhatTimeApi);

  // protected tags = this.api.getTags();
  getTags() : TagModel[]{
    return this.api.getTags();
  }
  protected fullTags : Signal<TagModel[]> = signal(JSON.parse(localStorage.getItem('tags') || '[]'));
  protected search = signal(""); 
  protected tags : Signal<TagModel[]> = computed(() => this.fullTags().filter(
      (line) => {
        return  line.name.trim().toLowerCase().replaceAll("  ", " ").includes(this.search()) || 
                line.id == parseInt(this.search());
      }
    )
  );

  protected onSubmit(form : any) : void{
    this.search.set(form.value["searchField"].trim().toLowerCase().replaceAll("  ", " "));
  }
}
