import { Component, inject, computed, signal, Signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Layout } from "../layout/layout";
import { RouterOutlet } from "@angular/router";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WhatTimeApi } from '../../services/what-time-api';
import { LocalisationModel } from '../../models/localisation/localisation-module';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LacalisationDialog } from '../lacalisation-dialog/lacalisation-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-localisations-page',
  imports: [Layout, MatCardModule, RouterOutlet, MatExpansionModule, MatDividerModule, MatListModule, MatIconModule, MatButtonModule, MatButton, MatFormField, MatLabel, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './localisations-page.html',
  styleUrl: './localisations-page.scss',
})
export class LocalisationsPage {

  search = signal<string>("");
  api = inject(WhatTimeApi);

  protected dialog = inject(MatDialog);
  protected getLocs(): LocalisationModel[]{
      return this.api.getLocs();
    }

  locs : Signal<LocalisationModel[]> = computed(() => this.getLocs().filter(
      (line) => {
        return  line.name?.trim().toLowerCase().replaceAll("  ", " ").includes(this.search()) || 
                line.address?.trim().toLowerCase().replaceAll("  ", " ").includes(this.search()) ||
                line.description?.trim().toLowerCase().replaceAll("  ", " ").includes(this.search()) || 
                line.latitude == parseFloat(this.search()) || line.longitude == parseFloat(this.search()) ||
                line.id == parseInt(this.search());
      }
    )
  );

  protected onSubmit(form : any) : void{
    this.search.set(form.value["searchField"].trim().toLowerCase().replaceAll("  ", " "));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LacalisationDialog, {});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
