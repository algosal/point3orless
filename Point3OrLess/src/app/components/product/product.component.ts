// product.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true, // Mark this component as standalone
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: any[] = []; // Array to hold product data

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Fetch product data (this could be from a service or API)
    this.fetchProducts();
  }

  fetchProducts(): void {
    // Simulating product data retrieval. Replace this with an actual API call.
    this.products = [
      {
        id: 1,
        name: 'CBD Oil',
        price: 29.99,
        description: 'High-quality CBD oil for wellness.',
      },
      {
        id: 2,
        name: 'CBD Gummies',
        price: 19.99,
        description: 'Delicious gummies infused with CBD.',
      },
      {
        id: 3,
        name: 'CBD Cream',
        price: 34.99,
        description: 'Soothing CBD cream for relief.',
      },
      // Add more products as needed
    ];
  }

  viewProductDetails(productId: number): void {
    // Navigate to a detailed view of the product (if implemented)
    this.router.navigate(['/products', productId]);
  }
}
