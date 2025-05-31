import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OpenlibraryService } from '../../services/openlibrary.service';

@Component({
  selector: 'app-search-term',
  imports: [FormsModule],
  templateUrl: './search-term.component.html',
  styleUrl: './search-term.component.css',
})
export class SearchTermComponent {
  searchTerm: string = '';
  constructor(private service: OpenlibraryService) {
    this.searchTerm = this.service.getSearchTerm();
  }

  onSearchTermChange(): void {
    this.service.setSearchTerm(this.searchTerm);
  }
}
