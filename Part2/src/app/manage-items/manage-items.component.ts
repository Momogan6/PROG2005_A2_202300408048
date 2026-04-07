import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Item {
  itemId: string;
  itemName: string;
  category: string;
  quantity: number;
  price: number;
  supplierName: string;
  stockStatus: string;
  popularItem: string;
  comment?: string;
}

@Component({
  selector: 'app-manage-items',
  templateUrl: './manage-items.component.html',
  styleUrls: ['./manage-items.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] // 必须导入，才能用*ngIf/*ngFor/ngModel
})
export class ManageItemsComponent {
  inventory: Item[] = [];
  currentItem: Item = this.emptyItem();
  isEdit = false;
  message = '';

  emptyItem(): Item {
    return {
      itemId: '',
      itemName: '',
      category: 'Electronics',
      quantity: 0,
      price: 0,
      supplierName: '',
      stockStatus: 'In Stock',
      popularItem: 'No'
    };
  }

  showMessage(msg: string) {
    this.message = msg;
    setTimeout(() => this.message = '', 3000);
  }

  saveItem() {
    if (!this.currentItem.itemId || !this.currentItem.itemName) {
      this.showMessage('Please fill required fields!');
      return;
    }
    if (this.isEdit) {
      this.inventory = this.inventory.map(i =>
        i.itemId === this.currentItem.itemId ? { ...this.currentItem } : i
      );
      this.showMessage('Item updated successfully');
    } else {
      this.inventory.push({ ...this.currentItem });
      this.showMessage('Item added successfully');
    }
    this.reset();
  }

  editItem(item: Item) {
    this.currentItem = { ...item };
    this.isEdit = true;
  }

  deleteItem(id: string) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.inventory = this.inventory.filter(i => i.itemId !== id);
      this.showMessage('Item deleted');
    }
  }

  reset() {
    this.currentItem = this.emptyItem();
    this.isEdit = false;
  }
}