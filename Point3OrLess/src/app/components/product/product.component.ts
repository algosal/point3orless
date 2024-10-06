import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  // imports: [HttpClientModule], // Import HttpClientModule here if using standalone
})
export class ProductComponent implements OnInit {
  products: any[] = [];

  constructor(
    private productsService: ProductsService,
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
          quantity: product.Quantity_In_Text,
          certificateOfAnalysis: product.Certificate_Of_Analysis_Link,
          wholesalePrice: product.UserPRice,
        }));
      },
      (error) => {
        console.error('Error fetching product data:', error);
      }
    );
  }

  viewProductDetails(productId: number): void {
    this.router.navigate(['/product', productId]);
  }
}
