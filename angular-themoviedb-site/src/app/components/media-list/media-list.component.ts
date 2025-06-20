import { Component, Input } from '@angular/core';
import { IMedia } from '@/app/models/media';
import { CommonModule } from '@angular/common';
import { MediaCardComponent } from '../media-card/media-card.component';

@Component({
  selector: 'app-media-list',
  imports: [CommonModule, MediaCardComponent],
  templateUrl: './media-list.component.html',
  styleUrl: './media-list.component.css',
})
export class MediaListComponent {
  @Input() title!: string;
  @Input() data!: IMedia[];
}
