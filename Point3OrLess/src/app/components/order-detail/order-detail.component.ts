import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../service/order-service.service';
import { UserInfoService } from '../../service/user-info.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { OrderDetail } from '../../models/order-details.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
  standalone: true,
  imports: [NgIf, NgFor, CommonModule],
})
export class OrderDetailComponent implements OnInit {
  orderDetails: OrderDetail[] = []; // Store order details fetched from the API
  orderId: number = 0;
  email: string = 'salman@salmansaeed.us'; // Same email used for order details
  errorMessage: string = '';

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private userInfoService: UserInfoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.orderId = +params.get('id')!; // Extract order ID from URL
      this.getOrderDetails(this.orderId);
    });
  }

  getOrderDetails(orderId: number): void {
    this.orderService.getOrderDetails(orderId, this.email).subscribe(
      (response: any) => {
        if (response.success) {
          this.orderDetails = response.data;
        } else {
          this.errorMessage = 'Failed to load order details';
        }
      },
      (error) => {
        this.errorMessage = 'Error fetching order details: ';
        //  + error.message;
      }
    );
  }

  get totalAmount(): number {
    return this.orderDetails.reduce(
      (sum, detail) => sum + detail.product_price * detail.quantity,
      0
    );
  }
  // Back button logic
  goBack(): void {
    this.router.navigate(['/orders']); // Replace '/orders' with the desired route
  }
}
