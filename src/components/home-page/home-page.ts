import { Component } from '@angular/core';
import { Layout } from "../layout/layout";
import { RouterOutlet } from "../../../node_modules/@angular/router/types/_router_module-chunk";

@Component({
  selector: 'app-home-page',
  imports: [Layout, RouterOutlet],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

}
