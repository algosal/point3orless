import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../service/products.service';
import { CartService } from '../../service/cart.service'; // Import CartService

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: any[] = [];

  constructor(
    private productsService: ProductsService,
    private cartService: CartService, // Inject CartService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productsService.getProducts().subscribe(
      (response: any[]) => {
        this.products = response.map((product) => ({
          id: product.Serial_Number,
          name: product.Name,
          msrp: product.Price,
          imageUrl: product.web_image,
          description: product.Description,
          quantity: 1, // Default quantity is set to 1
          certificateOfAnalysis: product.Certificate_Of_Analysis_Link,
          wholesalePrice: product.UserPRice,
        }));
      },
      (error) => {
        console.error('Error fetching product data:', error);
      }
    );
  }

  // View product details
  viewProductDetails(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  // Decrease quantity but ensure it doesn't go below 1
  decreaseQuantity(product: any): void {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  // Increase quantity
  increaseQuantity(product: any): void {
    product.quantity++;
  }

  // Add product to cart using CartService
  addToCart(product: any): void {
    console.log('in the add to cart');
    this.cartService.addToCart({
      id: product.id,
      name: product.name,
      quantity: product.quantity,
      price: product.wholesalePrice,
    });
    console.log(`Added ${product.quantity} of ${product.name} to the cart`);
  }

  // Navigate to cart page
  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}
