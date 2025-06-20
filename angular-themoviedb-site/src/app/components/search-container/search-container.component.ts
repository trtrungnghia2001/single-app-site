import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-container',
  imports: [ReactiveFormsModule],
  templateUrl: './search-container.component.html',
  styleUrl: './search-container.component.css',
})
export class SearchContainerComponent {
  form!: FormGroup;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      search: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    if (this.form.valid) {
      const { search } = this.form.value;
      this.router.navigate([`/search`], {
        queryParams: {
          query: search,
          type: 'movie',
          page: '1',
        },
      });
    }
    this.form.reset();
  }
}
