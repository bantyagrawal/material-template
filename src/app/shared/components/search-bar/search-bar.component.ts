import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchText = '';
  @Output() search = new EventEmitter<string>();

  onSearchChange() {
    this.search.emit(this.searchText.trim());
  }

  clearSearch() {
    this.searchText = '';
    this.search.emit('');
  }
}
