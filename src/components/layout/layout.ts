import {Component} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from "@angular/router";
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-layout',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink, MatDividerModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

}
