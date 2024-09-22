# Point3 or Less

The Wholesale CBD Products Company

### Project: Wholesale CBD Products Company

#### Overview:

This project involves developing a software solution for a wholesale CBD products company that sells to street vendors. The platform will allow users to view and order products at wholesale prices, with a minimum order requirement of $1,500. The back-end will be developed using **PHP/Laravel** for API endpoints, while the front-end can either be developed in **Laravel** or **Angular**. **MySQL** will be used for database management.

---

**Project Scope:**

- **API Development**: The API will be developed using Laravel to manage product data, order placement, and vendor management. It will initially be hosted on an Apache server, ensuring robust functionality for handling requests.

- **Cloud Integration**: The API will also incorporate user verification through AWS API Gateway and AWS Lambda, enabling secure access and obtaining JSON Web Tokens (JWT) for authentication. Subsequent authentication-required pages will utilize these tokens, verifying them through the Laravel JWT package from Composer. This approach minimizes the load on the RDS MySQL database by efficiently managing authentication processes. All information exchange will occur programmatically using JWTs.

- **Front-End Development**: A dynamic and user-friendly front-end will be created using either Laravel Blade (if Laravel is chosen) or Angular to enhance user interactivity.

- **Back-End Infrastructure**: The back end will utilize a MySQL database to effectively manage products, vendors, orders, pricing, and payments.

- **Target Audience**: The primary users of this platform will be street vendors purchasing CBD products in bulk.

### Key Project Features:

1. **Product Listings**: Detailed display of CBD products available for wholesale, including prices, stock levels, and product descriptions.
2. **User Registration & Vendor Management**: Street vendors will be required to register before placing orders. Vendors' profiles will be managed, including business details, order history, and invoices.
3. **Order Management**: Vendors can add products to their cart and must meet the minimum order value of $1,500 before proceeding to checkout.
4. **Payments and Invoicing**: Secure payment gateway integration with automated invoice generation.
5. **Inventory Management**: Admin dashboard to manage product availability, pricing, and stock.
6. **Sales Reports & Analytics**: Dashboard for the company admin to track sales, order values, and vendor activities.

---

### Pages and Functionalities:

1. **Home Page**

   - Overview of the company and featured products.
   - Links to registration, login, and product pages.
   - CTA buttons for street vendors to start shopping.

2. **About Us**

   - Company background, mission, and vision.
   - Explanation of the wholesale pricing model and business goals.

3. **Product Listing Page**

   - Display of all CBD products available for sale.
   - Sorting and filtering based on categories, stock levels, and price.
   - Integration with Laravel/Angular to handle real-time updates of stock and product changes.

4. **Product Detail Page**

   - Detailed information on each product, including price, product specs, and available quantity.
   - "Add to Cart" button for vendors.

5. **Vendor Registration & Login**

   - Sign-up page for vendors to register with their business details.
   - Login page with email and password.
   - Password recovery options.

6. **Vendor Dashboard**

   - Overview of past orders, current cart, and payment status.
   - Order history with downloadable invoices.
   - Account management (e.g., updating business details and payment methods).

7. **Shopping Cart & Checkout**

   - Cart page that shows all added products, quantity, and total price.
   - Reminder or prompt to reach the minimum order value of $1,500.
   - Secure checkout and payment integration.

8. **Admin Dashboard**
   - Product management: Add, edit, or delete products and manage stock levels.
   - Vendor management: Track vendor registrations, orders, and payment status.
   - Sales analytics: View daily/weekly/monthly sales reports.
   - Inventory alerts for low stock products.

---

### Assessment Plan for Company Requirements

1. **Business Requirements Analysis**

   - Conduct interviews with key stakeholders of the CBD company to understand their current workflow and expectations.
   - Define the core needs:
     - Efficient product management.
     - Vendor-specific bulk pricing rules.
     - Integration of invoicing and inventory management.

2. **Current Infrastructure Review**

   - Determine if the company already has any systems or tools in place.
   - Assess their IT infrastructure to see if it can support a Laravel/Angular-based system.

3. **Feature Prioritization**

   - What are the “must-have” vs. “nice-to-have” features?
   - Prioritize basic functionality (e.g., product management, payments) over advanced features (e.g., sales analytics, vendor engagement tools) during the initial rollout.
   - Establish the hierarchy of features through discussions with the business.

4. **Data Collection and Management**

   - Review how the company currently manages product information and orders.
   - Develop a data migration plan if necessary (e.g., moving product catalogs, vendor records into MySQL).

5. **Scalability Assessment**

   - Evaluate how the software needs to scale in the future as the business grows (e.g., handling more vendors, increasing product lines).
   - Plan for a modular architecture that allows future expansion.

6. **Compliance and Security**

   - Assess the legal requirements regarding CBD sales (e.g., compliance with state laws on CBD products).
   - Ensure the platform uses best practices for data protection and payment security (e.g., PCI-DSS compliance for payments, encrypted vendor data).

7. **Project Timeline and Resources**
   - Based on the project scope, break down the timeline into phases:
     - Phase 1: Core development of product management and order system.
     - Phase 2: Vendor management and invoicing.
     - Phase 3: Sales analytics and reporting.
   - Assign roles (developer, designer, tester) and allocate resources accordingly.

---

### Final Vision:

The project aims to streamline the wholesale CBD product sales process by offering a user-friendly, scalable platform for street vendors to easily purchase products. The software will enable the company to manage its inventory and vendors more effectively while offering transparency through reports and analytics. With the integration of a secure and reliable system, the company will be able to grow its vendor base and sales without compromising efficiency.

This project will serve as a powerful tool for the CBD company to expand its reach in the wholesale market, improve its internal operations, and provide a seamless experience to its street vendor clients.
