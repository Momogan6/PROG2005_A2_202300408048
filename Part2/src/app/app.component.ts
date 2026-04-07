import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule // 必须导入路由模块，才能用routerLink和router-outlet
  ]
})
export class AppComponent {
  title = 'Inventory Management System';
}