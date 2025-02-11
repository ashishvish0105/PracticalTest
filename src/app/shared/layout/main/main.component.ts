import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from "../../components/loader/loader.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
