import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Item } from '../manage-items/manage-items.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SearchComponent {
  keyword = '';
  results: Item[] = [];
  inventory: Item[] = [];

  search() {
    this.results = this.inventory.filter(i =>
      i.itemName.toLowerCase().includes(this.keyword.toLowerCase())
    );
  }
}