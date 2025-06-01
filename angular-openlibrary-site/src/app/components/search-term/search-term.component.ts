import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OpenlibraryService } from '../../services/openlibrary.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-term',
  imports: [FormsModule],
  templateUrl: './search-term.component.html',
  styleUrl: './search-term.component.css',
})
export class SearchTermComponent {
  service = inject(OpenlibraryService);
  router = inject(Router);
  searchValue: string = 'dracula';
  constructor() {}
  ngOnInit(): void {
    this.service.searchTerm.set(this.searchValue);
  }

  onSetSearchValue() {
    this.service.searchTerm.set(this.searchValue);
    this.router.navigate(['/home']);
  }
}
