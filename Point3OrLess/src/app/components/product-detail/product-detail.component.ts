// product-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true, // Mark this component as standalone
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productId: number | null = null;
  product: any; // Object to hold product details

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Get the product ID from the route parameters
    this.route.params.subscribe((params) => {
      this.productId = +params['id']; // Convert string to number
      this.fetchProductDetails(this.productId);
    });
  }

  fetchProductDetails(id: number): void {
    // Simulating fetching product details. Replace with actual API call.
    const productDetails = {
      1: {
        id: 1,
        name: 'CBD Oil',
        price: 29.99,
        description: 'High-quality CBD oil for wellness.',
        benefits: 'Reduces anxiety, pain relief',
      },
      2: {
        id: 2,
        name: 'CBD Gummies',
        price: 19.99,
        description: 'Delicious gummies infused with CBD.',
        benefits: 'Easy to take, tasty',
      },
      3: {
        id: 3,
        name: 'CBD Cream',
        price: 34.99,
        description: 'Soothing CBD cream for relief.',
        benefits: 'Moisturizes skin, provides relief',
      },
      // Add more product details as needed
    };

    this.product = productDetails[id] || null; // Fetch product by ID
  }

  goBack(): void {
    this.router.navigate(['/product']); // Navigate back to product list
  }
}
