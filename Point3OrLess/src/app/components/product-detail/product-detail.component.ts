import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../service/products.service';
import { CartService } from '../../service/cart.service'; // Import the CartService

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  products: any[] = []; // Array to hold all products
  product: any = {}; // Variable to hold the selected product

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private cartService: CartService // Inject the CartService
  ) {}

  ngOnInit(): void {
    this.fetchProducts(); // Fetch all products on initialization
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
          quantity: 1, // Default quantity set to 1
          certificateOfAnalysis: product.Certificate_Of_Analysis_Link,
          wholesalePrice: product.UserPRice, // Corrected the typo from UserPRice
        }));

        this.filterProduct(); // Filter the product after fetching all
      },
      (error) => {
        console.error('Error fetching products:', error); // Handle errors appropriately
      }
    );
  }

  filterProduct(): void {
    const productId = this.route.snapshot.paramMap.get('id'); // Get the product ID from the route
    if (productId) {
      this.product = this.products.find((prod) => prod.id == productId); // Filter to find the specific product
    }
  }

  // Decrease quantity but don't allow it to go below 1
  decreaseQuantity(): void {
    if (this.product.quantity > 1) {
      this.product.quantity--;
    }
  }

  // Increase quantity
  increaseQuantity(): void {
    this.product.quantity++;
  }

  // Add product to cart
  addToCart(): void {
    console.log('in the add to cart'); // Log for debugging
    this.cartService.addToCart({
      id: this.product.id,
      name: this.product.name,
      quantity: this.product.quantity,
      price: this.product.wholesalePrice,
    });
    console.log(
      `${this.product.quantity} of ${this.product.name} added to the cart.`
    );
  }

  // Navigate to cart page
  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  goBack(): void {
    this.router.navigate(['/products']); // Navigate back to the product list
  }
}
