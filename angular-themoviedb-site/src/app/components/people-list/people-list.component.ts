import { IPeople } from '@/app/models/people';
import { Component, Input } from '@angular/core';
import { PeopleCardComponent } from '../people-card/people-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-people-list',
  imports: [PeopleCardComponent, CommonModule],
  templateUrl: './people-list.component.html',
  styleUrl: './people-list.component.css',
})
export class PeopleListComponent {
  @Input() title!: string;
  @Input() data!: IPeople[];
}
