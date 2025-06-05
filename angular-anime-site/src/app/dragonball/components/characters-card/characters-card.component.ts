import { Component, Input } from '@angular/core';
import { ICharacter } from '../../models';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-characters-card',
  imports: [RouterModule],
  templateUrl: './characters-card.component.html',
  styleUrl: './characters-card.component.css',
})
export class CharactersCardComponent {
  @Input() data!: ICharacter;
}
