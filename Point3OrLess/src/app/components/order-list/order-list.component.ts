import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order-service.service';
import { UserInfoService } from '../../service/user-info.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Order } from '../../models/orders.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  standalone: true,
  imports: [NgIf, NgFor, CommonModule],
})
export class OrderListComponent implements OnInit {
  orders: Order[] = []; // Will store the list of orders
  errorMessage: string = '';
  email: string = ''; // Email for the orders (You can get this dynamically if needed)

  constructor(
    private orderService: OrderService,
    private userInfoService: UserInfoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.email = this.userInfoService.getUserData().email; // Assuming the user data has email
    this.getOrders();
  }

  // Fetch orders from the service
  getOrders(): void {
    this.orderService.getOrders(this.email).subscribe(
      (response: any) => {
        if (response.success) {
          this.orders = response.data;
          console.log(this.orders);
        } else {
          this.errorMessage = 'Failed to load orders';
        }
      },
      (error) => {
        this.errorMessage = 'Error fetching orders: ' + error.message;
      }
    );
  }

  // View details of a specific order
  // viewOrderDetails(orderId: number): void {
  //   this.orderService.getOrderDetails(orderId, this.email).subscribe(
  //     (response: any) => {
  //       if (response.success) {
  //         console.log('Order Details:', response.data);
  //       } else {
  //         this.errorMessage = 'Failed to load order details';
  //       }
  //     },
  //     (error) => {
  //       this.errorMessage = 'Error fetching order details: ' + error.message;
  //     }
  //   );
  // }
  goToOrderDetails(orderId: number): void {
    this.router.navigate(['/order-details', orderId]);
  }
}
