import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dattebayo',
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './dattebayo.component.html',
  styleUrl: './dattebayo.component.css',
})
export class DattebayoComponent {
  links = [
    `akatsuki`,
    `characters`,
    `clans`,
    `kara`,
    `kekkei-genkais`,
    `tailed-beasts`,
    `villages`,
  ];
}
