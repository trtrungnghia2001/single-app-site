import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './components/header/header.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggleModule, MatIconModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-dummyjson-site';
}
